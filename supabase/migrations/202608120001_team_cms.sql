create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 160),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  profile_image uuid references public.media_library(id) on delete set null,
  role text not null check (char_length(role) between 2 and 160),
  department text check (department is null or char_length(department) <= 120),
  short_bio text not null check (char_length(short_bio) between 10 and 320),
  full_bio text check (full_bio is null or char_length(full_bio) <= 5000),
  skills text[] not null default '{}',
  years_experience integer check (years_experience is null or years_experience between 0 and 80),
  email text check (email is null or char_length(email) <= 320),
  linkedin_url text,
  github_url text,
  twitter_url text,
  portfolio_url text,
  featured boolean not null default false,
  display_order integer not null default 0 check (display_order >= 0),
  status public.content_status not null default 'draft' check (status in ('draft', 'published')),
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists team_members_status_order_idx
  on public.team_members (status, featured desc, display_order, name);
create index if not exists team_members_department_idx
  on public.team_members (department) where department is not null;
create index if not exists team_members_profile_image_idx
  on public.team_members (profile_image) where profile_image is not null;

drop trigger if exists team_members_set_updated_at on public.team_members;
create trigger team_members_set_updated_at
before update on public.team_members
for each row execute function public.set_updated_at();

alter table public.team_members enable row level security;

create policy "team members admin read"
on public.team_members for select to authenticated
using (public.can_view_admin());

create policy "team members public published read"
on public.team_members for select to anon
using (status = 'published');

create policy "team members editor insert"
on public.team_members for insert to authenticated
with check (public.can_edit_content() and created_by = auth.uid());

create policy "team members editor update"
on public.team_members for update to authenticated
using (public.can_edit_content())
with check (public.can_edit_content() and updated_by = auth.uid());

create policy "team members admin delete"
on public.team_members for delete to authenticated
using (public.is_admin());
