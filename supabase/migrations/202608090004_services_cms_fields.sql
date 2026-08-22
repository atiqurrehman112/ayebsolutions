begin;

alter table public.services
  add column icon text,
  add column keywords text[] not null default '{}';

create index services_featured_sort_idx
on public.services (is_featured desc, sort_order asc);

commit;
