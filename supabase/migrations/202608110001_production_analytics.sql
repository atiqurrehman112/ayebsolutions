alter table public.site_configuration
  add column if not exists google_search_console_verification text,
  add column if not exists plausible_domain text,
  add column if not exists vercel_analytics_enabled boolean not null default false;

comment on column public.site_configuration.google_search_console_verification is 'Google Search Console HTML verification token.';
comment on column public.site_configuration.plausible_domain is 'Domain sent to the Plausible analytics script.';
comment on column public.site_configuration.vercel_analytics_enabled is 'Controls loading the Vercel Web Analytics script.';
