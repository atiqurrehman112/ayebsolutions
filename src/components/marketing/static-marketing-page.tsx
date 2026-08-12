import { ArrowRight, Check, Sparkles, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { StructuredData } from "@/components/seo/structured-data";
import { SiteBreadcrumbs } from "@/components/shell/breadcrumbs";
import { Button } from "@/components/ui/button";
import { company } from "@/config/company";

export interface MarketingCard {
  readonly description: string;
  readonly icon: LucideIcon;
  readonly points: readonly string[];
  readonly title: string;
}

export function StaticMarketingPage({
  cards,
  description,
  eyebrow,
  title,
}: {
  readonly cards: readonly MarketingCard[];
  readonly description: string;
  readonly eyebrow: string;
  readonly title: string;
}) {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b py-20 sm:py-28 lg:py-32">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_70%_0%,hsl(var(--foreground)/0.08),transparent_60%)]"
          aria-hidden="true"
        />
        <Container className="max-w-[100rem]">
          <SiteBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: title, href: `/${eyebrow.toLowerCase()}` },
            ]}
          />
          <div className="mt-14 max-w-5xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="editorial-heading mt-5 text-[clamp(3rem,8vw,7rem)] leading-[.92] tracking-[-.055em]">
              {title}
            </h1>
            <p className="body-copy mt-7 max-w-3xl">{description}</p>
          </div>
        </Container>
      </section>
      <section
        className="border-b py-16 sm:py-24"
        aria-labelledby="approach-heading"
      >
        <Container className="max-w-[100rem]">
          <Eyebrow>Our approach</Eyebrow>
          <h2
            id="approach-heading"
            className="mt-4 text-balance text-headline font-bold"
          >
            Practical systems for meaningful work.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {cards.map(
              ({ description: copy, icon: Icon, points, title: cardTitle }) => (
                <article
                  key={cardTitle}
                  className="interactive-surface flex h-full flex-col rounded-3xl border bg-card p-6 shadow-xs sm:p-8"
                >
                  <span className="grid size-12 place-items-center rounded-xl border bg-muted/30">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-2xl font-bold tracking-[-0.025em]">
                    {cardTitle}
                  </h3>
                  <p className="mt-4 leading-7 text-muted-foreground">{copy}</p>
                  <ul className="mt-6 space-y-2">
                    {points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2 text-sm text-muted-foreground"
                      >
                        <Check
                          className="mt-0.5 size-4 shrink-0"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              ),
            )}
          </div>
        </Container>
      </section>
      <section className="border-b bg-primary py-20 text-primary-foreground sm:py-24">
        <Container className="max-w-[100rem]">
          <Sparkles
            className="size-8 text-primary-foreground/60"
            aria-hidden="true"
          />
          <h2 className="mt-5 max-w-4xl text-balance text-4xl font-bold tracking-tight sm:text-6xl">
            Let’s shape the right solution together.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/70">
            Start with the business context, users, workflow, and constraints.
            We’ll help identify a sensible technical direction.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8">
            <Link href="/contact">
              Start a conversation
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </Container>
      </section>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url: `${company.url}/${eyebrow.toLowerCase()}`,
        }}
      />
    </>
  );
}
