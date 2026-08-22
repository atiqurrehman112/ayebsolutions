begin;

alter table public.blog_articles
  add column author_name text,
  add column featured_media_id uuid references public.media_library (id) on delete set null,
  add column faq jsonb not null default '[]'::jsonb,
  add constraint blog_faq_array check (jsonb_typeof(faq) = 'array');

create index blog_articles_public_listing_idx
  on public.blog_articles (status, is_featured desc, published_at desc, id);

create index blog_articles_featured_media_idx
  on public.blog_articles (featured_media_id)
  where featured_media_id is not null;

commit;
