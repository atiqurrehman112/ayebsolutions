import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronDown,
  CircleHelp,
  Clock3,
  Code2,
  FileSearch,
  Mail,
  Palette,
  Search,
  Send,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/cards/card";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { CTALayout } from "@/components/layout/templates";
import { StructuredData } from "@/components/seo/structured-data";
import { SiteBreadcrumbs } from "@/components/shell/breadcrumbs";
import { Button } from "@/components/ui/button";
import { company } from "@/config/company";
import { cn } from "@/lib/utils";
import { ContactForm } from "./contact-form";
import styles from "./contact-page.module.css";

interface IconItem {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

interface ContactMethod extends IconItem {
  readonly action: string;
  readonly href?: string;
}

const contactMethods: readonly ContactMethod[] = [
  {
    title: "Email",
    description:
      "Use email when you already have a written brief, technical context, or supporting questions to share.",
    action: company.email,
    href: `mailto:${company.email}`,
    icon: Mail,
  },
  {
    title: "Project Inquiry",
    description:
      "Use the secure inquiry form below to share the project type, context, interests, and constraints.",
    action: "Prepare project details",
    href: "#contact-form",
    icon: BriefcaseBusiness,
  },
  {
    title: "Business Hours",
    description:
      "Working sessions and availability are confirmed for each conversation rather than presented as universal office hours.",
    action: "Scheduled by agreement",
    icon: Clock3,
  },
  {
    title: "Response Process",
    description:
      "We review the problem, scope, dependencies, constraints, and fit before recommending a useful next step.",
    action: "Timing depends on availability",
    icon: FileSearch,
  },
] as const;

const timeline: readonly IconItem[] = [
  {
    title: "Discovery",
    description:
      "Clarify the problem, users, current workflow, evidence, and constraints.",
    icon: Search,
  },
  {
    title: "Planning",
    description:
      "Define scope, decisions, risks, architecture questions, and responsibilities.",
    icon: Workflow,
  },
  {
    title: "Design",
    description:
      "Shape information, user flows, states, accessibility, and responsive behavior.",
    icon: Palette,
  },
  {
    title: "Development",
    description:
      "Build typed interfaces, product logic, data, and approved integrations.",
    icon: Code2,
  },
  {
    title: "Launch",
    description:
      "Deploy through controlled environments and verify production behavior.",
    icon: Send,
  },
  {
    title: "Ongoing Support",
    description:
      "Maintain context through documentation, monitoring, review, and planned change.",
    icon: Wrench,
  },
] as const;

const contactFaqs = [
  {
    question: "What information should I include in a project inquiry?",
    answer:
      "Describe the business problem, affected users, current workflow, desired change, known constraints, existing systems, relevant dates, and who will make project decisions. A polished technical specification is not required to begin discovery.",
  },
  {
    question: "Does submitting the form on this page send my information?",
    answer:
      "Yes. After server-side validation and anti-spam checks, the inquiry is stored in our lead-management system. A confirmation email is attempted separately, so a temporary email-provider issue will not discard a saved inquiry.",
  },
  {
    question: "How quickly will Ayeb Solutions respond?",
    answer:
      "Response timing depends on current availability, the information provided, and the type of request. This page does not promise a fixed response time. Any time-sensitive constraint should be stated clearly in your email or consultation request.",
  },
  {
    question: "Do I need to know which service I need?",
    answer:
      "No. Start with the problem and current process. Discovery can help distinguish whether the next step involves a website, custom software, design, integration, automation, maintenance, or a simpler non-development option.",
  },
  {
    question: "Can I contact Ayeb Solutions about an early-stage idea?",
    answer:
      "Yes. Early conversations can focus on users, assumptions, risks, scope, and the smallest useful way to test the idea. An idea is not automatically a reason to build a full custom product.",
  },
  {
    question: "Can you review an existing website or application?",
    answer:
      "Potentially. Useful context includes repository access, technology stack, hosting, analytics or monitoring evidence, known issues, business priorities, and relevant constraints. Review scope should be agreed before any changes are made.",
  },
  {
    question: "What happens during the first consultation?",
    answer:
      "The conversation typically clarifies the problem, users, current state, dependencies, constraints, decision process, and what a useful next step should accomplish. It is not a promise that every inquiry becomes an engagement.",
  },
  {
    question: "Do you provide fixed project prices on the contact page?",
    answer:
      "No. Scope, complexity, research, integrations, content, risk, timeline constraints, and operating requirements affect planning. Budget context can help shape options, but this page does not publish or fabricate packages or quotes.",
  },
  {
    question: "What if my project has a target date?",
    answer:
      "Share the date, why it matters, what must be available by then, and which dependencies are outside your control. Feasibility can only be assessed after scope and constraints are understood; a target date is not automatically a delivery commitment.",
  },
  {
    question: "Can you work with our existing internal team?",
    answer:
      "Potentially. Collaboration works best when ownership, decision rights, communication, technical boundaries, review responsibilities, and handoff expectations are explicit. Relevant team context should be included during discovery.",
  },
  {
    question: "How do you handle confidential project information?",
    answer:
      "Do not place secrets, credentials, regulated records, or unnecessary personal data into the form. Confidentiality, access, retention, and approved communication channels should be agreed before sensitive information is exchanged.",
  },
  {
    question: "Can you take over an unfinished project?",
    answer:
      "An inherited project may be supportable after reviewing source code, dependencies, environments, documentation, access, known defects, ownership, and delivery expectations. An assessment may identify stabilization work before feature development continues.",
  },
  {
    question: "Do you offer ongoing maintenance after launch?",
    answer:
      "Maintenance and support can be scoped around updates, monitoring, defects, performance, documentation, backups, and planned improvements. Coverage, availability, and response expectations must be defined for the actual engagement.",
  },
  {
    question: "Will my inquiry be accepted as a project?",
    answer:
      "Not automatically. Both sides should assess goals, scope, timing, capability, availability, communication expectations, and whether the proposed solution is responsible and useful. We avoid implying guaranteed acceptance.",
  },
  {
    question: "What is the best way to contact Ayeb Solutions today?",
    answer: `Use the secure project inquiry form, email ${company.email}, or follow the Book Consultation link. The form validates and stores inquiries before attempting confirmation and notification emails.`,
  },
] as const;

function SectionIntroduction({
  eyebrow,
  id,
  title,
  description,
}: {
  readonly eyebrow: string;
  readonly id: string;
  readonly title: string;
  readonly description: string;
}) {
  return (
    <div className="max-w-3xl">
      <Eyebrow className="mb-4 text-xs">{eyebrow}</Eyebrow>
      <h2 id={id} className="text-balance text-headline font-bold">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function InquiryVisual() {
  return (
    <div
      className={cn(
        "relative rounded-2xl border p-4 sm:p-6",
        styles.inquiryVisual,
      )}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between border-b pb-4">
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
          project / brief
        </span>
        <span className="rounded-full border px-3 py-1 text-[0.55rem] font-medium">
          Start with context
        </span>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border bg-background p-4 sm:col-span-2">
          <span className="block h-2 w-24 rounded bg-foreground/15" />
          <span className="mt-4 block h-16 rounded-lg bg-muted/50" />
        </div>
        {["Problem", "Users", "Constraints", "Outcome"].map((label, index) => (
          <div key={label} className="rounded-xl border bg-background p-4">
            <div className="flex items-center justify-between">
              <span className="text-[0.58rem] font-semibold">{label}</span>
              <span
                className={cn(
                  "size-2 rounded-full",
                  index === 0 ? "bg-primary" : "bg-foreground/15",
                )}
              />
            </div>
            <span className="mt-4 block h-1.5 w-full rounded bg-foreground/10" />
            <span className="mt-2 block h-1.5 w-2/3 rounded bg-foreground/10" />
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl border bg-muted/30 px-4 py-3 text-[0.58rem]">
        <span>Discovery input</span>
        <span className="font-mono text-muted-foreground">
          review / clarify
        </span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section
      aria-labelledby="contact-title"
      className={cn(
        "relative overflow-hidden border-b py-16 sm:py-20 lg:py-28",
        styles.hero,
      )}
    >
      <Container className="relative z-10 max-w-[100rem]">
        <SiteBreadcrumbs items={[{ label: "Contact", href: "/contact" }]} />
        <div className="mt-12 grid min-w-0 items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="min-w-0">
            <Eyebrow className="mb-5 text-xs">Contact Ayeb Solutions</Eyebrow>
            <h1
              id="contact-title"
              className="text-balance text-display font-bold"
            >
              Let&apos;s Build Something Great
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Tell us about your project. We&apos;ll review your requirements
              and recommend an appropriate approach based on the problem,
              constraints, and available context.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="group h-12">
                <Link href="#contact-form">
                  Start a Project
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12">
                <Link href="/book-consultation">Book Consultation</Link>
              </Button>
            </div>
            <p className="mt-9 border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">
              No phone number, office address, fixed business hours, or
              guaranteed response time is claimed on this page.
            </p>
          </div>
          <div className="min-w-0">
            <InquiryVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}

function ContactMethodsSection() {
  return (
    <section
      aria-labelledby="contact-methods-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <SectionIntroduction
          eyebrow="Contact methods"
          id="contact-methods-heading"
          title="Choose the clearest path for your current context."
          description="Use a real contact channel for an inquiry, or review how project information will be structured when lead capture is connected in a later sprint."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {contactMethods.map(
            ({ title, description, action, href, icon: Icon }) => (
              <Card
                key={title}
                className={cn("flex h-full flex-col p-6", styles.methodCard)}
              >
                <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-7 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
                <div className="mt-auto pt-7">
                  {href ? (
                    <Link
                      href={href}
                      className="focus-ring group inline-flex rounded-md text-sm font-semibold"
                    >
                      {action}
                      <ArrowRight
                        className="ml-2 size-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  ) : (
                    <p className="text-sm font-semibold">{action}</p>
                  )}
                </div>
              </Card>
            ),
          )}
        </div>
      </Container>
    </section>
  );
}

function ContactFormSection() {
  return (
    <section
      id="contact-form"
      aria-labelledby="contact-form-heading"
      className="scroll-mt-28 border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div>
            <SectionIntroduction
              eyebrow="Project inquiry"
              id="contact-form-heading"
              title="Organize the context before the first conversation."
              description="Share the project context that will help us review your needs and recommend an appropriate next step."
            />
            <div
              id="form-privacy-note"
              className="mt-8 rounded-xl border bg-card p-5"
              role="note"
            >
              <div className="flex items-start gap-3">
                <CircleHelp
                  className="mt-0.5 size-5 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-semibold">
                    Your context stays purposeful
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Submissions are stored securely in our lead-management
                    system and used to review and respond to your inquiry. Do
                    not include credentials, payment data, or sensitive records.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </Container>
    </section>
  );
}

function TimelineSection() {
  return (
    <section
      aria-labelledby="project-timeline-heading"
      className={cn(
        "border-b py-20 text-primary-foreground sm:py-24 lg:py-30",
        styles.timeline,
      )}
    >
      <Container className="max-w-[100rem]">
        <div className="max-w-3xl">
          <Eyebrow className="mb-4 text-xs text-primary-foreground/55">
            Project timeline
          </Eyebrow>
          <h2
            id="project-timeline-heading"
            className="text-balance text-headline font-bold"
          >
            A visible path from first context to ongoing care.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-primary-foreground/65">
            These stages explain the delivery journey, not a fixed duration.
            Scope, research, dependencies, approvals, and complexity affect the
            actual plan.
          </p>
        </div>
        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {timeline.map(({ title, description, icon: Icon }, index) => (
            <li
              key={title}
              className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/[0.06] p-5"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-primary-foreground text-primary">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="mt-6 block font-mono text-[0.55rem] text-primary-foreground/45">
                STAGE {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-semibold">{title}</h3>
              <p className="text-primary-foreground/58 mt-2 text-xs leading-6">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function FaqSection() {
  return (
    <section
      aria-labelledby="contact-faq-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container size="content">
        <SectionIntroduction
          eyebrow="Contact FAQ"
          id="contact-faq-heading"
          title="Answers before you start the conversation."
          description="These questions explain inquiry handling, project context, consultation, timing, confidentiality, inherited projects, and ongoing support."
        />
        <div className="mt-12 space-y-3">
          {contactFaqs.map(({ question, answer }, index) => (
            <details
              key={question}
              className={cn(
                "group overflow-hidden rounded-xl border bg-card px-5 sm:px-6",
                styles.disclosure,
              )}
              open={index === 0}
            >
              <summary className="focus-ring flex min-h-20 cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-5 text-left text-base font-semibold sm:text-lg">
                <span className="flex items-start gap-4 pr-3">
                  <span className="font-mono text-[0.62rem] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {question}
                </span>
                <ChevronDown
                  className="size-4 shrink-0 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="ml-8 border-t pb-6 pt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ContactPage() {
  const pageUrl = new URL("/contact", company.url).toString();
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Ayeb Solutions",
    description:
      "Contact Ayeb Solutions about web development, custom software, AI automation, design, integration, or maintenance.",
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: company.name, url: company.url },
    about: {
      "@type": "Organization",
      name: company.name,
      url: company.url,
      email: company.email,
    },
  } as const;
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Contact Ayeb Solutions",
    description:
      "Share project context with Ayeb Solutions and explore an appropriate consultation path.",
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: company.name, url: company.url },
  } as const;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: contactFaqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  } as const;

  return (
    <>
      <Hero />
      <ContactMethodsSection />
      <ContactFormSection />
      <TimelineSection />
      <FaqSection />
      <CTALayout
        eyebrow={
          <Eyebrow className="mb-3 text-xs text-primary-foreground/55">
            Choose a real contact path
          </Eyebrow>
        }
        title="Ready to discuss your project with Ayeb Solutions?"
        description={
          <p className="max-w-2xl leading-relaxed text-primary-foreground/70">
            Send a secure project inquiry, use email for a written conversation,
            or book a consultation when you are ready to discuss the next step.
          </p>
        }
        actions={
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary">
              <a href={`mailto:${company.email}`}>
                Email Ayeb Solutions
                <Mail className="size-4" aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/book-consultation">Book Consultation</Link>
            </Button>
          </div>
        }
        className={styles.finalCta}
      />
      <StructuredData data={contactPageSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={faqSchema} />
    </>
  );
}

export { ContactPage };
