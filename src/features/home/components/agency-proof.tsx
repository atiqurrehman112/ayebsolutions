import {
  Blocks,
  Bot,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Layers3,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { CSSProperties } from "react";
import { Container, Eyebrow } from "@/components/layout/primitives";
import styles from "./agency-proof.module.css";

interface Statistic {
  readonly value: string;
  readonly label: string;
}

interface ProcessStep {
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

const technologyIcons = {
  "Next.js": Layers3,
  React: Blocks,
  TypeScript: Code2,
  "Node.js": GitBranch,
  PostgreSQL: Database,
  Supabase: Database,
  OpenAI: Bot,
  Cloudinary: Cloud,
  Docker: Layers3,
  Vercel: Rocket,
  GitHub: GitBranch,
  "Tailwind CSS": Sparkles,
} as const;

export function TechnologyStrip({
  technologies,
}: {
  readonly technologies: readonly string[];
}) {
  return (
    <section
      className="border-b bg-muted/[.12]"
      aria-labelledby="toolkit-heading"
    >
      <Container className="max-w-[100rem] py-8 sm:py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="shrink-0 lg:w-48">
            <p
              id="toolkit-heading"
              className="text-xs font-semibold uppercase tracking-[.16em] text-muted-foreground"
            >
              Technologies we build with
            </p>
          </div>
          <ul className="grid flex-1 grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3 lg:grid-cols-6">
            {technologies.slice(0, 6).map((technology) => {
              const Icon =
                technologyIcons[technology as keyof typeof technologyIcons] ??
                Code2;
              return (
                <li
                  key={technology}
                  className="flex min-h-14 items-center justify-center gap-2 bg-background px-3 text-sm font-semibold"
                >
                  <Icon
                    className="size-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                  {technology}
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export function StatisticsSection({
  statistics,
}: {
  readonly statistics: readonly Statistic[];
}) {
  return (
    <section className="border-b" aria-labelledby="statistics-heading">
      <Container className="max-w-[100rem] py-14 sm:py-16">
        <h2 id="statistics-heading" className="sr-only">
          Ayeb Solutions delivery snapshot
        </h2>
        <dl className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((stat, index) => (
            <div
              key={stat.label}
              className={`${styles.stat} bg-card p-6 sm:p-8`}
              style={{ "--delay": `${index * 90}ms` } as CSSProperties}
            >
              <dd className="font-mono text-4xl font-semibold tracking-[-.06em] sm:text-5xl">
                {stat.value}
              </dd>
              <dt className="mt-3 text-sm leading-6 text-muted-foreground">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

export function ProcessTechnologySection({
  process,
  technologies,
}: {
  readonly process: readonly ProcessStep[];
  readonly technologies: readonly string[];
}) {
  return (
    <section
      className={`${styles.processSection} border-b py-20 sm:py-24 lg:py-30`}
      aria-labelledby="process-heading"
    >
      <Container className="max-w-[100rem]">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>How we work</Eyebrow>
            <h2
              id="process-heading"
              className="mt-4 text-balance text-headline font-bold"
            >
              A clear path from ambitious idea to dependable product.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
              Strategy, design, and engineering move together. Each stage
              creates a reviewable decision before the next layer is added.
            </p>
            <div className="mt-8 flex items-center gap-3 rounded-xl border bg-card/70 p-4">
              <ShieldCheck className="size-5 shrink-0" aria-hidden="true" />
              <p className="text-sm leading-6 text-muted-foreground">
                Accessibility, performance, security, and maintainability are
                reviewed throughout—not added at the end.
              </p>
            </div>
          </div>
          <ol className="relative space-y-4">
            {process.map((step, index) => {
              const Icon =
                [Search, Layers3, Code2, Rocket][index] ?? CheckCircle2;
              return (
                <li
                  key={step.number}
                  className={`${styles.processCard} group grid gap-5 rounded-2xl border bg-card p-6 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:p-8`}
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <span className="font-mono text-[.65rem] uppercase tracking-[.18em] text-muted-foreground">
                      Stage {step.number}
                    </span>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-3 leading-7 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                  <span
                    className="hidden font-mono text-5xl font-semibold text-foreground/[.05] sm:block"
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-20 border-t pt-14 sm:mt-24 sm:pt-16">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <Eyebrow>Technology stack</Eyebrow>
              <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
                Modern tools, selected for the work—not the trend cycle.
              </h2>
            </div>
            <p className="max-w-lg leading-7 text-muted-foreground">
              The final stack depends on product requirements, operational
              constraints, integrations, and long-term ownership.
            </p>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {technologies.map((technology, index) => {
              const Icon =
                technologyIcons[technology as keyof typeof technologyIcons] ??
                Code2;
              return (
                <li
                  key={technology}
                  className={`${styles.technologyCard} flex items-center gap-4 rounded-xl border bg-card px-5 py-4`}
                >
                  <span className="grid size-10 place-items-center rounded-lg bg-muted">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="font-semibold">{technology}</span>
                  <span className="ml-auto font-mono text-[.6rem] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
