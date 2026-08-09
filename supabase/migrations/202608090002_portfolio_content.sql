begin;

alter table public.portfolio_projects
add column content jsonb not null default '{}'::jsonb;

commit;
