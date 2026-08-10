import { ArrowRight, Check, ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/primitives";
import { Fade, Stagger, StaggerItem } from "@/components/motion/motion";
import { Button } from "@/components/ui/button";
import { AutomationVisual } from "@/features/home/components/automation-visual";
import { cn } from "@/lib/utils";
import styles from "./hero-background.module.css";

const trustIndicators = [
  "Fast Delivery",
  "AI Powered",
  "Secure Development",
  "Long-Term Support",
] as const;

function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        styles.background,
      )}
    >
      <div className={cn("absolute inset-0", styles.grid)} />
      <div
        className={cn(
          "absolute -left-32 top-8 size-72 rounded-full bg-primary/10 sm:size-[28rem]",
          styles.glowPrimary,
        )}
      />
      <div
        className={cn(
          "absolute -right-32 top-1/3 size-80 rounded-full bg-blue-500/10 sm:size-[32rem]",
          styles.glowSecondary,
        )}
      />
      <span
        className={cn(
          "absolute left-[8%] top-[22%] size-1.5 rounded-full bg-foreground/40",
          styles.particle,
        )}
      />
      <span
        className={cn(
          "absolute left-[42%] top-[12%] size-1 rounded-full bg-foreground/30",
          styles.particle,
        )}
      />
      <span
        className={cn(
          "absolute right-[12%] top-[18%] size-1.5 rounded-full bg-blue-500/50",
          styles.particle,
        )}
      />
      <span
        className={cn(
          "absolute bottom-[24%] left-[24%] size-1 rounded-full bg-foreground/30",
          styles.particle,
        )}
      />
      <span
        className={cn(
          "absolute bottom-[17%] right-[31%] size-1.5 rounded-full bg-violet-500/40",
          styles.particle,
        )}
      />
    </div>
  );
}

function HeroSection({
  brandName = "Ayeb Solutions",
}: {
  readonly brandName?: string;
}) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[calc(100svh-var(--header-height))] items-center overflow-hidden border-b py-16 sm:py-20 lg:py-24 2xl:py-28"
    >
      <HeroBackground />
      <Container className="relative z-10 max-w-[100rem]">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 xl:gap-16">
          <Stagger className="min-w-0 text-center lg:text-left">
            <StaggerItem>
              <p className="mx-auto inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border bg-background/70 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground shadow-xs backdrop-blur-surface sm:text-xs lg:mx-0">
                <Sparkles
                  className="size-3.5 text-foreground"
                  aria-hidden="true"
                />
                AI Automation <span aria-hidden="true">•</span> Web Development{" "}
                <span aria-hidden="true">•</span> SaaS Solutions
              </p>
            </StaggerItem>

            <StaggerItem>
              <h1
                id="hero-heading"
                className="mt-6 text-balance text-[clamp(2.7rem,11vw,5.75rem)] font-bold leading-[0.94] tracking-[-0.055em] sm:mt-8 lg:text-[clamp(4.25rem,6.2vw,6rem)]"
              >
                <span className="block">Build Smarter.</span>
                <span className="block bg-gradient-to-r from-foreground via-foreground/75 to-foreground/45 bg-clip-text text-transparent">
                  Automate Faster.
                </span>
                <span className="block">Scale Without Limits.</span>
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0 lg:max-w-xl xl:text-xl">
                {brandName} helps businesses grow through premium websites, AI
                automation, custom software, and intelligent digital solutions
                that save time and increase revenue.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="group h-12 rounded-lg px-6 shadow-soft transition duration-normal hover:-translate-y-0.5 hover:shadow-elevated"
                >
                  <Link href="/book-consultation">
                    Book Free Consultation
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
                  className="h-12 rounded-lg border-foreground/15 bg-background/60 px-6 backdrop-blur-surface transition duration-normal hover:-translate-y-0.5"
                >
                  <Link href="/portfolio">View Our Work</Link>
                </Button>
              </div>
            </StaggerItem>

            <StaggerItem>
              <ul
                aria-label="Delivery commitments"
                className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 text-left sm:flex sm:flex-wrap sm:justify-center sm:gap-x-6 lg:justify-start"
              >
                {trustIndicators.map((indicator) => (
                  <li
                    key={indicator}
                    className="flex items-center gap-2 text-xs font-medium text-muted-foreground sm:text-sm"
                  >
                    <span className="bg-success/12 grid size-5 shrink-0 place-items-center rounded-full text-success">
                      <Check className="size-3" aria-hidden="true" />
                    </span>
                    {indicator}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          </Stagger>

          <Fade className="relative min-w-0">
            <div
              className="absolute -inset-8 -z-10 rounded-full bg-gradient-to-br from-primary/10 via-blue-500/10 to-violet-500/10 blur-ambient"
              aria-hidden="true"
            />
            <AutomationVisual />
          </Fade>
        </div>
      </Container>

      <div
        aria-hidden="true"
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground lg:flex"
      >
        <span>Scroll</span>
        <span className="relative h-7 w-4 rounded-full border border-foreground/20">
          <ChevronDown
            className={cn(
              "absolute left-1/2 top-1 size-2.5 -translate-x-1/2",
              styles.scrollDot,
            )}
          />
        </span>
      </div>
    </section>
  );
}

export { HeroSection };
