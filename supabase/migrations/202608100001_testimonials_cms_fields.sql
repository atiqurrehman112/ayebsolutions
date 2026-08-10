begin;

create type public.testimonial_approval_status as enum ('pending', 'approved', 'rejected');

alter table public.testimonials
  add column approval_status public.testimonial_approval_status not null default 'pending',
  add column display_order integer not null default 0,
  add column published_at timestamptz,
  add column approved_at timestamptz,
  add column approved_by uuid references public.profiles (id) on delete set null,
  add column meta_title text,
  add column meta_description text,
  add constraint testimonials_display_order_nonnegative check (display_order >= 0),
  add constraint testimonials_publish_requirements check (
    status <> 'published' or
    (approval_status = 'approved' and consent_verified and published_at is not null)
  );

create index testimonials_moderation_idx
on public.testimonials (approval_status, status, display_order);

commit;
