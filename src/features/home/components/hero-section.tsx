import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Check,
  Code2,
  Database,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Container } from "@/components/layout/primitives";
import { Fade, Stagger, StaggerItem } from "@/components/motion/motion";
import { Button } from "@/components/ui/button";
import styles from "./hero-background.module.css";

interface HeroContent {
  readonly badge: string;
  readonly heading: string;
  readonly subheading: string;
  readonly primaryCta: { readonly label: string; readonly href: string };
  readonly secondaryCta: { readonly label: string; readonly href: string };
  readonly trustIndicators: readonly string[];
}

export function HeroSection({ content }: { readonly content: HeroContent }) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[calc(100svh-var(--header-height))] items-center overflow-hidden border-b py-16 sm:py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 ${styles.background}`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 ${styles.grid}`}
      />
      <div
        aria-hidden="true"
        className={`${styles.glowPrimary} absolute -left-24 top-20 -z-10 size-72 rounded-full bg-primary/15`}
      />
      <div
        aria-hidden="true"
        className={`${styles.glowSecondary} absolute -right-20 bottom-12 -z-10 size-80 rounded-full bg-blue-500/10`}
      />
      <Container className="relative z-10 max-w-[100rem]">
        <div className="grid items-center gap-14 lg:grid-cols-[1.06fr_.94fr] lg:gap-20">
          <Stagger className="min-w-0 text-center lg:text-left">
            <StaggerItem>
              <p className="mx-auto inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[.12em] text-muted-foreground backdrop-blur lg:mx-0">
                <Sparkles className="size-3.5" aria-hidden="true" />
                {content.badge}
              </p>
            </StaggerItem>
            <StaggerItem>
              <h1
                id="hero-heading"
                className="mt-6 text-balance text-[clamp(3rem,11vw,6rem)] font-bold leading-[.9] tracking-[-.065em] lg:text-[clamp(4.5rem,6.4vw,6.65rem)]"
              >
                {content.heading}
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-8 text-muted-foreground lg:mx-0">
                {content.subheading}
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="group min-h-12 shadow-elevated"
                >
                  <Link href={content.primaryCta.href}>
                    {content.primaryCta.label}
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="min-h-12 bg-background/60 backdrop-blur"
                >
                  <Link href={content.secondaryCta.href}>
                    {content.secondaryCta.label}
                  </Link>
                </Button>
              </div>
            </StaggerItem>
            <StaggerItem>
              <ul
                aria-label="Trust indicators"
                className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 lg:justify-start"
              >
                {content.trustIndicators.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="size-4 text-success" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          </Stagger>
          <Fade className="relative">
            <div
              className={`${styles.visual} ${styles.shine} relative overflow-hidden rounded-[1.75rem] border bg-card/75 p-3 shadow-elevated backdrop-blur-xl sm:p-5`}
              aria-label="Code-rendered digital product and automation workflow illustration"
              role="img"
            >
              <div className="flex items-center justify-between border-b px-2 pb-4">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="size-2.5 rounded-full bg-foreground/20" />
                  <span className="bg-foreground/12 size-2.5 rounded-full" />
                  <span className="bg-foreground/8 size-2.5 rounded-full" />
                </div>
                <span className="font-mono text-[.6rem] uppercase tracking-[.18em] text-muted-foreground">
                  Intelligent workflow
                </span>
              </div>
              <div className="grid gap-3 py-5 sm:grid-cols-[.82fr_1.18fr]">
                <div className="space-y-3 rounded-2xl border bg-background/75 p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
                      <Code2 className="size-4" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="block text-xs font-semibold">
                        Digital product
                      </span>
                      <span className="text-[.65rem] text-muted-foreground">
                        Accessible by design
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2" aria-hidden="true">
                    <span className="block h-2 w-full rounded-full bg-muted" />
                    <span className="block h-2 w-4/5 rounded-full bg-muted" />
                    <span className="block h-20 rounded-xl bg-primary/[.06]" />
                  </div>
                </div>
                <div className="rounded-2xl border bg-background/75 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold">
                      Automation map
                    </span>
                    <span className="flex items-center gap-1.5 text-[.65rem] text-muted-foreground">
                      <span
                        className={`${styles.statusPulse} size-1.5 rounded-full bg-success`}
                      />
                      Reviewable
                    </span>
                  </div>
                  <div className="mt-5 grid grid-cols-[auto_1fr_auto_1fr_auto] items-center gap-2">
                    <WorkflowNode icon={Workflow} label="Input" />
                    <span className={styles.flowLine} aria-hidden="true" />
                    <WorkflowNode icon={Bot} label="AI" />
                    <span className={styles.flowLine} aria-hidden="true" />
                    <WorkflowNode icon={Database} label="System" />
                  </div>
                  <div
                    className="mt-5 grid grid-cols-3 gap-2"
                    aria-hidden="true"
                  >
                    {["Mapped", "Checked", "Ready"].map((label) => (
                      <span
                        key={label}
                        className="rounded-lg border bg-card px-2 py-2 text-center font-mono text-[.55rem] uppercase tracking-wider text-muted-foreground"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 border-t pt-4 text-center">
                {[
                  ["Plan", "Clear scope"],
                  ["Build", "Typed systems"],
                  ["Improve", "Measured review"],
                ].map(([label, detail]) => (
                  <div key={label}>
                    <span className="block text-xs font-semibold">{label}</span>
                    <span className="text-[.6rem] text-muted-foreground">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Fade>
        </div>
      </Container>
    </section>
  );
}

function WorkflowNode({
  icon: Icon,
  label,
}: {
  readonly icon: typeof Workflow;
  readonly label: string;
}) {
  return (
    <span className="flex flex-col items-center gap-2 text-[.6rem] font-medium text-muted-foreground">
      <span className="grid size-9 place-items-center rounded-xl border bg-card text-foreground shadow-xs">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      {label}
    </span>
  );
}
