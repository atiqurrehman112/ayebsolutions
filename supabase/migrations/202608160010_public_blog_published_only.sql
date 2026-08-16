begin;

drop policy if exists "blog_public_read" on public.blog_articles;
create policy "blog_public_read"
on public.blog_articles
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "blog_media_public_read" on public.blog_article_media;
create policy "blog_media_public_read"
on public.blog_article_media
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.blog_articles
    where id = article_id
      and status = 'published'
  )
);

commit;
