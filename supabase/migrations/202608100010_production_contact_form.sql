begin;

alter table public.contact_leads add column phone text;

create table public.contact_submission_attempts (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.contact_leads(id) on delete cascade,
  ip_hash text not null,
  payload_hash text not null,
  created_at timestamptz not null default timezone('utc', now()),
  constraint contact_submission_ip_hash_length check (length(ip_hash) = 64),
  constraint contact_submission_payload_hash_length check (length(payload_hash) = 64)
);

create index contact_submission_attempts_ip_created_idx
  on public.contact_submission_attempts(ip_hash, created_at desc);
create index contact_submission_attempts_payload_created_idx
  on public.contact_submission_attempts(payload_hash, created_at desc);
create index contact_submission_attempts_created_idx
  on public.contact_submission_attempts(created_at);
alter table public.contact_submission_attempts enable row level security;

create function public.submit_contact_lead(
  p_name text,
  p_company text,
  p_email text,
  p_phone text,
  p_service text,
  p_interests text[],
  p_budget text,
  p_timeline text,
  p_message text,
  p_ip_hash text,
  p_payload_hash text
) returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_lead_id uuid;
begin
  perform pg_advisory_xact_lock(hashtextextended(p_ip_hash, 0));
  delete from public.contact_submission_attempts
  where created_at < timezone('utc', now()) - interval '30 days';

  if (select count(*) from public.contact_submission_attempts
      where ip_hash = p_ip_hash
        and created_at > timezone('utc', now()) - interval '15 minutes') >= 5 then
    raise exception using errcode = 'P0001', message = 'contact_rate_limited';
  end if;

  if exists (
    select 1 from public.contact_submission_attempts
    where payload_hash = p_payload_hash
      and created_at > timezone('utc', now()) - interval '30 minutes'
  ) then
    raise exception using errcode = 'P0001', message = 'contact_duplicate';
  end if;

  insert into public.contact_leads (
    name, company, email, phone, project_type, budget_range, estimated_budget,
    timeline, message, interested_services, priority, status, source, subject
  ) values (
    p_name, p_company, lower(trim(p_email)), p_phone, p_service, p_budget, p_budget,
    p_timeline, p_message, array_append(coalesce(p_interests, '{}'::text[]), p_service), 'medium', 'new', 'website_contact_form',
    concat('Website inquiry: ', p_service, case when p_phone is null then '' else concat(' | Phone: ', p_phone) end)
  ) returning id into new_lead_id;

  insert into public.lead_status_history (lead_id, from_status, to_status, changed_by)
  values (new_lead_id, null, 'new', null);

  insert into public.contact_submission_attempts (lead_id, ip_hash, payload_hash)
  values (new_lead_id, p_ip_hash, p_payload_hash);

  return new_lead_id;
end;
$$;

revoke all on function public.submit_contact_lead(text,text,text,text,text,text[],text,text,text,text,text) from public;
grant execute on function public.submit_contact_lead(text,text,text,text,text,text[],text,text,text,text,text) to service_role;

commit;
