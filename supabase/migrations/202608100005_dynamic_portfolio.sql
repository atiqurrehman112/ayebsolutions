begin;

alter table public.portfolio_projects
  add column client_goals text[] not null default '{}',
  add column results text[] not null default '{}',
  add column faq jsonb not null default '[]',
  add constraint portfolio_faq_array check (jsonb_typeof(faq) = 'array');

create table public.portfolio_project_media (
  project_id uuid not null references public.portfolio_projects(id) on delete cascade,
  media_id uuid not null references public.media_library(id) on delete cascade,
  sort_order integer not null default 0,
  caption text,
  created_at timestamptz not null default timezone('utc',now()),
  created_by uuid references public.profiles(id) on delete set null default auth.uid(),
  primary key(project_id,media_id),
  constraint portfolio_media_order_nonnegative check(sort_order >= 0)
);
create index portfolio_published_sort_idx on public.portfolio_projects(status,is_featured,published_at desc,title);
create index portfolio_project_media_order_idx on public.portfolio_project_media(project_id,sort_order);
alter table public.portfolio_project_media enable row level security;
create policy "portfolio_media_public_read" on public.portfolio_project_media for select to anon,authenticated using(
  exists(select 1 from public.portfolio_projects where id=project_id and status='published')
);
create policy "portfolio_media_admin_read" on public.portfolio_project_media for select to authenticated using(public.can_view_admin());
create policy "portfolio_media_editor_insert" on public.portfolio_project_media for insert to authenticated with check(public.can_edit_content());
create policy "portfolio_media_editor_update" on public.portfolio_project_media for update to authenticated using(public.can_edit_content()) with check(public.can_edit_content());
create policy "portfolio_media_editor_delete" on public.portfolio_project_media for delete to authenticated using(public.can_edit_content());

commit;
