import {
  Accessibility,
  ArrowRight,
  Blocks,
  Check,
  Code2,
  DraftingCompass,
  Gauge,
  Handshake,
  Layers3,
  MessageSquareText,
  Rocket,
  SearchCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/cards/card";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { Fade, Stagger, StaggerItem } from "@/components/motion/motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/disclosure";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import styles from "./process-showcase.module.css";

interface ProcessStep {
  readonly title: string;
  readonly description: string;
  readonly detail: string;
  readonly considerations: readonly string[];
  readonly icon: LucideIcon;
}

interface ApproachItem {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

const processSteps: readonly ProcessStep[] = [
  {
    title: "Discovery",
    description:
      "Understand business goals, users, requirements, and technical constraints.",
    detail:
      "We start by creating shared context before recommending a solution, so scope and decisions have a clear reason behind them.",
    considerations: [
      "Business and user needs",
      "Scope boundaries",
      "Systems and constraints",
    ],
    icon: SearchCheck,
  },
  {
    title: "Strategy & Planning",
    description:
      "Define architecture, timelines, milestones, and technical approach.",
    detail:
      "The plan turns discovery into an understandable delivery path, including dependencies, tradeoffs, and points that need validation.",
    considerations: [
      "Technical blueprint",
      "Delivery sequence",
      "Risks and decisions",
    ],
    icon: DraftingCompass,
  },
  {
    title: "Design",
    description:
      "Wireframes, UI/UX, design systems, prototypes, and user flows.",
    detail:
      "Structure and interaction are resolved before polish, then expressed through reusable patterns that support a consistent product.",
    considerations: [
      "User flows",
      "Responsive interface",
      "Reusable design language",
    ],
    icon: Layers3,
  },
  {
    title: "Development",
    description:
      "Frontend, backend, APIs, database, testing, and integrations.",
    detail:
      "Implementation progresses in reviewable increments, with clear boundaries between interfaces, business logic, data, and integrations.",
    considerations: [
      "Typed interfaces",
      "Reviewable changes",
      "Integration boundaries",
    ],
    icon: Code2,
  },
  {
    title: "Testing & Launch",
    description:
      "Quality assurance, performance, accessibility, deployment, and production verification.",
    detail:
      "Release readiness is checked across important user paths and target environments before and after the production deployment.",
    considerations: [
      "Functional scenarios",
      "Quality checks",
      "Release verification",
    ],
    icon: Rocket,
  },
  {
    title: "Growth & Support",
    description:
      "Monitoring, updates, optimization, feature improvements, and long-term partnership.",
    detail:
      "After launch, agreed signals and real feedback can guide maintenance and thoughtful improvements instead of disconnected changes.",
    considerations: [
      "Operational visibility",
      "Prioritized improvements",
      "Documented changes",
    ],
    icon: Handshake,
  },
] as const;

const approachItems: readonly ApproachItem[] = [
  {
    title: "Transparent Communication",
    description:
      "We make decisions, progress, dependencies, and open questions visible throughout the engagement.",
    icon: MessageSquareText,
  },
  {
    title: "Scalable Architecture",
    description:
      "We choose boundaries and patterns with current needs and credible future change in mind.",
    icon: Blocks,
  },
  {
    title: "Performance Focus",
    description:
      "We treat loading, rendering, asset delivery, and runtime behavior as product considerations.",
    icon: Gauge,
  },
  {
    title: "Clean Code",
    description:
      "We favor clear responsibilities, strong types, reusable composition, and maintainable conventions.",
    icon: Code2,
  },
  {
    title: "Accessibility",
    description:
      "We include semantics, keyboard paths, contrast, focus states, and motion preferences in our reviews.",
    icon: Accessibility,
  },
  {
    title: "SEO",
    description:
      "We build a sound technical foundation with meaningful structure, metadata, and crawlable content.",
    icon: SearchCheck,
  },
  {
    title: "Modern Technologies",
    description:
      "We select supported tools for fit and longevity, rather than adopting technology for novelty alone.",
    icon: Sparkles,
  },
  {
    title: "Long-Term Support",
    description:
      "We plan for documentation, operability, updates, and continued improvement after release.",
    icon: Handshake,
  },
] as const;

const qualityPractices = [
  {
    title: "Type Safety",
    description: "We include strict typing where the technology supports it.",
  },
  {
    title: "Responsive Design",
    description:
      "We aim to validate layouts from compact mobile screens to large displays.",
  },
  {
    title: "Accessibility Reviews",
    description:
      "Our process emphasizes semantics, focus, contrast, and reduced motion.",
  },
  {
    title: "Code Reviews",
    description:
      "We include structured review before production changes are accepted.",
  },
  {
    title: "Performance Optimization",
    description:
      "We aim to measure and improve loading, rendering, and asset delivery.",
  },
  {
    title: "Security Best Practices",
    description:
      "Our process emphasizes validation, safe configuration, and least privilege.",
  },
  {
    title: "Documentation",
    description:
      "We include context for important architecture and operating decisions.",
  },
  {
    title: "Version Control",
    description: "We use traceable version control and reviewable changes.",
  },
  {
    title: "Testing",
    description:
      "We include testing proportionate to feature behavior and risk.",
  },
  {
    title: "Deployment Verification",
    description: "We include production builds and post-deployment checks.",
  },
] as const;

function ProcessTimeline() {
  return (
    <Accordion
      type="multiple"
      defaultValue={["process-1"]}
      className={styles.timeline}
    >
      {processSteps.map((step, index) => {
        const Icon = step.icon;
        const number = String(index + 1).padStart(2, "0");
        return (
          <AccordionItem
            key={step.title}
            value={`process-${index + 1}`}
            className={cn(
              "relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 border-0 pb-6 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5 sm:pb-8 lg:grid-cols-[minmax(0,1fr)_4.5rem_minmax(0,1fr)] lg:items-start lg:gap-8 lg:pb-10",
              styles.timelineItem,
            )}
          >
            <div className="relative z-10 col-start-1 grid size-10 place-items-center self-start rounded-full border bg-background shadow-soft sm:size-12 lg:col-start-2 lg:row-start-1 lg:justify-self-center">
              <span
                className={cn(
                  "relative font-mono text-xs font-bold",
                  styles.timelineNode,
                )}
              >
                {number}
              </span>
            </div>
            <Card
              className={cn(
                "col-start-2 overflow-hidden bg-card/85 lg:col-auto",
                styles.timelineCard,
              )}
            >
              <AccordionTrigger className="group min-h-32 px-5 py-5 text-left hover:no-underline sm:px-6 sm:py-6">
                <span className="flex min-w-0 items-start gap-4 pr-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border bg-background shadow-xs transition-colors duration-normal group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-lg font-semibold tracking-tight sm:text-xl">
                      {step.title}
                    </span>
                    <span className="mt-2 block text-sm font-normal leading-relaxed text-muted-foreground">
                      {step.description}
                    </span>
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-6 sm:px-6">
                <div className="border-t pt-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.detail}
                  </p>
                  <ul
                    aria-label={`${step.title} focus areas`}
                    className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3"
                  >
                    {step.considerations.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs font-medium leading-relaxed"
                      >
                        <Check
                          className="mt-0.5 size-3.5 shrink-0 text-success"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

function WhyChooseGrid() {
  return (
    <div aria-labelledby="why-choose-heading">
      <div className="max-w-2xl">
        <Eyebrow className="mb-3 text-xs">Why choose Ayeb</Eyebrow>
        <h3
          id="why-choose-heading"
          className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Engineering decisions you can understand.
        </h3>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Our approach connects technical quality to the practical needs of your
          team, users, and product.
        </p>
      </div>
      <Stagger className="mt-8 grid gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-2">
        {approachItems.map(({ title, description, icon: Icon }, index) => (
          <StaggerItem key={title} className="h-full bg-background">
            <div className="group h-full p-5 transition-colors duration-normal hover:bg-muted/40 sm:p-6 lg:p-7">
              <div className="flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border bg-card shadow-xs transition-colors duration-normal group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">
                    Focus {String(index + 1).padStart(2, "0")}
                  </span>
                  <h4 className="mt-1 font-semibold tracking-tight">{title}</h4>
                </div>
              </div>
              <div className="mt-5 border-t pt-4">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-muted-foreground">
                  Our approach
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

function QualityChecklist() {
  return (
    <div
      aria-labelledby="quality-promises-heading"
      className="relative overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-elevated sm:p-8 lg:p-10"
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0",
          styles.qualityGlow,
        )}
      />
      <div className="relative grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
        <div>
          <Eyebrow className="mb-3 text-xs text-primary-foreground/55">
            Quality practices
          </Eyebrow>
          <h3
            id="quality-promises-heading"
            className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Quality is built into the path to launch.
          </h3>
          <p className="mt-4 text-base leading-relaxed text-primary-foreground/70">
            The exact depth depends on project scope and risk. These practices
            shape how we plan, review, and release the work.
          </p>
        </div>
        <ul
          aria-label="Quality practices checklist"
          className="grid gap-px overflow-hidden rounded-xl border border-primary-foreground/15 bg-primary-foreground/15 sm:grid-cols-2"
        >
          {qualityPractices.map(({ title, description }) => (
            <li key={title} className="bg-primary/90 p-4 sm:p-5">
              <div className="flex gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary-foreground text-primary">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                <div>
                  <h4 className="text-sm font-semibold">{title}</h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-primary-foreground/65">
                    {description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ProcessCta() {
  return (
    <Fade>
      <div className="grid gap-7 border-t pt-10 lg:grid-cols-[1fr_auto] lg:items-center lg:pt-12">
        <div>
          <h3 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Ready to Start Your Project?
          </h3>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Tell us about your idea and let&apos;s plan the best technical
            solution together.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group h-12 rounded-lg px-6 shadow-soft"
          >
            <Link href="/book-consultation">
              Book Free Consultation
              <ArrowRight
                className="size-4 transition-transform duration-normal group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-lg px-6"
          >
            <Link href="/services">View Services</Link>
          </Button>
        </div>
      </div>
    </Fade>
  );
}

function ProcessShowcaseSection() {
  return (
    <section
      aria-labelledby="process-showcase-heading"
      className="relative overflow-hidden border-b bg-muted/[0.1] py-20 sm:py-24 lg:py-30"
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0",
          styles.sectionBackground,
        )}
      />
      <Container className="relative max-w-[100rem]">
        <Fade>
          <div className="max-w-3xl">
            <Eyebrow className="mb-4 text-xs">Our Process</Eyebrow>
            <h2
              id="process-showcase-heading"
              className="text-balance text-headline font-bold"
            >
              A Clear Process From Idea to Launch
            </h2>
            <p className="mt-5 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
              Every project follows a structured process focused on planning,
              quality, communication, and continuous improvement.
            </p>
          </div>
        </Fade>
        <div className="mt-12 sm:mt-14">
          <ProcessTimeline />
        </div>
        <div className="mt-20 space-y-20 sm:mt-24 sm:space-y-24 lg:space-y-30">
          <WhyChooseGrid />
          <QualityChecklist />
          <ProcessCta />
        </div>
      </Container>
    </section>
  );
}

export { ProcessShowcaseSection };
