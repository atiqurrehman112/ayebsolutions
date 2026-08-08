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
- `src/features/home`: homepage sections and presentation. Sprint 4A provides the hero, Sprint 4B provides trust and social proof, Sprint 4C provides the services overview, Sprint 4D provides the portfolio and case-study preview, Sprint 4E provides the interactive AI automation showcase, and Sprint 4F provides the development process, engineering approach, and quality-practices presentation. Each composition is exposed through the feature's public barrel; client state is isolated to established interaction primitives such as the workflow explorer and accessible disclosure system.
- `src/components/ui`: shadcn/ui primitives.
- `src/components/cards`: compositional and domain-neutral card patterns.
- `src/components/layout`: reusable application shells and structural components.
- `src/components/navigation`: responsive navigation building blocks.
- `src/components/shell`: global header, footer, search, consent, announcements, breadcrumbs, transitions, and system states.
- `src/components/brand`: reusable identity marks.
- `src/components/seo`: safe structured-data rendering.
- `src/components/motion`: reduced-motion-aware animation primitives.
- `src/components/providers`: minimal client-side provider composition.
- `src/lib`: framework-agnostic helpers and infrastructure adapters.
- `src/actions`: shared server-action exports. Feature-specific actions stay with their feature.
- `src/hooks`: reusable client hooks. Feature-specific hooks stay with their feature.
- `src/config`: immutable application configuration.
- `src/types`: genuinely shared TypeScript contracts.
- `src/config/design-tokens.ts`: runtime-safe token values shared with animation code.
- `prisma`: database schema and migrations.
- `public`: static assets organized by asset type.

## Adding a feature

Create a folder under `src/features/<feature-name>` and colocate its components, actions, validation schemas, types, and tests. Expose only its intended public API from an `index.ts` file.

## Design system boundaries

The component library is exported through `src/components/index.ts` and narrower category barrels. UI primitives must remain domain-neutral, cards compose primitives, templates compose layout primitives, and features consume these layers. Lower layers never import feature code. See `docs/DESIGN_SYSTEM.md` for the public API and usage rules.

## Global shell boundaries

The root layout composes the shell but does not own navigation or company content. Immutable configuration in `src/config` is the single source for company identity, header navigation, footer groups, announcements, consent copy, and SEO defaults. Shell components may compose design-system primitives, but design-system primitives must not import shell components. See `docs/GLOBAL_SHELL.md` for the integration contract.
