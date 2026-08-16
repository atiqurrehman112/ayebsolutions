begin;

-- Sprint 13D extends the canonical typed singleton created in Sprint 8I.
-- The fixed UUID preserves existing production data and prevents a second row.
alter table public.site_configuration
  add column if not exists short_description text,
  add column if not exists long_description text,
  add column if not exists white_logo_media_id uuid references public.media_library(id) on delete set null,
  add column if not exists default_share_media_id uuid references public.media_library(id) on delete set null,
  add column if not exists secondary_email text,
  add column if not exists business_hours text,
  add column if not exists open_graph_media_id uuid references public.media_library(id) on delete set null,
  add column if not exists twitter_media_id uuid references public.media_library(id) on delete set null,
  add column if not exists meta_pixel_id text,
  add column if not exists footer_description text,
  add column if not exists footer_cta text,
  add column if not exists footer_button_text text,
  add column if not exists footer_button_link text,
  add column if not exists announcement_enabled boolean not null default false,
  add column if not exists announcement_text text,
  add column if not exists announcement_button_text text,
  add column if not exists announcement_button_url text;

update public.site_configuration
set
  short_description = coalesce(short_description, default_meta_description),
  long_description = coalesce(long_description, default_meta_description),
  footer_description = coalesce(footer_description, default_meta_description),
  footer_cta = coalesce(footer_cta, homepage_cta_heading),
  footer_button_text = coalesce(footer_button_text, homepage_cta_primary_label),
  footer_button_link = coalesce(footer_button_link, homepage_cta_primary_href),
  business_hours = coalesce(business_hours, working_hours),
  default_share_media_id = coalesce(default_share_media_id, open_graph_media_id),
  twitter_media_id = coalesce(twitter_media_id, open_graph_media_id)
where id = '00000000-0000-4000-8000-000000000001';

create unique index if not exists site_configuration_singleton_key
on public.site_configuration ((true));

create index if not exists site_configuration_brand_media_idx
on public.site_configuration (
  logo_media_id,
  white_logo_media_id,
  favicon_media_id,
  default_share_media_id,
  open_graph_media_id,
  twitter_media_id
);

comment on table public.site_configuration is
  'Canonical Global Site Settings singleton. The legacy site_settings key/value table is not used at runtime.';

commit;
