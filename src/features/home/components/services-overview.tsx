import {
  ArrowRight,
  Bot,
  Check,
  Code2,
  Gauge,
  LifeBuoy,
  Link2,
  Palette,
  PanelsTopLeft,
  Repeat2,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/cards/card";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { Fade, Stagger, StaggerItem } from "@/components/motion/motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import styles from "./services-overview.module.css";

interface Service {
  readonly title: string;
  readonly description: string;
  readonly capabilities: readonly [string, string, string, string];
  readonly href: string;
  readonly icon: LucideIcon;
  readonly featured?: boolean;
}

const services: readonly Service[] = [
  {
    title: "Custom Web Development",
    description:
      "Fast, polished digital experiences engineered around your business and audience.",
    capabilities: [
      "Business websites",
      "Landing pages",
      "Web applications",
      "Corporate portals",
    ],
    href: "/services/web-development",
    icon: Code2,
  },
  {
    title: "AI Automation",
    description:
      "Practical automation that connects repetitive work, business data, and intelligent decision support.",
    capabilities: [
      "Workflow automation",
      "AI agents",
      "CRM automation",
      "Email automation",
    ],
    href: "/services/ai-automation",
    icon: Bot,
    featured: true,
  },
  {
    title: "SaaS Development",
    description:
      "Reliable software products designed for real users, evolving requirements, and sustainable growth.",
    capabilities: [
      "Multi-tenant platforms",
      "Dashboards",
      "Subscription systems",
      "Internal business tools",
    ],
    href: "/services/saas-development",
    icon: PanelsTopLeft,
  },
  {
    title: "UI / UX Design",
    description:
      "Clear, intuitive product experiences grounded in user needs and business priorities.",
    capabilities: [
      "User research",
      "Wireframes",
      "High-fidelity design",
      "Interactive prototypes",
    ],
    href: "/services/ui-ux-design",
    icon: Palette,
  },
  {
    title: "API & System Integration",
    description:
      "Secure connections that keep platforms, payments, operations, and data working together.",
    capabilities: [
      "Third-party APIs",
      "Payment gateways",
      "ERP/CRM integrations",
      "Data synchronization",
    ],
    href: "/services/api-system-integration",
    icon: Link2,
  },
  {
    title: "Maintenance & Support",
    description:
      "Ongoing technical care that protects performance, reliability, and future momentum.",
    capabilities: [
      "Performance optimization",
      "Security updates",
      "Monitoring",
      "Long-term support",
    ],
    href: "/services/maintenance-support",
    icon: LifeBuoy,
  },
] as const;

function requireFeaturedService(items: readonly Service[]): Service {
  const featured = items.find((service) => service.featured);
  if (!featured) {
    throw new Error("A featured service is required.");
  }
  return featured;
}

const featuredService = requireFeaturedService(services);
const standardServices = services.filter((service) => !service.featured);

function CapabilityList({
  capabilities,
  featured = false,
}: {
  readonly capabilities: Service["capabilities"];
  readonly featured?: boolean;
}) {
  return (
    <ul
      aria-label="Capabilities"
      className={cn("grid gap-2.5", featured && "sm:grid-cols-2 sm:gap-x-6")}
    >
      {capabilities.map((capability) => (
        <li
          key={capability}
          className={cn(
            "flex items-center gap-2.5 text-sm",
            featured ? "text-primary-foreground/78" : "text-muted-foreground",
          )}
        >
          <span
            className={cn(
              "grid size-4 shrink-0 place-items-center rounded-full",
              featured
                ? "bg-primary-foreground/12 text-primary-foreground"
                : "bg-success/12 text-success",
            )}
          >
            <Check className="size-2.5" aria-hidden="true" />
          </span>
          {capability}
        </li>
      ))}
    </ul>
  );
}

function LearnMoreLink({
  service,
  featured = false,
}: {
  readonly service: Service;
  readonly featured?: boolean;
}) {
  return (
    <Button
      asChild
      variant={featured ? "secondary" : "ghost"}
      className={cn(
        "group/link min-h-11 px-4 transition duration-normal",
        featured
          ? "text-secondary-foreground"
          : "-ml-4 text-foreground hover:text-foreground",
        styles.interactiveLink,
      )}
    >
      <Link
        href={service.href}
        aria-label={`Learn more about ${service.title}`}
      >
        Learn More
        <ArrowRight
          className={cn(
            "size-4 transition-transform duration-normal group-hover/link:translate-x-1",
            styles.interactiveArrow,
          )}
          aria-hidden="true"
        />
      </Link>
    </Button>
  );
}

function StandardServiceCard({
  service,
  className,
}: {
  readonly service: Service;
  readonly className?: string;
}) {
  const Icon = service.icon;
  return (
    <Card
      className={cn(
        "group relative flex h-full flex-col overflow-hidden bg-card/75 p-6 transition duration-normal hover:-translate-y-1 hover:border-foreground/20 hover:shadow-elevated sm:p-7",
        styles.interactiveCard,
        className,
      )}
    >
      <span
        className="absolute right-0 top-0 size-28 -translate-y-1/2 translate-x-1/2 rounded-full border bg-muted/30 transition-colors group-hover:bg-muted/60"
        aria-hidden="true"
      />
      <span
        className={cn(
          "relative grid size-11 place-items-center rounded-xl border bg-background shadow-xs transition duration-normal group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground",
          styles.interactiveIcon,
        )}
      >
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="relative mt-7 text-xl font-semibold tracking-tight">
        {service.title}
      </h3>
      <p className="relative mt-3 min-h-[3.75rem] text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>
      <div className="relative my-6 h-px bg-border" aria-hidden="true" />
      <div className="relative flex-1">
        <CapabilityList capabilities={service.capabilities} />
      </div>
      <div className="relative mt-6 border-t pt-3">
        <LearnMoreLink service={service} />
      </div>
    </Card>
  );
}

function AutomationValueFlow() {
  const stages = [
    { label: "Repetitive task", icon: Repeat2 },
    { label: "Connected workflow", icon: Workflow },
    { label: "Team focus", icon: Gauge },
  ] as const;

  return (
    <div className="border-primary-foreground/12 relative rounded-2xl border bg-primary-foreground/[0.055] p-4 backdrop-blur-surface sm:p-5">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground/60">
        <Sparkles className="size-3.5" aria-hidden="true" />
        Automation value path
      </div>
      <ol className="mt-5 grid gap-3 sm:grid-cols-3 sm:gap-2">
        {stages.map(({ label, icon: Icon }, index) => (
          <li
            key={label}
            className="relative flex items-center gap-3 sm:block sm:text-center"
          >
            <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-xl border border-primary-foreground/15 bg-primary text-primary-foreground shadow-soft sm:mx-auto">
              <Icon className="size-4" aria-hidden="true" />
            </span>
            <span className="text-primary-foreground/76 text-xs font-medium sm:mt-3 sm:block">
              {label}
            </span>
            {index < stages.length - 1 ? (
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-10 top-5 hidden h-px w-[calc(100%-2.5rem)] sm:block",
                  styles.flowLine,
                )}
              />
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

function FeaturedServiceCard({ service }: { readonly service: Service }) {
  const Icon = service.icon;
  return (
    <Fade>
      <Card className="relative overflow-hidden border-primary bg-primary text-primary-foreground shadow-elevated">
        <div
          className={cn(
            "pointer-events-none absolute inset-0",
            styles.featuredGrid,
          )}
          aria-hidden="true"
        />
        <div
          className={cn(
            "pointer-events-none absolute -right-20 -top-32 size-96 rounded-full",
            styles.featuredGlow,
          )}
          aria-hidden="true"
        />
        <div className="relative grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:p-10 xl:p-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-xl border border-primary-foreground/15 bg-primary-foreground/10">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="rounded-full border border-primary-foreground/15 bg-primary-foreground/[0.07] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground/70">
                Featured service
              </span>
            </div>
            <h3 className="mt-7 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {service.title}
            </h3>
            <p className="text-primary-foreground/72 mt-4 max-w-xl text-base leading-relaxed sm:text-lg">
              {service.description}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-primary-foreground/65">
              By reducing manual handoffs and connecting routine processes,
              automation can improve consistency, shorten response time, and
              give teams more room for higher-value work. The opportunity
              depends on the workflow, so we begin by identifying where
              automation is genuinely useful.
            </p>
            <div className="mt-7">
              <LearnMoreLink service={service} featured />
            </div>
          </div>
          <div className="space-y-5">
            <AutomationValueFlow />
            <div className="border-primary-foreground/12 rounded-2xl border bg-primary-foreground/[0.055] p-5">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground/60">
                Capabilities
              </p>
              <CapabilityList capabilities={service.capabilities} featured />
            </div>
          </div>
        </div>
      </Card>
    </Fade>
  );
}

function ServicesCta() {
  return (
    <Fade>
      <div className="grid gap-7 border-t pt-10 sm:grid-cols-[1fr_auto] sm:items-center lg:pt-12">
        <div>
          <h3 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Need a Custom Solution?
          </h3>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Every business has unique challenges. Let&apos;s design a solution
            tailored to your goals.
          </p>
        </div>
        <Button
          asChild
          size="lg"
          className={cn(
            "group h-12 self-start rounded-lg px-6 shadow-soft sm:self-auto",
            styles.interactiveLink,
          )}
        >
          <Link href="/book-consultation">
            Book a Free Consultation
            <ArrowRight
              className={cn(
                "size-4 transition-transform group-hover:translate-x-1",
                styles.interactiveArrow,
              )}
              aria-hidden="true"
            />
          </Link>
        </Button>
      </div>
    </Fade>
  );
}

function ServicesOverviewSection() {
  return (
    <section
      aria-labelledby="services-overview-heading"
      className="relative overflow-hidden border-b py-20 sm:py-24 lg:py-30"
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          styles.sectionGlow,
        )}
        aria-hidden="true"
      />
      <Container className="relative max-w-[100rem]">
        <Fade>
          <div className="max-w-3xl">
            <Eyebrow className="mb-4 text-xs">Our Services</Eyebrow>
            <h2
              id="services-overview-heading"
              className="text-balance text-headline font-bold"
            >
              Digital Solutions Designed to Grow Your Business
            </h2>
            <p className="mt-5 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
              We build modern websites, AI-powered automations, custom software,
              and scalable digital solutions that help businesses operate more
              efficiently and grow faster.
            </p>
          </div>
        </Fade>

        <div className="mt-12 sm:mt-14">
          <FeaturedServiceCard service={featuredService} />
          <Stagger className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-6">
            {standardServices.map((service, index) => (
              <StaggerItem
                key={service.title}
                className={cn(
                  "h-full",
                  index < 2 ? "xl:col-span-3" : "xl:col-span-2",
                )}
              >
                <StandardServiceCard service={service} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="mt-16 sm:mt-20">
          <ServicesCta />
        </div>
      </Container>
    </section>
  );
}

export { ServicesOverviewSection };
