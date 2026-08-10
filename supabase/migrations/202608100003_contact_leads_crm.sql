begin;

create type public.lead_crm_status as enum ('new','contacted','qualified','proposal_sent','won','lost','archived');
alter table public.contact_leads alter column status drop default;
alter table public.contact_leads alter column status type public.lead_crm_status using (
  case status::text when 'new' then 'new' when 'reviewed' then 'contacted' when 'assigned' then 'qualified' when 'proposal' then 'proposal_sent' when 'follow_up' then 'contacted' when 'closed' then 'won' else 'archived' end
)::public.lead_crm_status;
alter table public.contact_leads alter column status set default 'new';
drop type public.lead_status;

alter table public.contact_leads rename column internal_notes to notes;
alter table public.contact_leads
  add column subject text,
  add column last_contacted_at timestamptz,
  add column status_changed_at timestamptz not null default timezone('utc',now()),
  add column estimated_budget text,
  drop constraint if exists contact_leads_priority_check;
update public.contact_leads set priority='medium' where priority='normal';
alter table public.contact_leads add constraint contact_leads_priority_check check (priority in ('low','medium','high','urgent'));
alter table public.contact_leads add column priority_rank smallint generated always as (
  case priority when 'urgent' then 4 when 'high' then 3 when 'medium' then 2 else 1 end
) stored;

create table public.lead_status_history(
  id uuid primary key default gen_random_uuid(), lead_id uuid not null references public.contact_leads(id) on delete cascade,
  from_status public.lead_crm_status, to_status public.lead_crm_status not null, changed_by uuid references public.profiles(id) on delete set null default auth.uid(),
  created_at timestamptz not null default timezone('utc',now())
);
create table public.lead_email_history(
  id uuid primary key default gen_random_uuid(), lead_id uuid not null references public.contact_leads(id) on delete cascade,
  email_type text not null, recipient text not null, subject text not null, body text not null, provider_id text,
  sent_by uuid references public.profiles(id) on delete set null default auth.uid(), sent_at timestamptz not null default timezone('utc',now())
);
create index contact_leads_crm_idx on public.contact_leads(status,priority,created_at desc);
create index lead_status_history_lead_idx on public.lead_status_history(lead_id,created_at desc);
create index lead_email_history_lead_idx on public.lead_email_history(lead_id,sent_at desc);
alter table public.lead_status_history enable row level security;alter table public.lead_email_history enable row level security;
create policy "lead_history_admin_read" on public.lead_status_history for select to authenticated using(public.can_view_admin());
create policy "lead_history_editor_insert" on public.lead_status_history for insert to authenticated with check(public.can_edit_content());
create policy "lead_email_admin_read" on public.lead_email_history for select to authenticated using(public.can_view_admin());
create policy "lead_email_editor_insert" on public.lead_email_history for insert to authenticated with check(public.can_edit_content());
commit;
