# Architecture

## Principles

- Server Components are the default. A file uses `"use client"` only at an interaction boundary.
- Product code is grouped by feature rather than by technical layer alone.
- Shared primitives remain small, stable, and independent of product features.
- Environment access is centralized and validated with Zod.
- Imports use the `@/` alias for application code.

## Boundaries

- `src/app`: routing, layouts, metadata routes, and global styles.
- `src/features`: vertically sliced product capabilities. Features may depend on shared code but must not depend on each other implicitly.
- `src/components/ui`: shadcn/ui primitives.
- `src/components/layout`: reusable application shells and structural components.
- `src/components/providers`: minimal client-side provider composition.
- `src/lib`: framework-agnostic helpers and infrastructure adapters.
- `src/actions`: shared server-action exports. Feature-specific actions stay with their feature.
- `src/hooks`: reusable client hooks. Feature-specific hooks stay with their feature.
- `src/config`: immutable application configuration.
- `src/types`: genuinely shared TypeScript contracts.
- `prisma`: database schema and migrations.
- `public`: static assets organized by asset type.

## Adding a feature

Create a folder under `src/features/<feature-name>` and colocate its components, actions, validation schemas, types, and tests. Expose only its intended public API from an `index.ts` file.
