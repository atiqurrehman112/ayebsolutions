# Ayeb Solutions

Production foundation for the Ayeb Solutions agency website, built with Next.js 15, React 19, TypeScript, Tailwind CSS, and the App Router.

Sprint 1 establishes architecture and tooling only. Product pages and features are intentionally out of scope.

## Requirements

- Node.js 20.9 or newer
- npm 10 or newer
- PostgreSQL 15 or newer for database-backed features

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`. Until a page is introduced in a later sprint, the application intentionally returns Next.js's not-found response at `/`.

## Commands

| Command                | Purpose                                  |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the Turbopack development server   |
| `npm run build`        | Create a production build                |
| `npm run start`        | Serve the production build               |
| `npm run lint`         | Run ESLint with zero warnings allowed    |
| `npm run typecheck`    | Run strict TypeScript checks             |
| `npm run format`       | Format supported files with Prettier     |
| `npm run format:check` | Verify formatting without changing files |

## Environment

Copy `.env.example` to `.env.local`. The public site URL has a local default. Integration secrets are optional until their corresponding feature is enabled and must never be committed.

## Architecture

See [docs/architecture.md](docs/architecture.md) for dependency boundaries and folder ownership.

## Git hooks

`npm install` runs Husky's prepare script. Staged TypeScript and JavaScript files are linted and formatted; supported content and configuration files are formatted before each commit.
