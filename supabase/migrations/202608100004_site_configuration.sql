begin;

create table public.site_configuration (
  id uuid primary key default gen_random_uuid(),
  site_name text not null default 'Ayeb Solutions',
  tagline text not null default 'Engineering intelligent digital growth.',
  site_url text not null,
  default_language text not null default 'en',
  timezone text not null default 'UTC',
  logo_media_id uuid references public.media_library(id) on delete set null,
  favicon_media_id uuid references public.media_library(id) on delete set null,
  open_graph_media_id uuid references public.media_library(id) on delete set null,
  default_meta_title text not null,
  default_meta_description text not null,
  default_keywords text[] not null default '{}',
  robots text not null default 'index,follow',
  canonical_base_url text not null,
  contact_email text,
  contact_phone text,
  whatsapp text,
  address text,
  google_maps_url text,
  facebook_url text,
  instagram_url text,
  linkedin_url text,
  github_url text,
  x_url text,
  youtube_url text,
  header_navigation jsonb not null default '[]',
  footer_navigation jsonb not null default '[]',
  footer_copyright text not null default 'All rights reserved.',
  working_hours text,
  emergency_contact text,
  business_registration_number text,
  google_analytics_id text,
  google_tag_manager_id text,
  microsoft_clarity_id text,
  enable_blog boolean not null default true,
  enable_testimonials boolean not null default true,
  enable_contact_form boolean not null default true,
  enable_newsletter boolean not null default false,
  enable_ai_features boolean not null default true,
  maintenance_mode boolean not null default false,
  maintenance_message text not null default 'The website is temporarily unavailable while maintenance is completed.',
  status public.content_status not null default 'published',
  created_at timestamptz not null default timezone('utc',now()),
  updated_at timestamptz not null default timezone('utc',now()),
  created_by uuid references public.profiles(id) on delete set null default auth.uid(),
  updated_by uuid references public.profiles(id) on delete set null default auth.uid(),
  constraint site_configuration_singleton check (id = '00000000-0000-4000-8000-000000000001'),
  constraint site_configuration_urls check (site_url ~ '^https?://' and canonical_base_url ~ '^https?://'),
  constraint site_configuration_language check (default_language ~ '^[a-z]{2}(-[A-Z]{2})?$')
);

insert into public.site_configuration (
  id, site_url, default_meta_title, default_meta_description, canonical_base_url,
  contact_email, header_navigation, footer_navigation
) values (
  '00000000-0000-4000-8000-000000000001',
  'https://ayebsolutions.com',
  'Ayeb Solutions',
  'Premium web development, AI automation, and digital product engineering for ambitious businesses.',
  'https://ayebsolutions.com',
  'hello@ayebsolutions.com',
  '[{"label":"Home","href":"/"},{"label":"Services","href":"/services"},{"label":"Portfolio","href":"/portfolio"},{"label":"Blog","href":"/blog"},{"label":"About","href":"/about"},{"label":"Contact","href":"/contact"}]',
  '[{"title":"Company","links":[{"label":"About","href":"/about"},{"label":"Contact","href":"/contact"}]},{"title":"Services","links":[{"label":"Web Development","href":"/services/web-development"},{"label":"AI Automation","href":"/services/ai-automation"}]},{"title":"Resources","links":[{"label":"Portfolio","href":"/portfolio"},{"label":"Blog","href":"/blog"}]}]'
);

create trigger site_configuration_updated_at before update on public.site_configuration
for each row execute function public.set_updated_at();
alter table public.site_configuration enable row level security;
create policy "site_configuration_public_read" on public.site_configuration for select to anon,authenticated using(status='published');
create policy "site_configuration_admin_read" on public.site_configuration for select to authenticated using(public.can_view_admin());
create policy "site_configuration_admin_insert" on public.site_configuration for insert to authenticated with check(public.is_admin());
create policy "site_configuration_admin_update" on public.site_configuration for update to authenticated using(public.is_admin()) with check(public.is_admin());

commit;
