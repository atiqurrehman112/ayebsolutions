import {
  ArrowRight,
  Blocks,
  BriefcaseBusiness,
  Building2,
  Check,
  Factory,
  Gauge,
  GraduationCap,
  HeartPulse,
  Layers3,
  Landmark,
  LockKeyhole,
  Network,
  Rocket,
  ShoppingBag,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/cards/card";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { Fade, Stagger, StaggerItem } from "@/components/motion/motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import { cn } from "@/lib/utils";
import styles from "./industries-showcase.module.css";

interface Industry {
  readonly title: string;
  readonly overview: string;
  readonly solutions: readonly string[];
  readonly technologies: readonly string[];
  readonly href: string;
  readonly icon: LucideIcon;
}

interface Benefit {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

interface TechnologyMapping {
  readonly technology: string;
  readonly role: string;
  readonly supports: string;
}

const industries: readonly Industry[] = [
  {
    title: "Healthcare",
    overview:
      "Clear digital tools for sensitive workflows, coordinated teams, and accessible patient interactions.",
    solutions: [
      "Patient portals",
      "Appointment systems",
      "Internal dashboards",
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL"],
    href: "/industries/healthcare",
    icon: HeartPulse,
  },
  {
    title: "Education",
    overview:
      "Connected learning and administration experiences designed around educators, students, and families.",
    solutions: [
      "School portals",
      "Learning management systems",
      "Student management",
    ],
    technologies: ["React", "Node.js", "Prisma"],
    href: "/industries/education",
    icon: GraduationCap,
  },
  {
    title: "Real Estate",
    overview:
      "Property journeys that organize listings, enquiries, and follow-up without losing important context.",
    solutions: ["Property websites", "CRM workflows", "Lead automation"],
    technologies: ["Next.js", "OpenAI", "PostgreSQL"],
    href: "/industries/real-estate",
    icon: Building2,
  },
  {
    title: "E-Commerce",
    overview:
      "Customer-facing commerce and operational systems built for dependable purchasing experiences.",
    solutions: ["Online stores", "Inventory workflows", "Payment integrations"],
    technologies: ["Next.js", "Node.js", "Cloudinary"],
    href: "/industries/e-commerce",
    icon: ShoppingBag,
  },
  {
    title: "Finance",
    overview:
      "Structured internal products that make financial information easier to review and act on securely.",
    solutions: ["Internal dashboards", "Reporting tools", "Secure workflows"],
    technologies: ["React", "PostgreSQL", "Docker"],
    href: "/industries/finance",
    icon: Landmark,
  },
  {
    title: "Manufacturing",
    overview:
      "Operational software that connects production visibility, inventory context, and repeatable processes.",
    solutions: [
      "Operations dashboards",
      "Inventory systems",
      "Workflow automation",
    ],
    technologies: ["React", "Node.js", "Docker"],
    href: "/industries/manufacturing",
    icon: Factory,
  },
  {
    title: "Professional Services",
    overview:
      "Focused client and team systems that reduce friction across scheduling, records, and delivery.",
    solutions: ["Booking systems", "CRM workflows", "Document management"],
    technologies: ["Next.js", "Prisma", "Cloudinary"],
    href: "/industries/professional-services",
    icon: BriefcaseBusiness,
  },
  {
    title: "Startups",
    overview:
      "Pragmatic product foundations that help teams validate, learn, and evolve without unnecessary complexity.",
    solutions: ["MVP development", "SaaS products", "AI-enabled products"],
    technologies: ["Next.js", "OpenAI", "Docker"],
    href: "/industries/startups",
    icon: Rocket,
  },
] as const;

const benefits: readonly Benefit[] = [
  {
    title: "Tailored Workflows",
    description:
      "Interfaces and process logic shaped around how the organization actually operates.",
    icon: Workflow,
  },
  {
    title: "Automation Opportunities",
    description:
      "Careful identification of repeatable work that may benefit from connected systems.",
    icon: Sparkles,
  },
  {
    title: "Scalable Systems",
    description:
      "Architecture selected with current requirements and credible future change in view.",
    icon: Blocks,
  },
  {
    title: "Business Efficiency",
    description:
      "Clearer information flows that can reduce avoidable handoffs and operational friction.",
    icon: Gauge,
  },
  {
    title: "Secure Architecture",
    description:
      "Validation, permissions, and safe defaults considered according to the system's risk.",
    icon: LockKeyhole,
  },
  {
    title: "Future Growth",
    description:
      "Maintainable foundations designed to support measured iteration over time.",
    icon: Layers3,
  },
] as const;

const technologyMappings: readonly TechnologyMapping[] = [
  {
    technology: "Next.js",
    role: "Web experiences",
    supports: "Fast, accessible portals, stores, and product interfaces.",
  },
  {
    technology: "React",
    role: "Interactive interfaces",
    supports: "Reusable dashboards and task-focused application experiences.",
  },
  {
    technology: "Node.js",
    role: "Application services",
    supports: "APIs, integrations, workflow logic, and background processes.",
  },
  {
    technology: "PostgreSQL",
    role: "Structured data",
    supports: "Relational records for operational and customer-facing systems.",
  },
  {
    technology: "OpenAI",
    role: "Bounded AI assistance",
    supports:
      "Reviewable classification, drafting, and knowledge workflows where appropriate.",
  },
  {
    technology: "Docker",
    role: "Portable environments",
    supports:
      "Consistent application packaging across development and deployment.",
  },
  {
    technology: "Prisma",
    role: "Typed data access",
    supports:
      "Maintainable application models and explicit database operations.",
  },
  {
    technology: "Cloudinary",
    role: "Media delivery",
    supports: "Managed image and asset workflows for content-rich experiences.",
  },
] as const;

function IndustryCard({
  industry,
  index,
}: {
  readonly industry: Industry;
  readonly index: number;
}) {
  const Icon = industry.icon;
  const featured = index < 2;
  return (
    <Card
      className={cn(
        "group relative flex h-full flex-col overflow-hidden bg-card/80 p-5 sm:p-6",
        styles.industryCard,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={cn(
            "relative grid size-11 shrink-0 place-items-center rounded-xl border bg-background shadow-xs transition-colors duration-normal group-hover:bg-primary group-hover:text-primary-foreground",
            styles.iconFrame,
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
          Area {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div
        className={cn(
          "flex flex-1 flex-col",
          featured && "xl:mt-6 xl:grid xl:grid-cols-[0.85fr_1.15fr] xl:gap-8",
        )}
      >
        <div>
          <h3
            className={cn(
              "mt-6 text-xl font-semibold tracking-tight sm:text-2xl",
              featured && "xl:mt-0 xl:text-3xl",
            )}
          >
            {industry.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {industry.overview}
          </p>
        </div>
        <div
          className={cn(
            "flex flex-1 flex-col",
            featured && "xl:border-l xl:pl-8",
          )}
        >
          <div className="mt-6 border-t pt-5 xl:mt-0 xl:border-t-0 xl:pt-0">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-muted-foreground">
              Example solutions
            </p>
            <ul
              aria-label={`${industry.title} example solutions`}
              className="mt-3 space-y-2"
            >
              {industry.solutions.map((solution) => (
                <li key={solution} className="flex items-start gap-2 text-sm">
                  <Check
                    className="mt-0.5 size-3.5 shrink-0 text-success"
                    aria-hidden="true"
                  />
                  {solution}
                </li>
              ))}
            </ul>
          </div>
          <ul
            aria-label={`${industry.title} technology examples`}
            className="mt-5 flex flex-wrap gap-2"
          >
            {industry.technologies.map((technology) => (
              <li key={technology}>
                <Badge
                  variant="outline"
                  className="bg-background/65 font-mono text-[0.65rem] font-medium"
                >
                  {technology}
                </Badge>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-6">
            <Button
              asChild
              variant="ghost"
              className="group/link -ml-4 justify-start"
            >
              <Link
                href={industry.href}
                aria-label={`Learn more about solutions for ${industry.title}`}
              >
                Learn More
                <ArrowRight
                  className="size-4 transition-transform duration-normal group-hover/link:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function IndustryBenefitsPanel() {
  return (
    <div
      aria-labelledby="industry-benefits-heading"
      className={cn(
        "relative overflow-hidden rounded-2xl p-6 text-primary-foreground shadow-elevated sm:p-8 lg:p-10",
        styles.benefitPanel,
      )}
    >
      <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:items-start lg:gap-14">
        <div>
          <Eyebrow className="mb-3 text-xs text-primary-foreground/55">
            Built around your operations
          </Eyebrow>
          <h3
            id="industry-benefits-heading"
            className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Industry context changes the right solution.
          </h3>
          <p className="mt-4 text-base leading-relaxed text-primary-foreground/70">
            We examine the people, information, constraints, and handoffs behind
            the requirement before defining the product.
          </p>
        </div>
        <Stagger className="grid gap-px overflow-hidden rounded-xl border border-primary-foreground/15 bg-primary-foreground/15 sm:grid-cols-2">
          {benefits.map(({ title, description, icon: Icon }) => (
            <StaggerItem key={title} className="h-full bg-primary/90">
              <div className="flex h-full gap-4 p-5">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary-foreground/10">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <h4 className="text-sm font-semibold">{title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-primary-foreground/65">
                    {description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  );
}

function TechnologyMapping() {
  return (
    <div aria-labelledby="industry-technology-heading">
      <div className="max-w-2xl">
        <Eyebrow className="mb-3 text-xs">Technology mapping</Eyebrow>
        <h3
          id="industry-technology-heading"
          className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Technology selected for the role it needs to play.
        </h3>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          The final stack depends on product requirements, existing systems,
          security needs, and operating constraints.
        </p>
      </div>
      <div className="relative mt-8 overflow-hidden rounded-2xl border bg-card/75 shadow-soft">
        <div
          aria-hidden="true"
          className={cn(
            "absolute bottom-6 left-[2.7rem] top-6 w-px sm:left-[3.2rem]",
            styles.mappingLine,
          )}
        />
        <dl>
          {technologyMappings.map(({ technology, role, supports }, index) => (
            <div
              key={technology}
              className="relative grid gap-3 border-b p-5 last:border-b-0 sm:grid-cols-[8rem_10rem_1fr] sm:items-center sm:gap-6 sm:p-6 lg:grid-cols-[10rem_12rem_1fr] lg:px-8"
            >
              <dt className="flex items-center gap-4 font-semibold tracking-tight">
                <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-lg border bg-background font-mono text-[0.62rem] shadow-xs">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {technology}
              </dt>
              <dd className="pl-[3.25rem] text-xs font-semibold uppercase tracking-[0.11em] text-muted-foreground sm:pl-0">
                {role}
              </dd>
              <dd className="pl-[3.25rem] text-sm leading-relaxed text-muted-foreground sm:pl-0">
                {supports}
              </dd>
            </div>
          ))}
        </dl>
        <p className="border-t bg-muted/40 px-5 py-4 text-xs leading-relaxed text-muted-foreground sm:px-8">
          Technology references describe tools we can build with. They do not
          indicate certifications, official partnerships, or endorsements.
        </p>
      </div>
    </div>
  );
}

function IndustriesCta() {
  return (
    <Fade>
      <div className="grid gap-7 border-t pt-10 lg:grid-cols-[1fr_auto] lg:items-center lg:pt-12">
        <div>
          <h3 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Looking for a Solution Built for Your Industry?
          </h3>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Let&apos;s discuss your business goals and design a solution that
            fits your workflow.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group h-12 rounded-lg px-6 shadow-soft"
          >
            <Link href="/book-consultation">
              Book Consultation
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
            <Link href="/services">Explore Services</Link>
          </Button>
        </div>
      </div>
    </Fade>
  );
}

function IndustriesShowcaseSection() {
  return (
    <section
      aria-labelledby="industries-showcase-heading"
      className="relative overflow-hidden border-b py-20 sm:py-24 lg:py-30"
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
            <Eyebrow className="mb-4 text-xs">Industries</Eyebrow>
            <h2
              id="industries-showcase-heading"
              className="text-balance text-headline font-bold"
            >
              Solutions Built for Modern Businesses
            </h2>
            <p className="mt-5 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
              Every industry has different workflows, customers, and operational
              challenges. We design digital solutions tailored to those needs.
            </p>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Network className="size-3.5" aria-hidden="true" />
              Solution areas we actively design and develop for—not a client
              list.
            </p>
          </div>
        </Fade>
        <Stagger className="mt-12 grid gap-5 sm:mt-14 md:grid-cols-2 xl:grid-cols-12">
          {industries.map((industry, index) => (
            <StaggerItem
              key={industry.title}
              className={cn(
                "h-full xl:col-span-3",
                index < 2 && "xl:col-span-6",
              )}
            >
              <IndustryCard industry={industry} index={index} />
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-20 space-y-20 sm:mt-24 sm:space-y-24 lg:space-y-30">
          <IndustryBenefitsPanel />
          <TechnologyMapping />
          <IndustriesCta />
        </div>
      </Container>
    </section>
  );
}

export { IndustriesShowcaseSection };
