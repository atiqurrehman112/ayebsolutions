# Sprint 13A — Team CMS Completion

## Summary

Sprint 13A adds a production-oriented Team CMS to the protected Ayeb Solutions admin workspace. The module follows the existing Supabase repository, Zod validation, role permission, Server Action, server-rendered list, and narrow client-interaction architecture used by Portfolio, Blog, and Testimonials. No public Team page was created and Sprint 13B was not started.

## Persistence

- Added the forward-only `team_members` migration.
- Profiles include identity, unique slug, Media Library portrait reference, role, department, short/full bios, skill array, optional experience, contact and profile links, featured state, display order, draft/published status, audit identities, and timestamps.
- Constraints bound text, URLs, experience, ordering, and lifecycle values.
- Indexes support lifecycle/order, department, and portrait joins.
- The shared timestamp trigger maintains `updated_at`.
- RLS allows authenticated admin readers, editor/admin writes, admin-only deletion, and published-only anonymous reads for the future public boundary.

## Architecture

- `TeamRepository` owns CRUD, ILIKE search, status/department/featured filters, deterministic sorting, 25/50/100 pagination, department discovery, lifecycle changes, and ordering.
- `src/lib/actions/team.ts` is the only mutation boundary and applies authentication, role permissions, Zod validation, audit identities, and Team-route revalidation.
- Components never import Supabase or perform direct database writes.
- Generated-style row, insert, update, and table contracts keep the database client strict.
- The public site, public navigation, sitemap, and public repositories remain unchanged.

## Admin Experience

- Added `/admin/team` with noindex/nofollow metadata.
- Added an editorial management header, truthful count/page/access summary, semantic filter form, responsive table, empty state, loading state, and retry boundary.
- Create and edit dialogs cover every requested profile field.
- Profile image selection is restricted to published Media Library image records.
- Admins may permanently delete; editors and admins may create, edit, publish, draft, feature, and reorder; viewers remain read-only.
- Drag-and-drop ordering is paired with labeled move-up/move-down buttons for equivalent keyboard operation.
- Team appears in both the admin sidebar and dashboard.

## Files Created

- `supabase/migrations/202608120001_team_cms.sql`
- `src/app/admin/team/page.tsx`
- `src/app/admin/team/loading.tsx`
- `src/app/admin/team/error.tsx`
- `src/lib/database/repositories/team-repository.ts`
- `src/lib/actions/team.ts`
- `src/lib/validation/team.ts`
- `src/features/admin/components/admin-team.tsx`
- `src/features/admin/components/admin-team.module.css`
- `src/features/admin/components/team-member-dialog.tsx`
- `src/features/admin/components/team-row-actions.tsx`
- `src/features/admin/components/team-order-manager.tsx`
- `docs/SPRINT_13A_COMPLETION.md`

## Files Updated

- `src/types/database.ts`
- `src/lib/database/repositories/index.ts`
- `src/features/admin/index.ts`
- `src/features/admin/components/admin-layout.tsx`
- `src/features/admin/components/admin-dashboard.tsx`
- `docs/architecture.md`
- `docs/CHECKLIST.md`

## Accessibility Review

- Exactly one H1 is rendered on success and error states.
- The list is a semantic table with a caption and row/column scopes.
- Search and filter controls have visible labels and native keyboard behavior.
- Dialog focus management and dismissal use the existing Radix boundary.
- Validation connects field errors through `aria-invalid` and `aria-describedby`.
- Mutation outcomes use polite live regions.
- Destructive actions require confirmation.
- Ordering supports both pointer drag-and-drop and explicit keyboard-operable move buttons.
- Interactive controls retain visible focus and established minimum target sizing.

## Responsive and UI Review

- The module follows the established monochrome admin surface, card, type, radius, shadow, and control language.
- The header, summary, filters, form grids, and panels collapse progressively to one column.
- The semantic table scrolls horizontally on narrow viewports rather than crushing content.
- Dialog content is viewport-bounded and scrollable.
- Ordering controls wrap safely and retain readable labels.
- Reduced motion uses the existing global policy; no essential behavior depends on animation.

## Verification

- `npm run lint` — passed with zero warnings.
- `npm run typecheck` — passed.
- `npm run build` — passed.
- `git diff --check` — passed.
- Source audit — zero TODO, FIXME, `console.log`, or explicit `any`.
- Route audit — `/admin/team` is protected by the existing `/admin/:path*` middleware matcher and absent from public sitemaps.
- Live CRUD verification requires applying the migration to the configured Supabase project; no unapplied database or provider result is claimed.

Sprint 13A is complete. Sprint 13B was not started.
