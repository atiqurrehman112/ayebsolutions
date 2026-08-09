begin;

alter table public.blog_articles
  add column is_featured boolean not null default false,
  add column search_text text not null default '';

create or replace function public.refresh_blog_search_text()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.search_text := concat_ws(
    ' ',
    new.title,
    new.description,
    new.excerpt,
    new.content::text,
    array_to_string(new.keywords, ' ')
  );
  return new;
end;
$$;

create trigger blog_articles_search_text
before insert or update of title, description, excerpt, content, keywords
on public.blog_articles
for each row execute function public.refresh_blog_search_text();

update public.blog_articles
set search_text = concat_ws(
  ' ', title, description, excerpt, content::text, array_to_string(keywords, ' ')
);

create index blog_articles_featured_idx on public.blog_articles (is_featured)
where is_featured = true;

commit;
