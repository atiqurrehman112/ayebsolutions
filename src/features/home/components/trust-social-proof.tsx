import {
  ArrowRight,
  Check,
  CircleDot,
  Code2,
  Compass,
  Gem,
  Handshake,
  Layers3,
  MessageSquareText,
  Rocket,
  Search,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/cards/card";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { Fade, Stagger, StaggerItem } from "@/components/motion/motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import styles from "./trust-social-proof.module.css";

interface ValueItem {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

interface ComparisonItem {
  readonly area: string;
  readonly conventional: string;
  readonly ayeb: string;
}

interface ProcessItem {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

const technologies = [
  { name: "Next.js", mark: "N" },
  { name: "React", mark: "R" },
  { name: "TypeScript", mark: "TS" },
  { name: "Node.js", mark: "JS" },
  { name: "PostgreSQL", mark: "PG" },
  { name: "Docker", mark: "D" },
  { name: "OpenAI", mark: "AI" },
  { name: "Cloudinary", mark: "CL" },
  { name: "Vercel", mark: "V" },
  { name: "GitHub", mark: "GH" },
  { name: "Tailwind CSS", mark: "TW" },
  { name: "Prisma", mark: "P" },
  { name: "Framer Motion", mark: "FM" },
] as const;

const coreValues: readonly ValueItem[] = [
  {
    title: "Quality First",
    description:
      "Thoughtful details, rigorous standards, and purposeful decisions at every layer.",
    icon: Gem,
  },
  {
    title: "Scalable Architecture",
    description:
      "Foundations designed to evolve as your operations, audience, and ambitions grow.",
    icon: Layers3,
  },
  {
    title: "Transparent Communication",
    description:
      "Clear priorities, visible progress, and candid conversations throughout delivery.",
    icon: MessageSquareText,
  },
  {
    title: "Long-Term Partnership",
    description:
      "Reliable guidance and support that extend beyond the initial launch.",
    icon: Handshake,
  },
] as const;

const comparisons: readonly ComparisonItem[] = [
  {
    area: "Development quality",
    conventional: "Quality can vary between handoffs and project teams.",
    ayeb: "Shared engineering standards guide every implementation decision.",
  },
  {
    area: "Performance",
    conventional: "Often reviewed near the end of delivery.",
    ayeb: "Considered from architecture through production verification.",
  },
  {
    area: "Automation",
    conventional: "Usually treated as a separate engagement.",
    ayeb: "Evaluated as part of the wider business and product workflow.",
  },
  {
    area: "Maintainability",
    conventional: "Short-term delivery can outweigh future ownership.",
    ayeb: "Clear structure and reusable systems support long-term evolution.",
  },
  {
    area: "Support",
    conventional: "May conclude when the original scope ships.",
    ayeb: "Continuity and post-launch guidance are planned from the outset.",
  },
  {
    area: "Transparency",
    conventional: "Progress may be summarized at fixed milestones.",
    ayeb: "Priorities, tradeoffs, and progress stay visible throughout.",
  },
] as const;

const process: readonly ProcessItem[] = [
  {
    title: "Discover",
    description: "Align on the problem, audience, goals, and constraints.",
    icon: Search,
  },
  {
    title: "Design",
    description: "Shape the experience, system, and technical direction.",
    icon: Compass,
  },
  {
    title: "Develop",
    description: "Build, integrate, test, and refine with visible progress.",
    icon: Code2,
  },
  {
    title: "Launch",
    description: "Verify production quality and support what comes next.",
    icon: Rocket,
  },
] as const;

function SectionIntroduction({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly align?: "left" | "center";
}) {
  return (
    <div
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}
    >
      <Eyebrow className="mb-3 text-xs">{eyebrow}</Eyebrow>
      <h3 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
        {title}
      </h3>
      <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
        {description}
      </p>
    </div>
  );
}

function TechnologyStack() {
  return (
    <div aria-labelledby="technology-heading">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Eyebrow className="mb-2 text-xs">Trusted technologies</Eyebrow>
          <h3
            id="technology-heading"
            className="text-xl font-semibold tracking-tight sm:text-2xl"
          >
            Proven tools, chosen with purpose.
          </h3>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-right">
          Technologies we build with—not partner badges, endorsements, or
          certifications.
        </p>
      </div>
      <div
        className={cn(
          "mt-7 overflow-hidden rounded-2xl border bg-card/55 p-3 shadow-xs sm:p-4",
          styles.technologyRail,
          styles.technologyGlow,
        )}
      >
        <ul
          aria-label="Technologies we build with"
          className="flex flex-wrap justify-center gap-2.5"
        >
          {technologies.map((technology) => (
            <li
              key={technology.name}
              className={cn(
                "group flex min-h-11 items-center gap-2.5 rounded-xl border bg-background/75 px-3.5 py-2 text-sm font-medium shadow-xs transition duration-normal hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-soft",
                styles.interactiveLift,
              )}
            >
              <span
                aria-hidden="true"
                className="grid size-6 shrink-0 place-items-center rounded-md bg-primary font-mono text-[0.58rem] font-bold text-primary-foreground"
              >
                {technology.mark}
              </span>
              {technology.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ValuesGrid() {
  return (
    <div>
      <SectionIntroduction
        eyebrow="Core business values"
        title="Principles that shape the work."
        description="Premium delivery is not a visual layer. It comes from the decisions, communication, and care behind the product."
      />
      <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {coreValues.map(({ title, description, icon: Icon }, index) => (
          <StaggerItem key={title} className="h-full">
            <Card
              className={cn(
                "group relative h-full overflow-hidden bg-card/70 p-6 transition duration-normal hover:-translate-y-1 hover:border-foreground/20 hover:shadow-elevated",
                styles.interactiveLift,
              )}
            >
              <span className="absolute right-5 top-4 font-mono text-4xl font-semibold text-foreground/[0.045] transition-colors group-hover:text-foreground/[0.08]">
                0{index + 1}
              </span>
              <span
                className={cn(
                  "grid size-11 place-items-center rounded-xl border bg-background text-foreground shadow-xs transition duration-normal group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground",
                  styles.interactiveScale,
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h4 className="mt-8 text-lg font-semibold tracking-tight">
                {title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

function Comparison() {
  return (
    <div>
      <SectionIntroduction
        eyebrow="Why choose our team"
        title="A delivery model built for clarity."
        description="Every provider works differently. This is how our approach addresses common delivery risks without relying on vague promises."
      />
      <Fade className="mt-8 overflow-hidden rounded-2xl border bg-card/60 shadow-soft">
        <div className="hidden grid-cols-[minmax(10rem,0.7fr)_1fr_1fr] border-b bg-muted/35 px-6 py-4 text-sm font-semibold md:grid lg:px-8">
          <span>Area</span>
          <span className="text-muted-foreground">
            Conventional project risk
          </span>
          <span className="flex items-center gap-2">
            <Sparkles className="size-4" aria-hidden="true" /> Our approach
            approach
          </span>
        </div>
        <dl>
          {comparisons.map((item) => (
            <div
              key={item.area}
              className="grid gap-4 border-b px-5 py-6 last:border-0 md:grid-cols-[minmax(10rem,0.7fr)_1fr_1fr] md:items-start md:gap-6 lg:px-8"
            >
              <dt className="font-semibold">{item.area}</dt>
              <dd className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <CircleDot
                  className="mt-0.5 size-4 shrink-0 opacity-60"
                  aria-hidden="true"
                />
                <span>
                  <span className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-wider text-muted-foreground md:hidden">
                    Conventional risk
                  </span>
                  {item.conventional}
                </span>
              </dd>
              <dd className="flex gap-3 text-sm leading-relaxed">
                <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-success text-success-foreground">
                  <Check className="size-2.5" aria-hidden="true" />
                </span>
                <span>
                  <span className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-wider text-foreground md:hidden">
                    Our approach
                  </span>
                  {item.ayeb}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Fade>
    </div>
  );
}

function ProcessPreview() {
  return (
    <div>
      <SectionIntroduction
        eyebrow="Process preview"
        title="Momentum without mystery."
        description="A focused path from initial context to a confident launch, with collaboration built into every stage."
        align="center"
      />
      <ol
        aria-label="Our four-step delivery process"
        className="mt-10 grid gap-2 md:grid-cols-4 md:gap-0"
      >
        {process.map(({ title, description, icon: Icon }, index) => (
          <li
            key={title}
            className={cn(
              "relative flex gap-4 pb-7 last:pb-0 md:block md:px-5 md:pb-0 md:text-center",
              styles.connector,
            )}
          >
            <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border bg-background shadow-xs md:mx-auto">
              <Icon className="size-4" aria-hidden="true" />
            </span>
            <div className="pt-1 md:pt-0">
              <span className="mt-5 hidden font-mono text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground md:block">
                Step 0{index + 1}
              </span>
              <h4 className="text-lg font-semibold tracking-tight md:mt-2">
                {title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function DividerCta() {
  return (
    <Fade>
      <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-9 text-primary-foreground shadow-elevated sm:px-10 sm:py-10 lg:px-14">
        <div
          aria-hidden="true"
          className="absolute -right-12 -top-24 size-64 rounded-full border border-primary-foreground/10"
        />
        <div
          aria-hidden="true"
          className="absolute -right-4 -top-12 size-40 rounded-full border border-primary-foreground/10"
        />
        <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/65">
              Start a conversation
            </p>
            <h3 className="mt-2 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              Ready to Build Something Exceptional?
            </h3>
          </div>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="group h-12 shrink-0 self-start rounded-lg px-6 sm:self-auto"
          >
            <Link href="/contact">
              Let&apos;s Talk
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Button>
        </div>
      </div>
    </Fade>
  );
}

function TrustSocialProofSection() {
  return (
    <section
      aria-labelledby="trust-heading"
      className="relative overflow-hidden border-b bg-muted/[0.16] py-20 sm:py-24 lg:py-30"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
      />
      <Container className="max-w-[100rem]">
        <Fade>
          <div className="max-w-3xl">
            <Eyebrow className="mb-4 text-xs">How we build confidence</Eyebrow>
            <h2
              id="trust-heading"
              className="text-balance text-headline font-bold"
            >
              Built on sound decisions, not borrowed credibility.
            </h2>
            <p className="mt-5 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
              The strongest proof starts with an honest process: capable
              technology, durable principles, and a clear way of working.
            </p>
          </div>
        </Fade>

        <div className="mt-14 space-y-20 sm:mt-16 sm:space-y-24 lg:space-y-30">
          <TechnologyStack />
          <ValuesGrid />
          <Comparison />
          <ProcessPreview />
          <DividerCta />
        </div>
      </Container>
    </section>
  );
}

export { TrustSocialProofSection };
