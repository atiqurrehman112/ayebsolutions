import {
  Accessibility,
  ArrowRight,
  Code2,
  Gauge,
  Headphones,
  MessageSquareText,
  Route,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Container, Eyebrow } from "@/components/layout/primitives";
import { Fade, Stagger, StaggerItem } from "@/components/motion/motion";
import { StructuredData } from "@/components/seo/structured-data";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/disclosure";
import { cn } from "@/lib/utils";
import styles from "./faq-showcase.module.css";

interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

interface TrustIndicator {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

const faqItems: readonly FaqItem[] = [
  {
    question: "What services does Ayeb Solutions provide?",
    answer:
      "We design and develop business websites, web applications, AI automation workflows, custom SaaS products, user interfaces, API integrations, and ongoing maintenance solutions. The recommended scope depends on the problem, users, existing systems, and operational goals we identify during discovery.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project duration depends on scope, technical complexity, content readiness, integrations, review cycles, and stakeholder availability. After discovery, we define a delivery plan with milestones and dependencies rather than assigning a timeline before understanding the work.",
  },
  {
    question: "Can you redesign an existing website?",
    answer:
      "Yes. We can assess the existing experience, content structure, performance, accessibility, SEO foundation, and technical constraints before recommending a focused redesign or a broader rebuild. Useful parts of the current system can be retained when that is the better decision.",
  },
  {
    question: "Do you build AI automation solutions?",
    answer:
      "Yes. We design bounded automation for workflows such as enquiry handling, classification, CRM updates, drafting, notifications, and internal knowledge tasks. Appropriate safeguards, permissions, review steps, and failure handling are defined according to the workflow's risk.",
  },
  {
    question: "Can you develop custom SaaS platforms?",
    answer:
      "Yes. We can design and build SaaS foundations including account structures, dashboards, subscriptions, permissions, application workflows, APIs, and data models. Architecture is selected around the product requirements instead of assuming every platform needs the same feature set.",
  },
  {
    question: "Will my website work on mobile devices?",
    answer:
      "Responsive behavior is included in our design and development process. We plan layouts for compact mobile screens through larger displays, review touch targets and content flow, and test agreed browser and device ranges before launch.",
  },
  {
    question: "Do you provide maintenance after launch?",
    answer:
      "Post-launch support can include monitoring, dependency and security updates, performance reviews, issue resolution, content assistance, and planned feature improvements. The exact support arrangement is defined around the system and the level of ongoing involvement required.",
  },
  {
    question: "Can you integrate third-party APIs?",
    answer:
      "Yes. We build integrations for services such as payments, CRM platforms, email, scheduling, storage, analytics, and other business tools. Feasibility depends on the provider's API, authentication model, usage limits, data rules, and available permissions.",
  },
  {
    question: "How do you handle project communication?",
    answer:
      "We establish a clear communication rhythm, decision owners, review points, and a shared view of progress at the beginning of the engagement. Updates cover completed work, upcoming priorities, open questions, dependencies, and decisions that need client input.",
  },
  {
    question: "Can you improve website performance and SEO?",
    answer:
      "We can audit and improve technical areas such as rendering, asset delivery, code weight, metadata, semantic structure, crawlability, and Core Web Vitals. Search visibility also depends on content, competition, authority, and ongoing strategy, so rankings are never guaranteed.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "Our common stack includes Next.js, React, TypeScript, Node.js, PostgreSQL, Prisma, Docker, Cloudinary, and appropriate AI services. We select technologies for product fit, maintainability, security, team needs, and deployment constraints rather than using every tool on every project.",
  },
  {
    question: "How do I get started?",
    answer:
      "Start by sharing your business goal, current challenge, intended users, and any systems already involved. An initial consultation helps us clarify the problem, identify useful next steps, and determine whether discovery, an audit, or a defined project is the right starting point.",
  },
] as const;

const trustIndicators: readonly TrustIndicator[] = [
  {
    title: "Transparent communication",
    description: "Clear progress, decisions, and dependencies.",
    icon: MessageSquareText,
  },
  {
    title: "Structured development",
    description: "Defined stages from discovery through support.",
    icon: Route,
  },
  {
    title: "Modern technologies",
    description: "Tools selected for fit and maintainability.",
    icon: Code2,
  },
  {
    title: "Long-term support",
    description: "Options for maintenance and measured iteration.",
    icon: Headphones,
  },
  {
    title: "Accessible design",
    description: "Semantics, focus, contrast, and motion considered.",
    icon: Accessibility,
  },
  {
    title: "Performance focused",
    description: "Loading and runtime behavior reviewed as product quality.",
    icon: Gauge,
  },
] as const;

function FaqAccordion() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="faq-1"
      className="order-1 space-y-3 lg:order-2"
    >
      {faqItems.map((item, index) => (
        <AccordionItem
          key={item.question}
          value={`faq-${index + 1}`}
          className={cn(
            "overflow-hidden rounded-xl border bg-card/75 px-5 sm:px-6",
            styles.faqItem,
          )}
        >
          <AccordionTrigger className="group min-h-20 gap-4 py-5 text-left text-base font-semibold leading-snug hover:no-underline sm:text-lg">
            <span className="flex min-w-0 items-start gap-4 pr-2">
              <span
                className={cn(
                  "relative grid size-9 shrink-0 place-items-center rounded-lg border bg-background font-mono text-[0.65rem] text-muted-foreground shadow-xs transition-colors duration-normal group-hover:bg-primary group-hover:text-primary-foreground",
                  styles.faqNumber,
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="pt-1.5">{item.question}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="pl-[3.25rem] pr-2 sm:pl-[3.75rem]">
            <p className="max-w-3xl border-t pb-2 pt-5 text-sm leading-7 text-muted-foreground sm:text-base">
              {item.answer}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function TrustRail() {
  return (
    <div aria-labelledby="faq-trust-heading">
      <h3 id="faq-trust-heading" className="sr-only">
        How we approach project delivery
      </h3>
      <Stagger className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {trustIndicators.map(({ title, description, icon: Icon }) => (
          <StaggerItem key={title} className="h-full bg-background">
            <div className="h-full p-5 transition-colors duration-normal hover:bg-muted/45">
              <Icon className="size-4" aria-hidden="true" />
              <h4 className="mt-4 text-sm font-semibold tracking-tight">
                {title}
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

function QuickContactPanel() {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-6 text-primary-foreground shadow-elevated sm:p-8",
        styles.contactPanel,
      )}
    >
      <Eyebrow className="mb-3 text-xs text-primary-foreground/55">
        A direct next step
      </Eyebrow>
      <h3 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
        Still Have Questions?
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70 sm:text-base">
        Our team is happy to discuss your goals and recommend the right
        solution.
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
        <Button
          asChild
          size="lg"
          variant="secondary"
          className="group h-12 flex-1 rounded-lg px-5"
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
          className="h-12 flex-1 rounded-lg border-primary-foreground/25 bg-transparent px-5 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
        >
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  );
}

function FaqShowcaseSection() {
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  } as const;

  return (
    <section
      aria-labelledby="faq-showcase-heading"
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
            <Eyebrow className="mb-4 text-xs">
              Frequently Asked Questions
            </Eyebrow>
            <h2
              id="faq-showcase-heading"
              className="text-balance text-headline font-bold"
            >
              Answers Before We Start Building
            </h2>
            <p className="mt-5 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
              Whether you&apos;re planning a new website, AI automation, or
              custom software, here are answers to common questions about our
              process and services.
            </p>
          </div>
        </Fade>
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start lg:gap-10 xl:grid-cols-[0.62fr_1.38fr] xl:gap-14">
          <Fade className="order-2 lg:sticky lg:top-32 lg:order-1">
            <QuickContactPanel />
          </Fade>
          <FaqAccordion />
        </div>
        <div className="mt-12 sm:mt-14">
          <TrustRail />
        </div>
      </Container>
      <StructuredData data={faqStructuredData} />
    </section>
  );
}

export { FaqShowcaseSection };
