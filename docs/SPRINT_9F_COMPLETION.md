# Sprint 9F Completion Report

## Scope

Sprint 9F replaces the inert public contact preview with production lead capture backed by Supabase, the existing CRM repository, Server Actions, and Resend. The public visual composition and SEO remain intact. Sprint 10A was not started.

## Folder tree

```text
src/features/contact/components/
|-- contact-form.tsx
|-- contact-page.tsx
`-- contact-page.module.css
src/lib/actions/contact.ts
src/lib/database/
|-- client.ts
`-- repositories/contact-leads-repository.ts
src/lib/email/leads.ts
src/lib/validation/contact.ts
src/types/database.ts
supabase/migrations/202608100010_production_contact_form.sql
docs/
|-- architecture.md
|-- CHECKLIST.md
`-- SPRINT_9F_COMPLETION.md
```

## Architecture and data flow

The existing page remains a Server Component except for the form interaction boundary. Its action validates and normalizes FormData with one Zod schema, verifies the request origin, hashes rather than stores the client IP, and calls `ContactLeadsRepository`. Components never access Supabase directly.

The forward-only migration adds `contact_leads.phone`, a private submission-attempt ledger, indexes for rate and duplicate lookups, and a service-role-only PostgreSQL function. The function uses an advisory transaction lock per IP fingerprint, applies five submissions per fifteen minutes, rejects matching payloads for thirty minutes, creates a New lead with medium CRM priority, writes the initial status-history event, and records the attempt atomically. Old attempt rows are pruned without retaining raw network identifiers.

## Form and CRM integration

The live form captures name, optional company, email, optional phone, service, optional budget, optional timeline, message, optional service interests, and explicit consent. Inputs have bounded lengths, normalized email, phone-format validation, a hidden honeypot, server-side duplicate detection, and accessible inline errors. Successful submission resets the form and moves focus to a live confirmation region. Leads are saved with website source, current timestamps, initial CRM state, and audit history.

## Email workflow

Once the database transaction succeeds, Resend independently attempts a customer acknowledgement and an internal lead notification. The internal message sets reply-to to the customer's validated email. Successful sends are appended to CRM email history. Provider or history-write failures are contained: the lead remains saved, and the user receives an honest message that no resubmission is necessary.

## Accessibility and responsive review

The route retains exactly one H1 and its established semantic landmarks. Every field has a visible label and description; required state, invalid state, field errors, consent, pending state, and submission feedback are announced. Focus moves to the success/error region, controls preserve visible focus, and touch targets remain at least 44px. The form stacks at 320px, uses two-column groups when space permits, keeps the established bounded 4K container, supports dark/light tokens, and removes decorative transitions under reduced motion.

## UI/UX self-review

The first integration draft risked accepting optional service-interest choices without persistence and could have coupled email success to lead creation. The final implementation persists those choices, establishes a clear required-field hierarchy, replaces obsolete preview language throughout the page and FAQ, and separates durable capture from best-effort delivery. The result preserves the original editorial layout while making status, privacy expectations, and retry guidance explicit.

## SEO and performance

The existing title, canonical `/contact`, OpenGraph, Twitter, ContactPage, WebPage, BreadcrumbList, and FAQPage behavior is unchanged. The page retains static generation; only the form hydrates. Database and email packages remain server-side, there is no browser database client, and submission state adds no global provider or duplicate query.

## Verification

- `npm run lint`: passed with zero warnings.
- `npm run typecheck`: passed.
- `npm run build`: passed; `/contact` generated successfully.
- Production output audit: one H1, one semantic form, and canonical `/contact` present.
- `git diff --check`: passed.
- Source audit: zero TODO, FIXME, `console.log`, explicit `any`, broken imports, or unused Sprint 9F code.
- Live write/email verification requires applying the migration and valid Supabase/Resend environment credentials; no provider result is fabricated.

Sprint 9F is complete. Sprint 10A was not started.
