begin;

alter table public.testimonials
  add column industry text,
  add column avatar_media_id uuid references public.media_library (id) on delete set null,
  add column company_logo_media_id uuid references public.media_library (id) on delete set null;

create index testimonials_public_listing_idx on public.testimonials (status, approval_status, consent_verified, is_featured desc, display_order, id);
create index testimonials_industry_idx on public.testimonials (industry) where industry is not null;
create index testimonials_avatar_media_idx on public.testimonials (avatar_media_id) where avatar_media_id is not null;
create index testimonials_company_logo_media_idx on public.testimonials (company_logo_media_id) where company_logo_media_id is not null;

commit;
