# Sprint 14B Completion — CRM Email Center

## Summary

Sprint 14B transforms the existing Contact Leads CRM into an administrator-only communication center without duplicating the contact form, repository, or Resend integration. Administrators can compose replies, apply safe rich-text emphasis, use lead variables, add CC/BCC recipients, save custom templates, schedule or complete follow-ups, and review communication records alongside lead status and notes. Existing lead-management permissions remain intact for editors and viewers.

## Files created

- `supabase/migrations/202608160004_crm_email_center.sql`
- `src/features/admin/components/lead-email-center.tsx`
- `src/lib/email/content.ts`
- `docs/SPRINT_14B_COMPLETION.md`

## Files updated

- `src/app/admin/contact-leads/page.tsx`
- `src/features/admin/components/admin-contact-leads.tsx`
- `src/features/admin/components/admin-contact-leads.module.css`
- `src/features/admin/components/lead-row-actions.tsx`
- `src/lib/actions/contact-leads.ts`
- `src/lib/database/repositories/contact-leads-repository.ts`
- `src/lib/email/leads.ts`
- `src/lib/validation/contact.ts`
- `src/types/database.ts`
- `docs/architecture.md`
- `docs/CHECKLIST.md`

## Architecture decisions

- Extended `ContactLeadsRepository`; presentation components still make no direct Supabase calls.
- Preserved the existing Resend adapter and added server-only HTML, CC, and BCC support.
- Added normalized `email_templates`, `lead_follow_ups`, and `lead_note_history` tables. Existing `lead_email_history` rows are preserved and backfilled with compatible defaults.
- Added direction and delivery fields so incoming messages can be recorded by a future inbound webhook without pretending inbound transport exists today.
- Kept communication actions administrator-only while retaining Sprint 14A editor and viewer permissions for lead management.
- Server Actions enforce Zod validation, same-origin requests, authenticated role checks, repository-only persistence, cache revalidation, and a ten-message-per-five-minute administrator throttle.
- Rich text accepts a constrained formatting model and is escaped before HTML generation; arbitrary administrator-supplied HTML is never forwarded to Resend.

## Features delivered

- Resend reply composer with subject, reply address, CC, BCC, formatting controls, and `{{name}}`, `{{company}}`, `{{service}}`, and `{{budget}}` variables.
- Seven idempotently seeded templates plus custom-template saving.
- Outgoing message logging with provider message ID, send time, status, delivery state, recipients, and generated HTML.
- Follow-up presets for tomorrow, three days, and one week, plus a custom date and completion workflow.
- Due-soon reminder panel and live counters for follow-ups, unread inbound records, pending replies, sent emails, open leads, and today’s won/lost leads.
- Search across lead identity, inquiry content, stored email conversations, and internal note history.
- Existing assigned-user, priority, pipeline, service, budget, date, sort, and pagination controls plus reply and follow-up filters.
- Timeline-ready storage for outgoing email, future incoming email, status changes, notes, and follow-ups.

## Accessibility and responsive review

- The route retains exactly one H1 and semantic labelled sections.
- Composer inputs have visible labels; the formatting toolbar has an accessible name and icon controls have explicit labels.
- Mutation results use a polite live region, dialogs preserve the existing focus-managed primitives, and all controls remain keyboard operable.
- Focus styles, dark-mode tokens, and reduced-motion behavior inherit the established admin design system.
- CC/BCC fields collapse from two columns to one on narrow screens; controls wrap cleanly and the existing table retains horizontal overflow handling from 320px upward.

## Security review

- Admin-only communication is enforced in both Server Actions and RLS.
- Server Actions reject cross-origin mutation requests when an Origin header is supplied.
- Email recipients must match the selected lead; CC/BCC values are bounded and validated as email addresses.
- Resend credentials never enter client bundles.
- Safe escaping prevents raw rich-text HTML injection.
- Stored notes, templates, follow-ups, and email records retain authenticated audit ownership.

## Performance review

- Lead data, options, templates, metrics, assignees, and reminders load concurrently on the server.
- Only the existing lead dialog and the new composer/follow-up controls hydrate.
- No client fetching, polling, or duplicate database client is introduced.
- Aggregates use count-only database queries and all new operational access paths are indexed.

## Verification report

- `npm run lint` — passed with zero warnings.
- `npm run typecheck` — passed.
- `npm run build` — passed; `/admin/contact-leads` remains a protected dynamic route.
- `npx supabase db push --dry-run` — identified only the Sprint 14B migration.
- `npx supabase db push` — migration applied successfully to the linked Supabase project.
- `git diff --check` — passed.
- Source audit — zero TODO, FIXME, `console.log`, or explicit `any` introduced.

Attachments were intentionally left out because the requirement marks them optional and the sprint does not define a safe attachment-selection contract. Existing Media Library and upload behavior were not modified. Incoming email rendering is future-ready at the data and timeline level; receiving mail still requires a provider webhook in a later authorized sprint.

Sprint 14B is complete. No later sprint was started.
