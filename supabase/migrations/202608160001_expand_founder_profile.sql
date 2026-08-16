alter table public.founder_profile
  add column if not exists short_introduction text,
  add column if not exists location text,
  add column if not exists featured_badge text,
  add column if not exists display_order integer not null default 0,
  add column if not exists seo_title text,
  add column if not exists seo_description text,
  add column if not exists open_graph_image uuid references public.media_library(id) on delete set null;

update public.founder_profile
set short_introduction = professional_headline
where short_introduction is null;

alter table public.founder_profile
  alter column short_introduction set not null,
  add constraint founder_profile_short_introduction_length
    check (char_length(short_introduction) between 10 and 500),
  add constraint founder_profile_location_length
    check (location is null or char_length(location) <= 180),
  add constraint founder_profile_featured_badge_length
    check (featured_badge is null or char_length(featured_badge) <= 100),
  add constraint founder_profile_display_order_range
    check (display_order between 0 and 10000),
  add constraint founder_profile_seo_title_length
    check (seo_title is null or char_length(seo_title) <= 70),
  add constraint founder_profile_seo_description_length
    check (seo_description is null or char_length(seo_description) <= 180);

create index if not exists founder_profile_display_order_idx
  on public.founder_profile (display_order);
create index if not exists founder_profile_open_graph_image_idx
  on public.founder_profile (open_graph_image)
  where open_graph_image is not null;
