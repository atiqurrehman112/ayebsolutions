begin;

create or replace function public.crm_dashboard_analytics(
  p_from timestamptz,
  p_to timestamptz
)
returns jsonb
language plpgsql
stable
security invoker
set search_path = public
as $$
declare
  result jsonb;
begin
  if not public.can_view_admin() then
    raise exception 'Insufficient permission';
  end if;

  with filtered_leads as (
    select * from public.contact_leads
    where created_at >= p_from and created_at < p_to
  ),
  status_counts as (
    select status, count(*)::int as value from filtered_leads group by status
  ),
  month_series as (
    select generate_series(
      date_trunc('month', p_to) - interval '11 months',
      date_trunc('month', p_to), interval '1 month'
    ) as month
  ),
  monthly as (
    select to_char(month, 'Mon') as label,
      count(fl.id)::int as value
    from month_series ms
    left join public.contact_leads fl on fl.created_at >= ms.month
      and fl.created_at < ms.month + interval '1 month'
    group by ms.month order by ms.month
  ),
  sources as (
    select initcap(coalesce(nullif(source, ''), 'Other')) as label,
      count(*)::int as value
    from filtered_leads group by 1 order by 2 desc
  ),
  activity as (
    select * from (
      select id, id as lead_id, 'lead'::text as kind,
        name || ' submitted an inquiry' as label, created_at as occurred_at
      from filtered_leads
      union all
      select h.id, h.lead_id, 'status',
        'Lead marked ' || replace(h.to_status::text, '_', ' '), h.created_at
      from public.lead_status_history h join filtered_leads l on l.id = h.lead_id
      union all
      select e.id, e.lead_id, 'email',
        case when e.direction = 'incoming' then 'Customer reply received' else 'Email sent: ' || e.subject end,
        e.sent_at
      from public.lead_email_history e join filtered_leads l on l.id = e.lead_id
      union all
      select f.id, f.lead_id, 'follow_up',
        'Follow-up ' || f.status, coalesce(f.completed_at, f.created_at)
      from public.lead_follow_ups f join filtered_leads l on l.id = f.lead_id
      union all
      select n.id, n.lead_id, 'note', 'Internal note added', n.created_at
      from public.lead_note_history n join filtered_leads l on l.id = n.lead_id
    ) events order by occurred_at desc limit 12
  ),
  leaderboard as (
    select p.id, coalesce(p.display_name, p.email, p.role::text) as name,
      count(l.id)::int as leads_handled,
      count(l.id) filter (where l.status = 'won')::int as won,
      avg(extract(epoch from (l.replied_at - l.created_at)) / 3600)
        filter (where l.replied_at is not null) as response_hours
    from public.profiles p
    left join filtered_leads l on l.assigned_to = p.id
    where p.status = 'active' and p.role in ('admin', 'editor')
    group by p.id, p.display_name, p.email, p.role
  )
  select jsonb_build_object(
    'statistics', jsonb_build_object(
      'total', (select count(*) from filtered_leads),
      'new', (select count(*) from filtered_leads where status = 'new'),
      'active', (select count(*) from filtered_leads where status in ('read','in_progress','replied')),
      'won', (select count(*) from filtered_leads where status = 'won'),
      'lost', (select count(*) from filtered_leads where status = 'lost'),
      'archived', (select count(*) from filtered_leads where status = 'archived'),
      'emailsSent', (select count(*) from public.lead_email_history where direction = 'outgoing' and sent_at >= p_from and sent_at < p_to),
      'pendingFollowUps', (select count(*) from public.lead_follow_ups where status = 'scheduled'),
      'todaysFollowUps', (select count(*) from public.lead_follow_ups where status = 'scheduled' and scheduled_for >= date_trunc('day', now()) and scheduled_for < date_trunc('day', now()) + interval '1 day'),
      'estimatedRevenue', null
    ),
    'statusDistribution', coalesce((select jsonb_agg(jsonb_build_object('label', replace(status::text, '_', ' '), 'value', value) order by status) from status_counts), '[]'::jsonb),
    'monthlyLeads', (select jsonb_agg(jsonb_build_object('label', label, 'value', value)) from monthly),
    'leadSources', coalesce((select jsonb_agg(jsonb_build_object('label', label, 'value', value)) from sources), '[]'::jsonb),
    'activity', coalesce((select jsonb_agg(to_jsonb(activity)) from activity), '[]'::jsonb),
    'followUps', jsonb_build_object(
      'overdue', (select count(*) from public.lead_follow_ups where status = 'scheduled' and scheduled_for < date_trunc('day', now())),
      'today', (select count(*) from public.lead_follow_ups where status = 'scheduled' and scheduled_for >= date_trunc('day', now()) and scheduled_for < date_trunc('day', now()) + interval '1 day'),
      'tomorrow', (select count(*) from public.lead_follow_ups where status = 'scheduled' and scheduled_for >= date_trunc('day', now()) + interval '1 day' and scheduled_for < date_trunc('day', now()) + interval '2 days'),
      'nextSevenDays', (select count(*) from public.lead_follow_ups where status = 'scheduled' and scheduled_for >= date_trunc('day', now()) and scheduled_for < date_trunc('day', now()) + interval '7 days')
    ),
    'kpis', jsonb_build_object(
      'averageResponseHours', (select avg(extract(epoch from (replied_at - created_at)) / 3600) from filtered_leads where replied_at is not null),
      'averageCloseHours', (select avg(extract(epoch from (status_changed_at - created_at)) / 3600) from filtered_leads where status in ('won','lost')),
      'winRate', (select case when count(*) filter (where status in ('won','lost')) = 0 then null else 100.0 * count(*) filter (where status = 'won') / count(*) filter (where status in ('won','lost')) end from filtered_leads),
      'conversionRate', (select case when count(*) = 0 then null else 100.0 * count(*) filter (where status = 'won') / count(*) end from filtered_leads),
      'replyRate', (select case when count(*) filter (where direction = 'outgoing') = 0 then null else 100.0 * count(*) filter (where direction = 'incoming') / count(*) filter (where direction = 'outgoing') end from public.lead_email_history where sent_at >= p_from and sent_at < p_to)
    ),
    'leaderboard', coalesce((select jsonb_agg(to_jsonb(leaderboard) order by won desc, leads_handled desc) from leaderboard), '[]'::jsonb),
    'smart', jsonb_build_object(
      'newestLead', (select to_jsonb(x) from (select id, name, company, created_at from filtered_leads order by created_at desc limit 1) x),
      'biggestBudget', (select to_jsonb(x) from (select id, name, budget_range from filtered_leads where budget_range is not null order by priority_rank desc, created_at desc limit 1) x),
      'mostRequestedService', (select to_jsonb(x) from (select project_type as label, count(*)::int as value from filtered_leads group by project_type order by value desc, project_type limit 1) x),
      'highestPriorityLead', (select to_jsonb(x) from (select id, name, priority from filtered_leads order by priority_rank desc, created_at asc limit 1) x),
      'longestInactiveLead', (select to_jsonb(x) from (select id, name, coalesce(last_contacted_at, created_at) as last_activity from filtered_leads where status not in ('won','lost','archived') order by coalesce(last_contacted_at, created_at) asc limit 1) x)
    )
  ) into result;
  return result;
end;
$$;

grant execute on function public.crm_dashboard_analytics(timestamptz, timestamptz) to authenticated;

commit;
