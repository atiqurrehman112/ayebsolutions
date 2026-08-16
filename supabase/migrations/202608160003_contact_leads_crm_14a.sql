begin;

alter type public.lead_crm_status rename value 'contacted' to 'read';
alter type public.lead_crm_status rename value 'qualified' to 'in_progress';
alter type public.lead_crm_status rename value 'proposal_sent' to 'replied';

alter table public.contact_leads
  add column if not exists is_important boolean not null default false,
  add column if not exists read_at timestamptz,
  add column if not exists replied_at timestamptz,
  add column if not exists country text,
  add column if not exists ip_hash text,
  add column if not exists referrer text,
  add column if not exists user_agent text;

update public.contact_leads as leads
set ip_hash = (
  select attempt.ip_hash
  from public.contact_submission_attempts as attempt
  where attempt.lead_id = leads.id
  order by attempt.created_at asc
  limit 1
)
where leads.ip_hash is null
  and exists (
    select 1 from public.contact_submission_attempts as attempt
    where attempt.lead_id = leads.id
  );

update public.contact_leads set read_at = status_changed_at
where status <> 'new' and read_at is null;
update public.contact_leads set replied_at = coalesce(last_contacted_at, status_changed_at)
where status = 'replied' and replied_at is null;

alter table public.contact_leads
  add constraint contact_leads_ip_hash_length
  check (ip_hash is null or length(ip_hash) = 64),
  add constraint contact_leads_country_length
  check (country is null or length(country) <= 100),
  add constraint contact_leads_referrer_length
  check (referrer is null or length(referrer) <= 1000),
  add constraint contact_leads_user_agent_length
  check (user_agent is null or length(user_agent) <= 1000);

create index contact_leads_important_created_idx
on public.contact_leads (is_important desc, created_at desc);
create index contact_leads_service_budget_idx
on public.contact_leads (project_type, budget_range, created_at desc);
create index contact_leads_read_state_idx
on public.contact_leads (status, read_at, created_at desc);

comment on column public.contact_leads.ip_hash is
  'One-way HMAC fingerprint used for abuse controls; never a raw IP address.';
comment on column public.contact_leads.is_important is
  'CRM star flag managed by authorized admin users.';

commit;
