create table if not exists public.founder_profile (
  id uuid primary key default gen_random_uuid(),
  singleton_key boolean not null default true unique check (singleton_key),
  full_name text not null check (char_length(full_name) between 2 and 160),
  role_title text not null check (char_length(role_title) between 2 and 180),
  professional_headline text not null check (char_length(professional_headline) between 10 and 320),
  biography text not null check (char_length(biography) between 20 and 10000),
  profile_photo uuid references public.media_library(id) on delete set null,
  cover_image uuid references public.media_library(id) on delete set null,
  email text,
  phone text,
  linkedin_url text,
  github_url text,
  twitter_url text,
  facebook_url text,
  instagram_url text,
  portfolio_url text,
  resume_url text,
  years_experience integer check (years_experience is null or years_experience between 0 and 80),
  projects_completed integer check (projects_completed is null or projects_completed >= 0),
  happy_clients integer check (happy_clients is null or happy_clients >= 0),
  technologies text[] not null default '{}',
  certifications text[] not null default '{}',
  skills text[] not null default '{}',
  vision_statement text,
  mission_statement text,
  personal_quote text,
  availability_status text check (availability_status is null or availability_status in ('available', 'busy', 'not_accepting')),
  status public.content_status not null default 'draft' check (status in ('draft', 'published')),
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists founder_profile_status_idx on public.founder_profile (status);
create index if not exists founder_profile_photo_idx on public.founder_profile (profile_photo) where profile_photo is not null;

drop trigger if exists founder_profile_set_updated_at on public.founder_profile;
create trigger founder_profile_set_updated_at before update on public.founder_profile
for each row execute function public.set_updated_at();

alter table public.founder_profile enable row level security;

create policy "founder profile admin read" on public.founder_profile
for select to authenticated using (public.can_view_admin());
create policy "founder profile public published read" on public.founder_profile
for select to anon using (status = 'published');
create policy "founder profile editor insert" on public.founder_profile
for insert to authenticated with check (public.can_edit_content() and created_by = auth.uid() and singleton_key);
create policy "founder profile editor update" on public.founder_profile
for update to authenticated using (public.can_edit_content())
with check (public.can_edit_content() and updated_by = auth.uid() and singleton_key);
