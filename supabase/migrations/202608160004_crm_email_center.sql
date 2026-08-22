begin;

alter table public.contact_leads
  add column if not exists next_follow_up_at timestamptz,
  add column if not exists follow_up_completed_at timestamptz;

alter table public.lead_email_history
  add column if not exists direction text not null default 'outgoing',
  add column if not exists status text not null default 'sent',
  add column if not exists delivery_status text not null default 'accepted',
  add column if not exists message_id text,
  add column if not exists reply_to text,
  add column if not exists cc text[] not null default '{}',
  add column if not exists bcc text[] not null default '{}',
  add column if not exists html_body text,
  add column if not exists attachments jsonb not null default '[]'::jsonb,
  add column if not exists read_at timestamptz;

update public.lead_email_history set message_id = provider_id
where message_id is null and provider_id is not null;

alter table public.lead_email_history
  add constraint lead_email_direction_check check (direction in ('incoming','outgoing')),
  add constraint lead_email_status_check check (status in ('queued','sent','failed','received')),
  add constraint lead_email_delivery_check check (delivery_status in ('pending','accepted','delivered','failed','bounced','received')),
  add constraint lead_email_attachments_array check (jsonb_typeof(attachments) = 'array');

create table public.email_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default 'custom',
  subject text not null,
  body_html text not null,
  body_text text not null,
  variables text[] not null default '{}',
  is_system boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.profiles(id) on delete set null default auth.uid(),
  updated_by uuid references public.profiles(id) on delete set null default auth.uid(),
  constraint email_templates_name_length check (length(trim(name)) between 2 and 120),
  constraint email_templates_subject_length check (length(trim(subject)) between 2 and 240),
  constraint email_templates_body_length check (length(body_text) between 2 and 20000),
  constraint email_templates_category_check check (category in ('thank_you','proposal','meeting','discovery_call','project_started','quote','follow_up','custom')),
  constraint email_templates_name_unique unique (name)
);

create table public.lead_follow_ups (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.contact_leads(id) on delete cascade,
  scheduled_for timestamptz not null,
  status text not null default 'scheduled',
  note text,
  assigned_to uuid references public.profiles(id) on delete set null,
  completed_at timestamptz,
  completed_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.profiles(id) on delete set null default auth.uid(),
  updated_by uuid references public.profiles(id) on delete set null default auth.uid(),
  constraint lead_follow_ups_status_check check (status in ('scheduled','completed','cancelled')),
  constraint lead_follow_ups_note_length check (note is null or length(note) <= 2000)
);

create table public.lead_note_history (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.contact_leads(id) on delete cascade,
  body text not null,
  created_by uuid references public.profiles(id) on delete set null default auth.uid(),
  created_at timestamptz not null default timezone('utc', now()),
  constraint lead_note_history_body_length check (length(trim(body)) between 2 and 10000)
);

insert into public.email_templates (name, category, subject, body_html, body_text, variables, is_system)
values
  ('Thank you', 'thank_you', 'Thank you for contacting us, {{name}}', '<p>Hello {{name}},</p><p>Thank you for sharing your {{service}} requirements. We will review the context and follow up with an appropriate next step.</p>', 'Hello {{name}},\n\nThank you for sharing your {{service}} requirements. We will review the context and follow up with an appropriate next step.', array['name','service'], true),
  ('Proposal', 'proposal', 'Proposal for {{company}}', '<p>Hello {{name}},</p><p>Please find the proposal context for your {{service}} initiative below.</p>', 'Hello {{name}},\n\nPlease find the proposal context for your {{service}} initiative below.', array['name','company','service'], true),
  ('Meeting', 'meeting', 'Meeting follow-up for {{service}}', '<p>Hello {{name}},</p><p>Thank you for the conversation. Here is the agreed meeting follow-up.</p>', 'Hello {{name}},\n\nThank you for the conversation. Here is the agreed meeting follow-up.', array['name','service'], true),
  ('Discovery Call', 'discovery_call', 'Discovery call for {{service}}', '<p>Hello {{name}},</p><p>Let us schedule a focused discovery call about your {{service}} requirements.</p>', 'Hello {{name}},\n\nLet us schedule a focused discovery call about your {{service}} requirements.', array['name','service'], true),
  ('Project Started', 'project_started', 'Your {{service}} project has started', '<p>Hello {{name}},</p><p>Your project is now underway. We will keep decisions, milestones, and next steps visible.</p>', 'Hello {{name}},\n\nYour project is now underway. We will keep decisions, milestones, and next steps visible.', array['name','service'], true),
  ('Quote', 'quote', 'Quote for {{service}}', '<p>Hello {{name}},</p><p>Here is the requested quote for the agreed {{service}} scope.</p>', 'Hello {{name}},\n\nHere is the requested quote for the agreed {{service}} scope.', array['name','service','budget'], true),
  ('Follow-up', 'follow_up', 'Following up on {{service}}', '<p>Hello {{name}},</p><p>I am following up on your {{service}} inquiry. Please let me know if you would like to continue the conversation.</p>', 'Hello {{name}},\n\nI am following up on your {{service}} inquiry. Please let me know if you would like to continue the conversation.', array['name','service'], true)
on conflict (name) do nothing;

create trigger email_templates_updated_at before update on public.email_templates
for each row execute function public.set_updated_at();
create trigger lead_follow_ups_updated_at before update on public.lead_follow_ups
for each row execute function public.set_updated_at();

create index lead_email_history_timeline_idx on public.lead_email_history (lead_id, sent_at desc);
create index lead_email_history_sender_rate_idx on public.lead_email_history (sent_by, sent_at desc) where direction = 'outgoing';
create index lead_email_history_reply_idx on public.lead_email_history (direction, read_at, sent_at desc);
create index email_templates_active_name_idx on public.email_templates (is_active, name);
create index lead_follow_ups_due_idx on public.lead_follow_ups (status, scheduled_for);
create index lead_follow_ups_lead_idx on public.lead_follow_ups (lead_id, created_at desc);
create index lead_note_history_lead_idx on public.lead_note_history (lead_id, created_at desc);
create index contact_leads_follow_up_idx on public.contact_leads (next_follow_up_at) where next_follow_up_at is not null;

alter table public.email_templates enable row level security;
alter table public.lead_follow_ups enable row level security;
alter table public.lead_note_history enable row level security;

create policy "email_templates_admin_all" on public.email_templates for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "lead_follow_ups_admin_all" on public.lead_follow_ups for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "lead_notes_admin_all" on public.lead_note_history for all to authenticated using (public.is_admin()) with check (public.is_admin());

commit;
