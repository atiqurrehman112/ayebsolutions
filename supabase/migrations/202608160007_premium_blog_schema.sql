begin;

alter table public.blog_articles
  add column if not exists canonical_url text,
  add column if not exists open_graph_media_id uuid references public.media_library(id) on delete set null,
  add column if not exists allow_comments boolean not null default false,
  add column if not exists scheduled_at timestamptz;

create table if not exists public.blog_article_media (
  article_id uuid not null references public.blog_articles(id) on delete cascade,
  media_id uuid not null references public.media_library(id) on delete cascade,
  sort_order integer not null default 0,
  caption text,
  created_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.profiles(id) on delete set null default auth.uid(),
  primary key (article_id, media_id)
);

create index if not exists blog_articles_scheduled_idx on public.blog_articles(scheduled_at) where status = 'scheduled';
create index if not exists blog_article_media_order_idx on public.blog_article_media(article_id, sort_order);

alter table public.blog_article_media enable row level security;
drop policy if exists "blog_public_read" on public.blog_articles;
create policy "blog_public_read" on public.blog_articles for select to anon, authenticated using (status = 'published' or (status = 'scheduled' and published_at <= now()));
create policy "blog_media_public_read" on public.blog_article_media for select using (exists (select 1 from public.blog_articles where id = article_id and (status = 'published' or (status = 'scheduled' and published_at <= now()))));
create policy "blog_media_editor_insert" on public.blog_article_media for insert to authenticated with check (public.can_edit_content());
create policy "blog_media_editor_update" on public.blog_article_media for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "blog_media_editor_delete" on public.blog_article_media for delete to authenticated using (public.can_edit_content());

insert into public.categories(name, slug, kind, status) values
  ('Technology','technology','blog','published'), ('AI','ai','blog','published'),
  ('Web Development','web-development','blog','published'), ('Automation','automation','blog','published'),
  ('Case Studies','case-studies','blog','published'), ('Business','business','blog','published'),
  ('Design','design','blog','published'), ('Marketing','marketing','blog','published'),
  ('News','news','blog','published')
on conflict (kind, slug) do nothing;

commit;
