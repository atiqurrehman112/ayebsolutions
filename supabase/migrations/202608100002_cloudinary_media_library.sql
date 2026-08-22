begin;

alter table public.media_library rename column storage_path to public_id;
alter table public.media_library rename column file_size_bytes to bytes;
alter table public.media_library rename column alt_text to alt;

alter table public.media_library
  add column secure_url text not null default '',
  add column resource_type text not null default 'raw',
  add column format text not null default '',
  add column width integer,
  add column height integer,
  add column duration double precision,
  add column folder text not null default 'ayeb-solutions',
  add column tags text[] not null default '{}',
  add constraint media_resource_type_allowed check (resource_type in ('image', 'video', 'raw')),
  add constraint media_dimensions_nonnegative check ((width is null or width >= 0) and (height is null or height >= 0)),
  add constraint media_duration_nonnegative check (duration is null or duration >= 0);

create index media_type_created_idx on public.media_library (resource_type, format, created_at desc);
create index media_bytes_idx on public.media_library (bytes desc);

drop policy "media_admin_delete" on public.media_library;
create policy "media_editor_delete" on public.media_library
for delete to authenticated using (public.can_edit_content());

commit;
