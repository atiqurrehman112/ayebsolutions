import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { StructuredData } from "@/components/seo/structured-data";
import { SiteBreadcrumbs } from "@/components/shell/breadcrumbs";
import { Button } from "@/components/ui/button";
import { company } from "@/config/company";
const title = "Frequently Asked Questions";
const description =
  "Clear answers about Ayeb Solutions services, delivery process, technology, maintenance, and project planning.";
const faqs = [
  [
    "What does Ayeb Solutions build?",
    "We design and build websites, web applications, SaaS platforms, AI-assisted automations, interfaces, integrations, and maintainable internal tools.",
  ],
  [
    "How does a project begin?",
    "Work begins with discovery: understanding the business problem, users, workflow, constraints, dependencies, and desired direction before recommending scope.",
  ],
  [
    "How long does development take?",
    "Timing depends on scope, integrations, content readiness, review cycles, technical risk, and deployment requirements. A schedule is defined after discovery.",
  ],
  [
    "Can you improve an existing product?",
    "Yes. Existing products can be assessed for usability, accessibility, performance, architecture, integrations, and maintainability before changes are planned.",
  ],
  [
    "Do you build AI automation?",
    "Yes. Automation work can include workflow mapping, AI-assisted decisions, integrations, human approval, exception handling, and operational monitoring.",
  ],
  [
    "Will the website work on mobile devices?",
    "Responsive behavior is considered across supported viewport sizes and input methods, with the final browser and device scope agreed for each project.",
  ],
  [
    "Do you provide support after launch?",
    "Maintenance can include monitoring, dependency updates, security reviews, performance improvements, bug fixes, and planned enhancements based on the agreed support scope.",
  ],
  [
    "Can you connect third-party tools?",
    "Where an appropriate API and permissions exist, integrations can connect payment, CRM, email, analytics, storage, and other business systems.",
  ],
  [
    "How is communication handled?",
    "The process emphasizes clear decisions, assumptions, constraints, progress updates, review points, and written documentation appropriate to the project.",
  ],
  [
    "What technologies do you use?",
    "Technology is selected for the project context. Common tools include Next.js, React, TypeScript, Node.js, PostgreSQL, Docker, and appropriate managed services.",
  ],
  [
    "Is accessibility included?",
    "Accessibility is considered through semantics, keyboard behavior, focus visibility, contrast, motion, labels, validation, and assistive-technology review appropriate to scope.",
  ],
  [
    "How do I get started?",
    "Share the problem you are trying to solve, relevant users, existing systems, constraints, and priorities through the contact page.",
  ],
] as const;
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/faq" },
  openGraph: {
    type: "website",
    url: "/faq",
    title,
    description,
    siteName: company.name,
  },
  twitter: { card: "summary", title, description },
};
export default function FaqRoute() {
  return (
    <>
      <section className="border-b py-20 sm:py-28">
        <Container size="reading">
          <SiteBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "FAQ", href: "/faq" },
            ]}
          />
          <Eyebrow className="mt-14">Frequently Asked Questions</Eyebrow>
          <h1 className="mt-5 text-balance text-5xl font-bold tracking-tight sm:text-7xl">
            Answers before we start building.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {description}
          </p>
        </Container>
      </section>
      <section className="border-b py-16 sm:py-24">
        <Container size="reading">
          <div className="space-y-3">
            {faqs.map(([question, answer]) => (
              <details
                key={question}
                className="group rounded-xl border bg-card p-5"
              >
                <summary className="cursor-pointer list-none pr-8 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {question}
                </summary>
                <p className="mt-4 leading-7 text-muted-foreground">{answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-12 rounded-2xl border bg-muted/20 p-8">
            <h2 className="text-2xl font-bold">
              Still have a project question?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Share the context and we’ll help identify a useful next step.
            </p>
            <Button asChild className="mt-6">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
        </Container>
      </section>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map(([name, text]) => ({
            "@type": "Question",
            name,
            acceptedAnswer: { "@type": "Answer", text },
          })),
        }}
      />
    </>
  );
}
