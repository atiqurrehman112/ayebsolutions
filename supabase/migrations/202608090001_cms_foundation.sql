begin;

create extension if not exists pgcrypto;

create type public.app_role as enum ('admin', 'editor', 'viewer');
create type public.profile_status as enum ('active', 'suspended', 'invited');
create type public.content_status as enum ('draft', 'review', 'published', 'archived');
create type public.lead_status as enum ('new', 'reviewed', 'assigned', 'proposal', 'follow_up', 'closed', 'archived');
create type public.category_kind as enum ('portfolio', 'blog', 'service');
create type public.media_visibility as enum ('public', 'private');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  role public.app_role not null default 'viewer',
  status public.profile_status not null default 'active',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null,
  description text,
  kind public.category_kind not null,
  status public.content_status not null default 'draft',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.profiles (id) on delete set null default auth.uid(),
  updated_by uuid references public.profiles (id) on delete set null default auth.uid(),
  constraint categories_kind_slug_unique unique (kind, slug),
  constraint categories_name_not_blank check (length(trim(name)) > 0),
  constraint categories_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  status public.content_status not null default 'draft',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.profiles (id) on delete set null default auth.uid(),
  updated_by uuid references public.profiles (id) on delete set null default auth.uid(),
  constraint tags_name_not_blank check (length(trim(name)) > 0),
  constraint tags_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null,
  challenge text,
  solution text,
  category_id uuid references public.categories (id) on delete set null,
  project_type text not null,
  technologies text[] not null default '{}',
  features jsonb not null default '[]'::jsonb,
  status public.content_status not null default 'draft',
  is_featured boolean not null default false,
  published_at timestamptz,
  meta_title text,
  meta_description text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.profiles (id) on delete set null default auth.uid(),
  updated_by uuid references public.profiles (id) on delete set null default auth.uid(),
  constraint portfolio_title_not_blank check (length(trim(title)) > 0),
  constraint portfolio_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table public.blog_articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  excerpt text not null,
  content jsonb not null default '[]'::jsonb,
  category_id uuid references public.categories (id) on delete set null,
  reading_time_minutes integer,
  difficulty text,
  keywords text[] not null default '{}',
  status public.content_status not null default 'draft',
  published_at timestamptz,
  meta_title text,
  meta_description text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.profiles (id) on delete set null default auth.uid(),
  updated_by uuid references public.profiles (id) on delete set null default auth.uid(),
  constraint blog_title_not_blank check (length(trim(title)) > 0),
  constraint blog_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint blog_reading_time_positive check (reading_time_minutes is null or reading_time_minutes > 0)
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null,
  description text not null,
  category_id uuid references public.categories (id) on delete set null,
  features text[] not null default '{}',
  technologies text[] not null default '{}',
  status public.content_status not null default 'draft',
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  meta_title text,
  meta_description text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.profiles (id) on delete set null default auth.uid(),
  updated_by uuid references public.profiles (id) on delete set null default auth.uid(),
  constraint services_title_not_blank check (length(trim(title)) > 0),
  constraint services_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint services_sort_order_nonnegative check (sort_order >= 0)
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  reviewer_name text not null,
  company_name text,
  reviewer_role text,
  quote text not null,
  rating smallint,
  related_service_id uuid references public.services (id) on delete set null,
  consent_verified boolean not null default false,
  is_featured boolean not null default false,
  status public.content_status not null default 'draft',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.profiles (id) on delete set null default auth.uid(),
  updated_by uuid references public.profiles (id) on delete set null default auth.uid(),
  constraint testimonials_name_not_blank check (length(trim(reviewer_name)) > 0),
  constraint testimonials_quote_not_blank check (length(trim(quote)) > 0),
  constraint testimonials_rating_range check (rating is null or rating between 1 and 5)
);

create table public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  project_type text not null,
  budget_range text,
  timeline text,
  message text not null,
  interested_services text[] not null default '{}',
  priority text not null default 'normal',
  status public.lead_status not null default 'new',
  source text not null default 'website',
  assigned_to uuid references public.profiles (id) on delete set null,
  internal_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  constraint contact_name_not_blank check (length(trim(name)) > 0),
  constraint contact_email_normalized check (email = lower(trim(email))),
  constraint contact_message_not_blank check (length(trim(message)) > 0)
);

create table public.media_library (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  storage_path text not null unique,
  mime_type text not null,
  file_size_bytes bigint not null,
  alt_text text,
  visibility public.media_visibility not null default 'private',
  usage_locations text[] not null default '{}',
  metadata jsonb not null default '{}'::jsonb,
  status public.content_status not null default 'draft',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.profiles (id) on delete set null default auth.uid(),
  updated_by uuid references public.profiles (id) on delete set null default auth.uid(),
  constraint media_file_name_not_blank check (length(trim(file_name)) > 0),
  constraint media_storage_path_not_blank check (length(trim(storage_path)) > 0),
  constraint media_file_size_nonnegative check (file_size_bytes >= 0)
);

create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  group_name text not null,
  value jsonb not null,
  description text,
  is_public boolean not null default false,
  status public.content_status not null default 'draft',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.profiles (id) on delete set null default auth.uid(),
  updated_by uuid references public.profiles (id) on delete set null default auth.uid(),
  constraint settings_key_format check (key ~ '^[a-z0-9]+(?:[._-][a-z0-9]+)*$'),
  constraint settings_group_not_blank check (length(trim(group_name)) > 0)
);

create table public.article_tags (
  article_id uuid not null references public.blog_articles (id) on delete cascade,
  tag_id uuid not null references public.tags (id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.profiles (id) on delete set null default auth.uid(),
  primary key (article_id, tag_id)
);

create table public.project_tags (
  project_id uuid not null references public.portfolio_projects (id) on delete cascade,
  tag_id uuid not null references public.tags (id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.profiles (id) on delete set null default auth.uid(),
  primary key (project_id, tag_id)
);

create index profiles_role_status_idx on public.profiles (role, status);
create index categories_kind_status_idx on public.categories (kind, status);
create index tags_status_idx on public.tags (status);
create index portfolio_projects_status_featured_idx on public.portfolio_projects (status, is_featured);
create index portfolio_projects_category_idx on public.portfolio_projects (category_id);
create index portfolio_projects_created_at_idx on public.portfolio_projects (created_at desc);
create index blog_articles_status_published_idx on public.blog_articles (status, published_at desc);
create index blog_articles_category_idx on public.blog_articles (category_id);
create index services_status_sort_idx on public.services (status, sort_order);
create index services_category_idx on public.services (category_id);
create index testimonials_status_featured_idx on public.testimonials (status, is_featured);
create index testimonials_service_idx on public.testimonials (related_service_id);
create index contact_leads_status_created_idx on public.contact_leads (status, created_at desc);
create index contact_leads_assigned_idx on public.contact_leads (assigned_to);
create index contact_leads_email_idx on public.contact_leads (email);
create index media_library_status_visibility_idx on public.media_library (status, visibility);
create index media_library_mime_type_idx on public.media_library (mime_type);
create index site_settings_group_status_idx on public.site_settings (group_name, status);
create index article_tags_tag_idx on public.article_tags (tag_id);
create index project_tags_tag_idx on public.project_tags (tag_id);

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = timezone('utc', now());
  new.updated_by = auth.uid();
  return new;
end;
$$;

create function public.set_profile_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  requested_role text;
begin
  requested_role := new.raw_app_meta_data ->> 'role';
  insert into public.profiles (id, display_name, role)
  values (
    new.id,
    nullif(trim(coalesce(new.raw_user_meta_data ->> 'display_name', '')), ''),
    case
      when requested_role in ('admin', 'editor', 'viewer') then requested_role::public.app_role
      else 'viewer'::public.app_role
    end
  );
  return new;
end;
$$;

insert into public.profiles (id, display_name, role)
select
  users.id,
  nullif(trim(coalesce(users.raw_user_meta_data ->> 'display_name', '')), ''),
  case
    when users.raw_app_meta_data ->> 'role' in ('admin', 'editor', 'viewer')
      then (users.raw_app_meta_data ->> 'role')::public.app_role
    else 'viewer'::public.app_role
  end
from auth.users as users
on conflict (id) do nothing;

create trigger profiles_updated_at before update on public.profiles
for each row execute function public.set_profile_updated_at();

create trigger categories_updated_at before update on public.categories
for each row execute function public.set_updated_at();
create trigger tags_updated_at before update on public.tags
for each row execute function public.set_updated_at();
create trigger portfolio_projects_updated_at before update on public.portfolio_projects
for each row execute function public.set_updated_at();
create trigger blog_articles_updated_at before update on public.blog_articles
for each row execute function public.set_updated_at();
create trigger services_updated_at before update on public.services
for each row execute function public.set_updated_at();
create trigger testimonials_updated_at before update on public.testimonials
for each row execute function public.set_updated_at();
create trigger contact_leads_updated_at before update on public.contact_leads
for each row execute function public.set_updated_at();
create trigger media_library_updated_at before update on public.media_library
for each row execute function public.set_updated_at();
create trigger site_settings_updated_at before update on public.site_settings
for each row execute function public.set_updated_at();

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create function public.current_app_role()
returns public.app_role
language sql
stable
security definer
set search_path = ''
as $$
  select role from public.profiles where id = auth.uid() and status = 'active';
$$;

create function public.can_view_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
  select auth.uid() is not null
    and public.current_app_role() in ('admin', 'editor', 'viewer');
$$;

create function public.can_edit_content()
returns boolean
language sql
stable
set search_path = ''
as $$
  select auth.uid() is not null
    and public.current_app_role() in ('admin', 'editor');
$$;

create function public.is_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
  select auth.uid() is not null
    and public.current_app_role() = 'admin';
$$;

revoke all on function public.current_app_role() from public;
revoke all on function public.can_view_admin() from public;
revoke all on function public.can_edit_content() from public;
revoke all on function public.is_admin() from public;
grant execute on function public.current_app_role() to authenticated;
grant execute on function public.can_view_admin() to authenticated;
grant execute on function public.can_edit_content() to authenticated;
grant execute on function public.is_admin() to authenticated;

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.blog_articles enable row level security;
alter table public.services enable row level security;
alter table public.testimonials enable row level security;
alter table public.contact_leads enable row level security;
alter table public.media_library enable row level security;
alter table public.site_settings enable row level security;
alter table public.article_tags enable row level security;
alter table public.project_tags enable row level security;

create policy "profiles_view_self_or_admin" on public.profiles
for select to authenticated
using (id = auth.uid() or public.is_admin());
create policy "profiles_admin_insert" on public.profiles
for insert to authenticated with check (public.is_admin());
create policy "profiles_admin_update" on public.profiles
for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "profiles_admin_delete" on public.profiles
for delete to authenticated using (public.is_admin() and id <> auth.uid());

create policy "categories_public_read" on public.categories
for select to anon, authenticated using (status = 'published');
create policy "categories_admin_read" on public.categories
for select to authenticated using (public.can_view_admin());
create policy "categories_editor_insert" on public.categories
for insert to authenticated with check (public.can_edit_content());
create policy "categories_editor_update" on public.categories
for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "categories_admin_delete" on public.categories
for delete to authenticated using (public.is_admin());

create policy "tags_public_read" on public.tags
for select to anon, authenticated using (status = 'published');
create policy "tags_admin_read" on public.tags
for select to authenticated using (public.can_view_admin());
create policy "tags_editor_insert" on public.tags
for insert to authenticated with check (public.can_edit_content());
create policy "tags_editor_update" on public.tags
for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "tags_admin_delete" on public.tags
for delete to authenticated using (public.is_admin());

create policy "portfolio_public_read" on public.portfolio_projects
for select to anon, authenticated using (status = 'published');
create policy "portfolio_admin_read" on public.portfolio_projects
for select to authenticated using (public.can_view_admin());
create policy "portfolio_editor_insert" on public.portfolio_projects
for insert to authenticated with check (public.can_edit_content());
create policy "portfolio_editor_update" on public.portfolio_projects
for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "portfolio_admin_delete" on public.portfolio_projects
for delete to authenticated using (public.is_admin());

create policy "blog_public_read" on public.blog_articles
for select to anon, authenticated using (status = 'published');
create policy "blog_admin_read" on public.blog_articles
for select to authenticated using (public.can_view_admin());
create policy "blog_editor_insert" on public.blog_articles
for insert to authenticated with check (public.can_edit_content());
create policy "blog_editor_update" on public.blog_articles
for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "blog_admin_delete" on public.blog_articles
for delete to authenticated using (public.is_admin());

create policy "services_public_read" on public.services
for select to anon, authenticated using (status = 'published');
create policy "services_admin_read" on public.services
for select to authenticated using (public.can_view_admin());
create policy "services_editor_insert" on public.services
for insert to authenticated with check (public.can_edit_content());
create policy "services_editor_update" on public.services
for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "services_admin_delete" on public.services
for delete to authenticated using (public.is_admin());

create policy "testimonials_public_read" on public.testimonials
for select to anon, authenticated using (status = 'published' and consent_verified);
create policy "testimonials_admin_read" on public.testimonials
for select to authenticated using (public.can_view_admin());
create policy "testimonials_editor_insert" on public.testimonials
for insert to authenticated with check (public.can_edit_content());
create policy "testimonials_editor_update" on public.testimonials
for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "testimonials_admin_delete" on public.testimonials
for delete to authenticated using (public.is_admin());

create policy "leads_public_insert" on public.contact_leads
for insert to anon, authenticated with check (created_by is null and updated_by is null and assigned_to is null and internal_notes is null);
create policy "leads_admin_read" on public.contact_leads
for select to authenticated using (public.can_view_admin());
create policy "leads_editor_update" on public.contact_leads
for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "leads_admin_delete" on public.contact_leads
for delete to authenticated using (public.is_admin());

create policy "media_public_read" on public.media_library
for select to anon, authenticated using (status = 'published' and visibility = 'public');
create policy "media_admin_read" on public.media_library
for select to authenticated using (public.can_view_admin());
create policy "media_editor_insert" on public.media_library
for insert to authenticated with check (public.can_edit_content());
create policy "media_editor_update" on public.media_library
for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "media_admin_delete" on public.media_library
for delete to authenticated using (public.is_admin());

create policy "settings_public_read" on public.site_settings
for select to anon, authenticated using (status = 'published' and is_public);
create policy "settings_admin_read" on public.site_settings
for select to authenticated using (public.can_view_admin());
create policy "settings_admin_insert" on public.site_settings
for insert to authenticated with check (public.is_admin());
create policy "settings_admin_update" on public.site_settings
for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "settings_admin_delete" on public.site_settings
for delete to authenticated using (public.is_admin());

create policy "article_tags_public_read" on public.article_tags
for select to anon, authenticated using (
  exists (select 1 from public.blog_articles where id = article_id and status = 'published')
  and exists (select 1 from public.tags where id = tag_id and status = 'published')
);
create policy "article_tags_admin_read" on public.article_tags
for select to authenticated using (public.can_view_admin());
create policy "article_tags_editor_insert" on public.article_tags
for insert to authenticated with check (public.can_edit_content());
create policy "article_tags_editor_delete" on public.article_tags
for delete to authenticated using (public.can_edit_content());

create policy "project_tags_public_read" on public.project_tags
for select to anon, authenticated using (
  exists (select 1 from public.portfolio_projects where id = project_id and status = 'published')
  and exists (select 1 from public.tags where id = tag_id and status = 'published')
);
create policy "project_tags_admin_read" on public.project_tags
for select to authenticated using (public.can_view_admin());
create policy "project_tags_editor_insert" on public.project_tags
for insert to authenticated with check (public.can_edit_content());
create policy "project_tags_editor_delete" on public.project_tags
for delete to authenticated using (public.can_edit_content());

commit;
