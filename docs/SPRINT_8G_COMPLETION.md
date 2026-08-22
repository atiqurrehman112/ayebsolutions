# Sprint 8G Completion Report

## Scope

Sprint 8G replaces the static `/admin/media` preview with a Cloudinary-backed, Supabase-indexed media management system. No unrelated public page was redesigned.

## Created and updated architecture

```text
src/app/admin/media/{page.tsx,loading.tsx,error.tsx}
src/features/admin/components/
├── admin-media.tsx
├── admin-media.module.css
├── media-upload-dialog.tsx
└── media-item-actions.tsx
src/lib/actions/media.ts
src/lib/cloudinary/media.ts
src/lib/database/repositories/media-repository.ts
src/lib/validation/media.ts
src/types/database.ts
supabase/migrations/202608100002_cloudinary_media_library.sql
```

Cloudinary owns binary storage and delivery. Supabase stores searchable asset metadata. Components never call either provider directly: Server Actions validate permissions and input, Cloudinary utilities perform secret-backed operations, and `MediaRepository` owns PostgreSQL access.

## Capabilities

- Real image, video, PDF, SVG, and document upload through Server Actions.
- Replace uses a new Cloudinary asset, switches database metadata, then cleans up the old asset; failed persistence cleans the new upload.
- Rename updates the Cloudinary public ID and database metadata, with rollback when database persistence fails.
- Delete removes Cloudinary delivery and the database record.
- Server-side search, type filters, newest/oldest/alphabetical/largest sorting, and 25/50/100 pagination.
- Copy URL and public ID controls, preview/metadata drawer, empty state, loading skeleton, and retry boundary.

## Security and validation

Cloudinary API credentials stay server-only. Uploads are restricted to an explicit MIME allowlist and 25 MB. Folder/public-ID input is constrained, metadata is validated with Zod, authentication is required, editors/admins manage assets, and viewers are read-only. The migration updates RLS so editor deletion matches the sprint permission contract.

## Accessibility and responsive review

The resolved page has one H1, labeled search and upload controls, keyboard-accessible focus-managed dialogs/drawer, descriptive icon labels, visible focus styles, destructive confirmation, and polite operation announcements. Cards adapt from one to four columns, filters stack on narrow screens, and pagination remains usable from 320px through 4K. Existing semantic tokens support dark/light themes and loading motion stops under reduced-motion preferences.

## UI/UX self-review

The established card-based media layout was retained, but placeholder counters and inactive panels were removed. Real filename, type, size, dimensions, folder, creation date, and public ID now define card hierarchy. High-frequency copy and preview actions stay available; destructive and replacement operations remain explicit and separated. Empty states distinguish an unused library from filtered results.

## SEO and performance

The authenticated route remains `noindex,nofollow` and absent from the sitemap. List/filter/sort/pagination work is server-side. Only upload and per-asset operation controls hydrate. Cloudinary delivery URLs remain external assets; credentials never enter client bundles. Mutations revalidate the admin library and application layout consumers.

## Verification

- `npm install`: passed.
- `npm run lint`: passed with zero warnings.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- `git diff --check`: passed.
- Source audit: zero TODO, FIXME, console statements, explicit `any`, or broken imports.
- Live provider testing requires applying the migration and configuring valid Cloudinary and Supabase credentials. No fabricated provider result is claimed.

Sprint 8G is complete. Sprint 8H was not started.
