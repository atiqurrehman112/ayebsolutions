# Sprint 14A Completion — Contact Leads CRM

## Summary

Sprint 14A upgrades the existing production Contact Leads system rather than duplicating it. The public `/contact` form, validation, abuse protection, transactional Supabase submission, customer acknowledgement, admin notification, and Resend history remain the single intake path. The protected CRM now supports the requested pipeline, read/unread and important state, searchable and filterable records, full lead context, assignment, internal notes, replies, archive/restore, permanent deletion, and bulk actions.

## Files changed

- Added `supabase/migrations/202608160003_contact_leads_crm_14a.sql`.
- Updated Contact Lead database types and Zod lifecycle validation.
- Extended `ContactLeadsRepository` with request context, service/budget filtering, filter options, batched reads, batched updates/deletes, and batched history writes.
- Extended Contact Lead Server Actions with important state, bulk operations, new lifecycle timestamps, and reply-state synchronization.
- Updated the existing public Contact Server Action to attach bounded request context after durable submission without duplicating either email.
- Updated the admin route, table, details dialog, row actions, filters, bulk toolbar, and responsive styles.
- Updated `docs/architecture.md` and `docs/CHECKLIST.md`.

## Architecture and data integrity

The lifecycle enum is renamed in place: `contacted` → `read`, `qualified` → `in_progress`, and `proposal_sent` → `replied`. PostgreSQL preserves every existing row and status-history value. Important, read, replied, country, referrer, user-agent, and IP-fingerprint columns are additive. Existing submission-attempt fingerprints are backfilled where available. New indexes cover important ordering, service/budget discovery, and read-state queries.

React components never access Supabase. Reads follow Admin Route → Repository → Supabase. Mutations follow Client/native form → Server Action → Zod/auth authorization → Repository → Supabase → cache revalidation. Status and email histories remain append-only and are fetched in two bounded queries for the visible page, avoiding per-row reads.

## Permissions and privacy

- Admin: all lead operations, internal notes, and permanent deletion.
- Editor: pipeline, assignment, priority, important state, archive/restore, bulk lifecycle operations, and replies.
- Viewer: read-only CRM access.
- Internal notes are omitted from the server projection sent to non-admin UI and the notes action independently requires Admin.
- The system stores only an HMAC IP fingerprint already used for abuse protection, never the raw visitor IP.

## Accessibility and responsive review

The CRM retains one H1, semantic table/caption, explicit filter labels, native selection checkboxes, descriptive icon-button labels, focus-managed dialogs, visible focus rings, live mutation announcements, and native field controls. The table scrolls horizontally on narrow screens, filters collapse from desktop grid to two and one columns, detail definitions collapse on mobile, and all styling uses theme tokens. Reduced-motion rules neutralize transitions.

## Email and submission review

There is still one public form and one Server Action. A submission is durably stored before email delivery. Exactly one acknowledgement and one internal notification are attempted; provider failure cannot roll back the lead. CRM replies reuse the existing Resend adapter, append email history, and move the lead to Replied with a status-history event.

## Verification

- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run build`: passed; `/contact` remains static with the established form boundary and `/admin/contact-leads` remains protected and server-rendered.
- Supabase dry-run: only `202608160003_contact_leads_crm_14a.sql` pending.
- Supabase migration push: passed; local and remote `202608160003` histories match.
- Remote REST schema projection: HTTP 200 for all new Contact Lead columns and email history.
- The connected production database contained zero lead and zero email-history records during verification. No fabricated record or unsolicited email was created; live delivery remains dependent on the first real validated inquiry and configured Resend credentials.
- Final `git diff --check`, forbidden-pattern audit, post-format typecheck, commit, and push are recorded in the final handoff.

## Scope confirmation

No Contact redesign, second form, authentication change, middleware change, unrelated CMS work, or Sprint 14B work was introduced.
