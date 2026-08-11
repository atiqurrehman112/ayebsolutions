import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
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
      className="relative isolate flex min-h-[calc(100svh-var(--header-height))] items-center overflow-hidden border-b py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 ${styles.background}`}
      />
      <Container className="relative z-10 max-w-[100rem]">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_.98fr]">
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
                className="mt-6 text-balance text-[clamp(2.7rem,11vw,5.75rem)] font-bold leading-[.94] tracking-[-.055em] lg:text-[clamp(4.25rem,6.2vw,6rem)]"
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
                <Button asChild size="lg">
                  <Link href={content.primaryCta.href}>
                    {content.primaryCta.label}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
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
          <Fade>
            <div className="grid min-h-72 place-items-center rounded-2xl border bg-card/60">
              <Sparkles
                className="size-12 text-muted-foreground"
                aria-hidden="true"
              />
              <span className="sr-only">Abstract automation illustration</span>
            </div>
          </Fade>
        </div>
      </Container>
    </section>
  );
}
