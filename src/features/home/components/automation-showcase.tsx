import {
  ArrowRight,
  Bot,
  Clock3,
  Headphones,
  Link2,
  Megaphone,
  MessagesSquare,
  RefreshCcw,
  Scale,
  Settings2,
  ShieldCheck,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/cards/card";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { Fade, Stagger, StaggerItem } from "@/components/motion/motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import styles from "./automation-showcase.module.css";
import { AutomationWorkflow } from "./automation-workflow";

interface ShowcaseItem {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

const categories: readonly ShowcaseItem[] = [
  {
    title: "Workflow Automation",
    description: "Connect repeatable steps and handoffs.",
    icon: Workflow,
  },
  {
    title: "AI Agents",
    description: "Assist with bounded, reviewable tasks.",
    icon: Bot,
  },
  {
    title: "CRM Automation",
    description: "Keep customer records and actions aligned.",
    icon: RefreshCcw,
  },
  {
    title: "Sales Automation",
    description: "Support routing, follow-up, and preparation.",
    icon: TrendingUp,
  },
  {
    title: "Customer Support",
    description: "Improve triage and response workflows.",
    icon: Headphones,
  },
  {
    title: "Marketing Automation",
    description: "Coordinate approved audience journeys.",
    icon: Megaphone,
  },
  {
    title: "Internal Business Tools",
    description: "Reduce friction in operational work.",
    icon: Settings2,
  },
] as const;

const benefits: readonly ShowcaseItem[] = [
  {
    title: "Reduce repetitive work",
    description:
      "Automate suitable routine steps while preserving human oversight where it matters.",
    icon: RefreshCcw,
  },
  {
    title: "Improve consistency",
    description:
      "Use defined rules, templates, and validation to make recurring processes more predictable.",
    icon: ShieldCheck,
  },
  {
    title: "Connect existing systems",
    description:
      "Move approved information between the tools your teams already depend on.",
    icon: Link2,
  },
  {
    title: "Scale business operations",
    description:
      "Build repeatable workflows that can support higher operational volume over time.",
    icon: Scale,
  },
  {
    title: "Save team time",
    description:
      "Reduce avoidable manual handoffs so people can focus on judgment and relationship work.",
    icon: Clock3,
  },
  {
    title: "Improve customer response",
    description:
      "Help teams route context and prepare useful responses with fewer disconnected steps.",
    icon: MessagesSquare,
  },
] as const;

const integrations = [
  { name: "OpenAI", mark: "AI" },
  { name: "Google Workspace", mark: "G" },
  { name: "Slack", mark: "S" },
  { name: "Notion", mark: "N" },
  { name: "HubSpot", mark: "H" },
  { name: "Zapier", mark: "Z" },
  { name: "WhatsApp", mark: "W" },
  { name: "Stripe", mark: "ST" },
  { name: "Shopify", mark: "SH" },
  { name: "Microsoft 365", mark: "M" },
] as const;

function AutomationCategories() {
  return (
    <div aria-labelledby="automation-categories-heading">
      <div className="max-w-2xl">
        <Eyebrow className="mb-3 text-xs">Automation categories</Eyebrow>
        <h3
          id="automation-categories-heading"
          className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Designed around the work, not the buzzword.
        </h3>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          We identify the right automation pattern only after understanding the
          process, risk, and people involved.
        </p>
      </div>
      <Stagger className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map(({ title, description, icon: Icon }, index) => (
          <StaggerItem
            key={title}
            className={cn(
              "h-full",
              index === categories.length - 1 && "sm:col-span-2 lg:col-span-2",
            )}
          >
            <Card
              className={cn(
                "group flex h-full items-start gap-4 bg-card/70 p-5 transition duration-normal hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-soft",
                styles.interactiveCard,
              )}
            >
              <span
                className={cn(
                  "grid size-10 shrink-0 place-items-center rounded-xl border bg-background transition duration-normal group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground",
                  styles.interactiveIcon,
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <div>
                <h4 className="font-semibold tracking-tight">{title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

function BenefitsGrid() {
  return (
    <div aria-labelledby="automation-benefits-heading">
      <div className="max-w-2xl">
        <Eyebrow className="mb-3 text-xs">Practical benefits</Eyebrow>
        <h3
          id="automation-benefits-heading"
          className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Better systems create room for better work.
        </h3>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          The impact depends on the process and adoption. These are the
          practical outcomes a well-designed system can support.
        </p>
      </div>
      <Stagger className="mt-8 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map(({ title, description, icon: Icon }) => (
          <StaggerItem key={title} className="h-full">
            <div className="group h-full bg-background p-6 transition-colors duration-normal hover:bg-muted/45 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg border bg-card shadow-xs">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <h4 className="font-semibold tracking-tight">{title}</h4>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

function IntegrationsShowcase() {
  return (
    <div
      aria-labelledby="integrations-heading"
      className="relative overflow-hidden rounded-2xl border bg-card/75 p-6 shadow-soft sm:p-8 lg:p-10"
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0",
          styles.integrationOrbit,
        )}
      />
      <div className="relative grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <div>
          <Eyebrow className="mb-3 text-xs">Compatible with</Eyebrow>
          <h3
            id="integrations-heading"
            className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Connect the tools your business already uses.
          </h3>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Integration support depends on available APIs, permissions, and the
            workflow being designed.
          </p>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Compatibility references do not indicate partnerships,
            certifications, or endorsements.
          </p>
        </div>
        <ul
          aria-label="Compatible integration technologies"
          className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5"
        >
          {integrations.map((integration) => (
            <li
              key={integration.name}
              className="flex min-h-20 flex-col items-center justify-center rounded-xl border bg-background/80 p-3 text-center shadow-xs backdrop-blur-surface"
            >
              <span
                aria-hidden="true"
                className="grid size-8 place-items-center rounded-lg bg-primary font-mono text-[0.62rem] font-bold text-primary-foreground"
              >
                {integration.mark}
              </span>
              <span className="mt-2 text-xs font-medium">
                {integration.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AutomationCta() {
  return (
    <Fade>
      <div className="grid gap-7 border-t pt-10 sm:grid-cols-[1fr_auto] sm:items-center lg:pt-12">
        <div>
          <h3 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Let&apos;s Automate Your Business
          </h3>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Book a strategy session and discover where automation can create the
            biggest impact.
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
            Schedule Consultation
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

function AutomationShowcaseSection() {
  return (
    <section
      aria-labelledby="automation-showcase-heading"
      className="relative overflow-hidden border-b py-20 sm:py-24 lg:py-30"
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0",
          styles.sectionGlow,
        )}
      />
      <Container className="relative max-w-[100rem]">
        <Fade>
          <div className="max-w-3xl">
            <Eyebrow className="mb-4 text-xs">AI Automation</Eyebrow>
            <h2
              id="automation-showcase-heading"
              className="text-balance text-headline font-bold"
            >
              See How Intelligent Automation Transforms Your Workflow
            </h2>
            <p className="mt-5 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
              We design automation systems that connect your website, CRM,
              email, AI, and business tools into one seamless workflow.
            </p>
          </div>
        </Fade>
        <div className="mt-12 sm:mt-14">
          <AutomationWorkflow />
        </div>
        <div className="mt-20 space-y-20 sm:mt-24 sm:space-y-24 lg:space-y-30">
          <AutomationCategories />
          <BenefitsGrid />
          <IntegrationsShowcase />
          <AutomationCta />
        </div>
      </Container>
    </section>
  );
}

export { AutomationShowcaseSection };
