begin;

-- Sprint 8B used a generic key/value table. Sprint 8I intentionally replaced it
-- with this typed singleton. This reconciliation is safe for environments that
-- have either schema and leaves legacy rows intact for rollback/audit purposes.
create table if not exists public.site_configuration (
  id uuid primary key default gen_random_uuid(),
  site_name text not null default 'Ayeb Solutions',
  tagline text not null default 'Engineering intelligent digital growth.',
  site_url text not null default 'https://ayebsolutions.com',
  default_language text not null default 'en',
  timezone text not null default 'UTC',
  logo_media_id uuid references public.media_library(id) on delete set null,
  favicon_media_id uuid references public.media_library(id) on delete set null,
  open_graph_media_id uuid references public.media_library(id) on delete set null,
  default_meta_title text not null default 'Ayeb Solutions',
  default_meta_description text not null default 'Premium web development, AI automation, and digital product engineering for ambitious businesses.',
  default_keywords text[] not null default '{}',
  robots text not null default 'index,follow',
  canonical_base_url text not null default 'https://ayebsolutions.com',
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
  header_navigation jsonb not null default '[]'::jsonb,
  footer_navigation jsonb not null default '[]'::jsonb,
  footer_copyright text not null default 'All rights reserved.',
  working_hours text,
  emergency_contact text,
  business_registration_number text,
  google_analytics_id text,
  google_search_console_verification text,
  google_tag_manager_id text,
  microsoft_clarity_id text,
  plausible_domain text,
  vercel_analytics_enabled boolean not null default false,
  enable_blog boolean not null default true,
  enable_testimonials boolean not null default true,
  enable_contact_form boolean not null default true,
  enable_newsletter boolean not null default false,
  enable_ai_features boolean not null default true,
  maintenance_mode boolean not null default false,
  maintenance_message text not null default 'The website is temporarily unavailable while maintenance is completed.',
  homepage_heading text,
  homepage_subheading text,
  homepage_badge text,
  homepage_primary_cta_label text,
  homepage_primary_cta_href text,
  homepage_secondary_cta_label text,
  homepage_secondary_cta_href text,
  homepage_hero_media_id uuid references public.media_library(id) on delete set null,
  homepage_background_media_id uuid references public.media_library(id) on delete set null,
  homepage_statistics jsonb not null default '[]'::jsonb,
  homepage_trust_indicators text[] not null default '{}',
  homepage_services_limit integer not null default 6,
  homepage_portfolio_limit integer not null default 6,
  homepage_blog_limit integer not null default 3,
  homepage_testimonials_limit integer not null default 6,
  homepage_cta_heading text,
  homepage_cta_description text,
  homepage_cta_primary_label text,
  homepage_cta_primary_href text,
  homepage_cta_secondary_label text,
  homepage_cta_secondary_href text,
  status public.content_status not null default 'published',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.profiles(id) on delete set null default auth.uid(),
  updated_by uuid references public.profiles(id) on delete set null default auth.uid()
);

-- Repair partially applied Sprint 8I/9D/10B schemas as well as fully missing ones.
alter table public.site_configuration
  add column if not exists google_search_console_verification text,
  add column if not exists plausible_domain text,
  add column if not exists vercel_analytics_enabled boolean not null default false,
  add column if not exists homepage_heading text,
  add column if not exists homepage_subheading text,
  add column if not exists homepage_badge text,
  add column if not exists homepage_primary_cta_label text,
  add column if not exists homepage_primary_cta_href text,
  add column if not exists homepage_secondary_cta_label text,
  add column if not exists homepage_secondary_cta_href text,
  add column if not exists homepage_hero_media_id uuid references public.media_library(id) on delete set null,
  add column if not exists homepage_background_media_id uuid references public.media_library(id) on delete set null,
  add column if not exists homepage_statistics jsonb not null default '[]'::jsonb,
  add column if not exists homepage_trust_indicators text[] not null default '{}',
  add column if not exists homepage_services_limit integer not null default 6,
  add column if not exists homepage_portfolio_limit integer not null default 6,
  add column if not exists homepage_blog_limit integer not null default 3,
  add column if not exists homepage_testimonials_limit integer not null default 6,
  add column if not exists homepage_cta_heading text,
  add column if not exists homepage_cta_description text,
  add column if not exists homepage_cta_primary_label text,
  add column if not exists homepage_cta_primary_href text,
  add column if not exists homepage_cta_secondary_label text,
  add column if not exists homepage_cta_secondary_href text;

insert into public.site_configuration (
  id,
  contact_email,
  header_navigation,
  footer_navigation
) values (
  '00000000-0000-4000-8000-000000000001',
  null,
  '[{"label":"Home","href":"/"},{"label":"Services","href":"/services"},{"label":"Portfolio","href":"/portfolio"},{"label":"Blog","href":"/blog"},{"label":"About","href":"/about"},{"label":"Contact","href":"/contact"}]'::jsonb,
  '[{"title":"Company","links":[{"label":"About","href":"/about"},{"label":"Contact","href":"/contact"}]},{"title":"Services","links":[{"label":"Web Development","href":"/services/web-development"},{"label":"AI Automation","href":"/services/ai-automation"}]},{"title":"Resources","links":[{"label":"Portfolio","href":"/portfolio"},{"label":"Blog","href":"/blog"}]}]'::jsonb
)
on conflict (id) do nothing;

-- Copy recognized legacy keys into the singleton. Existing typed values win in
-- already-migrated environments; migration happens only when the singleton was
-- just created with defaults.
do $$
declare
  legacy jsonb;
begin
  if to_regclass('public.site_settings') is null then
    return;
  end if;

  select coalesce(jsonb_object_agg(key, value), '{}'::jsonb)
  into legacy
  from public.site_settings
  where status in ('published', 'draft', 'review');

  update public.site_configuration
  set
    site_name = case when site_name = 'Ayeb Solutions' then coalesce(legacy #>> '{site.name}', legacy #>> '{site_name}', site_name) else site_name end,
    tagline = case when tagline = 'Engineering intelligent digital growth.' then coalesce(legacy #>> '{site.tagline}', legacy #>> '{tagline}', tagline) else tagline end,
    site_url = case when site_url = 'https://ayebsolutions.com' then coalesce(legacy #>> '{site.url}', legacy #>> '{site_url}', site_url) else site_url end,
    default_language = case when default_language = 'en' then coalesce(legacy #>> '{site.language}', legacy #>> '{default_language}', default_language) else default_language end,
    timezone = case when timezone = 'UTC' then coalesce(legacy #>> '{site.timezone}', legacy #>> '{timezone}', timezone) else timezone end,
    default_meta_title = case when default_meta_title = 'Ayeb Solutions' then coalesce(legacy #>> '{seo.title}', legacy #>> '{default_meta_title}', default_meta_title) else default_meta_title end,
    default_meta_description = case when default_meta_description = 'Premium web development, AI automation, and digital product engineering for ambitious businesses.' then coalesce(legacy #>> '{seo.description}', legacy #>> '{default_meta_description}', default_meta_description) else default_meta_description end,
    robots = case when robots = 'index,follow' then coalesce(legacy #>> '{seo.robots}', legacy #>> '{robots}', robots) else robots end,
    canonical_base_url = case when canonical_base_url = 'https://ayebsolutions.com' then coalesce(legacy #>> '{seo.canonical_base_url}', legacy #>> '{canonical_base_url}', canonical_base_url) else canonical_base_url end,
    contact_email = coalesce(contact_email, legacy #>> '{contact.email}', legacy #>> '{contact_email}'),
    contact_phone = coalesce(contact_phone, legacy #>> '{contact.phone}', legacy #>> '{contact_phone}'),
    whatsapp = coalesce(whatsapp, legacy #>> '{contact.whatsapp}', legacy #>> '{whatsapp}'),
    address = coalesce(address, legacy #>> '{contact.address}', legacy #>> '{address}'),
    footer_copyright = case when footer_copyright = 'All rights reserved.' then coalesce(legacy #>> '{footer.copyright}', legacy #>> '{footer_copyright}', footer_copyright) else footer_copyright end,
    maintenance_message = case when maintenance_message = 'The website is temporarily unavailable while maintenance is completed.' then coalesce(legacy #>> '{maintenance.message}', legacy #>> '{maintenance_message}', maintenance_message) else maintenance_message end,
    header_navigation = case
      when header_navigation in ('[]'::jsonb, '[{"label":"Home","href":"/"},{"label":"Services","href":"/services"},{"label":"Portfolio","href":"/portfolio"},{"label":"Blog","href":"/blog"},{"label":"About","href":"/about"},{"label":"Contact","href":"/contact"}]'::jsonb) and jsonb_typeof(legacy -> 'navigation.header') = 'array' then legacy -> 'navigation.header'
      when header_navigation in ('[]'::jsonb, '[{"label":"Home","href":"/"},{"label":"Services","href":"/services"},{"label":"Portfolio","href":"/portfolio"},{"label":"Blog","href":"/blog"},{"label":"About","href":"/about"},{"label":"Contact","href":"/contact"}]'::jsonb) and jsonb_typeof(legacy -> 'header_navigation') = 'array' then legacy -> 'header_navigation'
      else header_navigation
    end,
    footer_navigation = case
      when footer_navigation = '[]'::jsonb and jsonb_typeof(legacy -> 'navigation.footer') = 'array' then legacy -> 'navigation.footer'
      when footer_navigation = '[]'::jsonb and jsonb_typeof(legacy -> 'footer_navigation') = 'array' then legacy -> 'footer_navigation'
      else footer_navigation
    end,
    maintenance_mode = case
      when maintenance_mode = false and jsonb_typeof(legacy -> 'maintenance.enabled') = 'boolean' then (legacy ->> 'maintenance.enabled')::boolean
      when maintenance_mode = false and jsonb_typeof(legacy -> 'maintenance_mode') = 'boolean' then (legacy ->> 'maintenance_mode')::boolean
      else maintenance_mode
    end
  where id = '00000000-0000-4000-8000-000000000001';
end;
$$;

update public.site_configuration
set contact_email = 'hello@ayebsolutions.com'
where id = '00000000-0000-4000-8000-000000000001'
  and contact_email is null;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'site_configuration_singleton' and conrelid = 'public.site_configuration'::regclass) then
    alter table public.site_configuration add constraint site_configuration_singleton check (id = '00000000-0000-4000-8000-000000000001');
  end if;
  if not exists (select 1 from pg_constraint where conname = 'site_configuration_urls' and conrelid = 'public.site_configuration'::regclass) then
    alter table public.site_configuration add constraint site_configuration_urls check (site_url ~ '^https?://' and canonical_base_url ~ '^https?://');
  end if;
  if not exists (select 1 from pg_constraint where conname = 'site_configuration_language' and conrelid = 'public.site_configuration'::regclass) then
    alter table public.site_configuration add constraint site_configuration_language check (default_language ~ '^[a-z]{2}(-[A-Z]{2})?$');
  end if;
  if not exists (select 1 from pg_constraint where conname = 'homepage_statistics_array' and conrelid = 'public.site_configuration'::regclass) then
    alter table public.site_configuration add constraint homepage_statistics_array check (jsonb_typeof(homepage_statistics) = 'array');
  end if;
  if not exists (select 1 from pg_constraint where conname = 'homepage_limits_positive' and conrelid = 'public.site_configuration'::regclass) then
    alter table public.site_configuration add constraint homepage_limits_positive check (
      homepage_services_limit between 1 and 24 and
      homepage_portfolio_limit between 1 and 24 and
      homepage_blog_limit between 1 and 24 and
      homepage_testimonials_limit between 1 and 24
    );
  end if;
end;
$$;

drop trigger if exists site_configuration_updated_at on public.site_configuration;
create trigger site_configuration_updated_at
before update on public.site_configuration
for each row execute function public.set_updated_at();

alter table public.site_configuration enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'site_configuration' and policyname = 'site_configuration_public_read') then
    create policy "site_configuration_public_read" on public.site_configuration for select to anon, authenticated using (status = 'published');
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'site_configuration' and policyname = 'site_configuration_admin_read') then
    create policy "site_configuration_admin_read" on public.site_configuration for select to authenticated using (public.can_view_admin());
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'site_configuration' and policyname = 'site_configuration_admin_insert') then
    create policy "site_configuration_admin_insert" on public.site_configuration for insert to authenticated with check (public.is_admin());
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'site_configuration' and policyname = 'site_configuration_admin_update') then
    create policy "site_configuration_admin_update" on public.site_configuration for update to authenticated using (public.is_admin()) with check (public.is_admin());
  end if;
end;
$$;

create index if not exists site_configuration_homepage_media_idx
on public.site_configuration (homepage_hero_media_id, homepage_background_media_id);

comment on table public.site_settings is 'Legacy Sprint 8B key/value settings retained for migration audit; runtime reads use site_configuration.';
comment on table public.site_configuration is 'Canonical typed site settings singleton introduced in Sprint 8I.';

commit;
