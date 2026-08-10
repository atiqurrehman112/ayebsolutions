begin;

alter table public.site_configuration
  add column homepage_heading text,
  add column homepage_subheading text,
  add column homepage_badge text,
  add column homepage_primary_cta_label text,
  add column homepage_primary_cta_href text,
  add column homepage_secondary_cta_label text,
  add column homepage_secondary_cta_href text,
  add column homepage_hero_media_id uuid references public.media_library (id) on delete set null,
  add column homepage_background_media_id uuid references public.media_library (id) on delete set null,
  add column homepage_statistics jsonb not null default '[]'::jsonb,
  add column homepage_trust_indicators text[] not null default '{}',
  add column homepage_services_limit integer not null default 6,
  add column homepage_portfolio_limit integer not null default 6,
  add column homepage_blog_limit integer not null default 3,
  add column homepage_testimonials_limit integer not null default 6,
  add column homepage_cta_heading text,
  add column homepage_cta_description text,
  add column homepage_cta_primary_label text,
  add column homepage_cta_primary_href text,
  add column homepage_cta_secondary_label text,
  add column homepage_cta_secondary_href text,
  add constraint homepage_statistics_array check (jsonb_typeof(homepage_statistics) = 'array'),
  add constraint homepage_limits_positive check (
    homepage_services_limit between 1 and 24 and
    homepage_portfolio_limit between 1 and 24 and
    homepage_blog_limit between 1 and 24 and
    homepage_testimonials_limit between 1 and 24
  );

create index site_configuration_homepage_media_idx on public.site_configuration (homepage_hero_media_id, homepage_background_media_id);

commit;
