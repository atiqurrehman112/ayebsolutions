begin;

alter table public.services
  add column subtitle text,
  add column benefits text[] not null default '{}',
  add column process jsonb not null default '[]'::jsonb,
  add column deliverables text[] not null default '{}',
  add column faq jsonb not null default '[]'::jsonb,
  add constraint services_process_array check (jsonb_typeof(process) = 'array'),
  add constraint services_faq_array check (jsonb_typeof(faq) = 'array');

create table public.service_media (
  service_id uuid not null references public.services (id) on delete cascade,
  media_id uuid not null references public.media_library (id) on delete cascade,
  sort_order integer not null default 0,
  caption text,
  created_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.profiles (id) on delete set null default auth.uid(),
  primary key (service_id, media_id),
  constraint service_media_sort_nonnegative check (sort_order >= 0)
);

create index service_media_order_idx on public.service_media (service_id, sort_order);
create index service_media_media_idx on public.service_media (media_id);
create index services_public_listing_idx on public.services (status, is_featured desc, sort_order, id);

alter table public.service_media enable row level security;
create policy "service_media_public_read" on public.service_media for select using (
  exists (select 1 from public.services where id = service_id and status = 'published')
);
create policy "service_media_admin_read" on public.service_media for select to authenticated using (public.is_admin());
create policy "service_media_editor_insert" on public.service_media for insert to authenticated with check (public.can_edit_content());
create policy "service_media_editor_update" on public.service_media for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "service_media_editor_delete" on public.service_media for delete to authenticated using (public.can_edit_content());

commit;
