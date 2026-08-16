begin;

do $$
declare
  active_user_id uuid;
  verification_lead_id uuid := gen_random_uuid();
  analytics jsonb;
begin
  select id into active_user_id
  from public.profiles
  where status = 'active' and role in ('admin', 'editor', 'viewer')
  order by case role when 'admin' then 1 when 'editor' then 2 else 3 end
  limit 1;

  if active_user_id is null then
    return;
  end if;

  perform set_config('request.jwt.claim.sub', active_user_id::text, true);

  insert into public.contact_leads (
    id, name, email, project_type, message, priority, status, source
  ) values (
    verification_lead_id,
    'Analytics Contract Verification',
    'analytics-contract@example.invalid',
    'Verification',
    'Transactional analytics contract verification record.',
    'medium',
    'new',
    'website'
  );

  analytics := public.crm_dashboard_analytics(
    timezone('utc', now()) - interval '1 day',
    timezone('utc', now()) + interval '1 day'
  );

  if coalesce((analytics->'statistics'->>'total')::integer, 0) < 1
    or not exists (
      select 1
      from jsonb_array_elements(analytics->'statusDistribution') item
      where item->>'label' = 'new' and (item->>'value')::integer >= 1
    )
    or coalesce((
      select sum((item->>'value')::integer)
      from jsonb_array_elements(analytics->'monthlyLeads') item
    ), 0) < 1 then
    raise exception 'CRM analytics one-lead contract verification failed';
  end if;

  delete from public.contact_leads where id = verification_lead_id;
end;
$$;

commit;
