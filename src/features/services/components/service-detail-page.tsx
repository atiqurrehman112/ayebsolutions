import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronDown,
  Layers3,
  Sparkles,
} from "lucide-react";

import { Container, Eyebrow } from "@/components/layout/primitives";
import { CTALayout } from "@/components/layout/templates";
import { CmsMedia } from "@/components/media/cms-media";
import { StructuredData } from "@/components/seo/structured-data";
import { SiteBreadcrumbs } from "@/components/shell/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import type { PublicPortfolioProject } from "@/lib/database/repositories/portfolio-repository";
import { cn } from "@/lib/utils";
import type { ServiceRow } from "@/types/database";

import type { ServiceDetailContent } from "../service-detail-content";
import { serviceIcon } from "./services-page";
import styles from "./service-detail-page.module.css";

interface Props {
  readonly content: ServiceDetailContent;
  readonly portfolio: readonly PublicPortfolioProject[];
  readonly related: readonly ServiceRow[];
  readonly service: ServiceRow;
  readonly siteName: string;
  readonly siteUrl: string;
}

function SectionHeading({
  description,
  eyebrow,
  id,
  title,
}: {
  readonly description: string;
  readonly eyebrow: string;
  readonly id: string;
  readonly title: string;
}) {
  return (
    <div className="max-w-3xl">
      <Eyebrow className="text-xs">{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-4 text-balance text-headline font-bold">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-8 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function ServiceVisual({
  labels,
  service,
}: {
  readonly labels: ServiceDetailContent["illustrationLabels"];
  readonly service: ServiceRow;
}) {
  const Icon = serviceIcon(service.icon);
  return (
    <div
      className={cn(
        styles.serviceVisual,
        "relative overflow-hidden rounded-3xl border p-5 sm:p-7",
      )}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between border-b pb-4">
        <span className="font-mono text-[.58rem] uppercase tracking-[.18em] text-muted-foreground">
          service / system
        </span>
        <span className="rounded-full border px-3 py-1 text-[.56rem]">
          Built for context
        </span>
      </div>
      <div className="mt-6 rounded-2xl border bg-primary p-5 text-primary-foreground shadow-elevated sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <span className="grid size-12 place-items-center rounded-2xl bg-primary-foreground text-primary">
            <Icon className="size-5" />
          </span>
          <span className="font-mono text-[.58rem] text-primary-foreground/50">
            CORE 01
          </span>
        </div>
        <p className="mt-12 text-xl font-semibold">{service.title}</p>
        <div className="mt-5 h-px bg-primary-foreground/15" />
        <div className="mt-5 grid grid-cols-3 gap-2">
          {labels.map((label, index) => (
            <span
              key={label}
              className="rounded-lg bg-primary-foreground/[.08] px-2 py-3 text-center text-[.56rem]"
            >
              0{index + 1} · {label}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <span className="rounded-xl border bg-background p-4 text-center text-[.6rem] font-semibold">
          Discover
        </span>
        <ArrowRight className="size-4 text-muted-foreground" />
        <span className="rounded-xl border bg-background p-4 text-center text-[.6rem] font-semibold">
          Deliver
        </span>
      </div>
    </div>
  );
}

export function ServiceDetailPage({
  content,
  portfolio,
  related,
  service,
  siteName,
  siteUrl,
}: Props) {
  const Icon = serviceIcon(service.icon);
  const url = `${siteUrl}/services/${service.slug}`;
  const description = service.meta_description ?? service.summary;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${siteUrl}/services`,
      },
      { "@type": "ListItem", position: 3, name: service.title, item: url },
    ],
  } as const;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description,
    url,
    provider: { "@type": "Organization", name: siteName, url: siteUrl },
    serviceType: service.title,
  } as const;
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: service.meta_title ?? service.title,
    description,
    url,
    isPartOf: { "@type": "WebSite", name: siteName, url: siteUrl },
    mainEntity: { "@type": "Service", name: service.title },
  } as const;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  } as const;

  return (
    <>
      <section
        className={cn(
          styles.hero,
          "relative overflow-hidden border-b py-20 sm:py-28 lg:py-36",
        )}
        aria-labelledby="service-title"
      >
        <Container className="relative z-10 max-w-[100rem]">
          <SiteBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.title, href: `/services/${service.slug}` },
            ]}
          />
          <div className="mt-14 grid gap-14 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:gap-20">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <Eyebrow>{content.badge}</Eyebrow>
              </div>
              <h1
                id="service-title"
                className="mt-7 text-balance text-[clamp(3.2rem,7.5vw,7.2rem)] font-bold leading-[.9] tracking-[-.065em]"
              >
                {service.title}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                {service.summary}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="group h-12">
                  <Link href="/contact#contact-form">
                    Book Consultation
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12">
                  <Link href="#service-overview">Explore the Approach</Link>
                </Button>
              </div>
              <ul
                className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground"
                aria-label="Service principles"
              >
                {[
                  "Business-first discovery",
                  "Production-ready delivery",
                  "Clear ownership",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <BadgeCheck
                      className="size-4 text-primary"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <ServiceVisual
              labels={content.illustrationLabels}
              service={service}
            />
          </div>
        </Container>
      </section>

      <section
        id="service-overview"
        className="scroll-mt-24 border-b py-20 sm:py-24 lg:py-30"
        aria-labelledby="overview-heading"
      >
        <Container className="max-w-[100rem]">
          <div className="grid gap-10 lg:grid-cols-[.68fr_1.32fr] lg:gap-16">
            <div>
              <Eyebrow className="text-xs">Overview</Eyebrow>
              <h2
                id="overview-heading"
                className="mt-4 text-balance text-headline font-bold"
              >
                A service shaped around the operating context.
              </h2>
            </div>
            <div>
              <p className="text-xl leading-9 text-muted-foreground sm:text-2xl">
                {content.overview}
              </p>
              <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-3">
                {["Discover", "Build", "Own"].map((item, index) => (
                  <div key={item} className="bg-card p-5">
                    <span className="font-mono text-[.6rem] text-muted-foreground">
                      0{index + 1}
                    </span>
                    <strong className="mt-2 block">{item}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section
        className="border-b bg-muted/[.12] py-20 sm:py-24 lg:py-30"
        aria-labelledby="benefits-heading"
      >
        <Container className="max-w-[100rem]">
          <SectionHeading
            eyebrow="Business benefits"
            id="benefits-heading"
            title="Value grounded in how the work operates."
            description="These are areas the service is designed to improve. The outcome depends on scope, adoption, existing systems, and business context; no metric is guaranteed."
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {content.benefits.map(
              (
                { title, description: itemDescription, icon: BenefitIcon },
                index,
              ) => (
                <li
                  key={title}
                  className={cn(
                    styles.benefitCard,
                    "rounded-2xl border bg-card p-6",
                  )}
                  style={{ "--delay": `${index * 70}ms` } as CSSProperties}
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl border bg-background">
                      <BenefitIcon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[.6rem] text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-7 text-xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {itemDescription}
                  </p>
                </li>
              ),
            )}
          </ul>
        </Container>
      </section>

      <section
        className="border-b py-20 sm:py-24 lg:py-30"
        aria-labelledby="customers-heading"
      >
        <Container className="max-w-[100rem]">
          <SectionHeading
            eyebrow="Ideal customers"
            id="customers-heading"
            title={`Who ${service.title} is designed to support.`}
            description="Fit depends on the problem, constraints, readiness, and value of a tailored approach—not company size alone."
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {content.idealCustomers.map(
              ({ title, description: itemDescription, icon: CustomerIcon }) => (
                <li
                  key={title}
                  className={cn(
                    styles.customerCard,
                    "rounded-3xl border bg-card p-7 sm:p-8",
                  )}
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
                    <CustomerIcon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-8 text-2xl font-semibold">{title}</h3>
                  <p className="mt-4 leading-7 text-muted-foreground">
                    {itemDescription}
                  </p>
                </li>
              ),
            )}
          </ul>
        </Container>
      </section>

      <section
        className={cn(
          styles.processSection,
          "border-b py-20 text-primary-foreground sm:py-24 lg:py-30",
        )}
        aria-labelledby="process-heading"
      >
        <Container className="max-w-[100rem]">
          <div className="max-w-3xl">
            <Eyebrow className="text-xs text-primary-foreground/55">
              Implementation process
            </Eyebrow>
            <h2
              id="process-heading"
              className="mt-4 text-balance text-headline font-bold"
            >
              A visible path from context to production.
            </h2>
            <p className="mt-5 text-lg leading-8 text-primary-foreground/65">
              The stages create decision points and quality checks. They do not
              imply a universal project duration.
            </p>
          </div>
          <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {content.process.map(
              (
                { title, description: itemDescription, icon: ProcessIcon },
                index,
              ) => (
                <li
                  key={title}
                  className={cn(
                    styles.processStep,
                    "relative rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[.06] p-5",
                  )}
                >
                  <span className="grid size-10 place-items-center rounded-xl bg-primary-foreground text-primary">
                    <ProcessIcon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="mt-7 block font-mono text-[.56rem] text-primary-foreground/45">
                    STAGE {index + 1}
                  </span>
                  <h3 className="mt-2 font-semibold">{title}</h3>
                  <p className="text-primary-foreground/58 mt-3 text-xs leading-6">
                    {itemDescription}
                  </p>
                </li>
              ),
            )}
          </ol>
        </Container>
      </section>

      <section
        className="border-b py-20 sm:py-24 lg:py-30"
        aria-labelledby="technology-heading"
      >
        <Container className="max-w-[100rem]">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
            <SectionHeading
              eyebrow="Technology stack"
              id="technology-heading"
              title="Tools selected for this kind of work."
              description="The final stack follows requirements, integrations, ownership, and risk. These tools are capabilities—not partnerships or mandatory choices."
            />
            <ul className="grid gap-3 sm:grid-cols-2">
              {content.technologies.map(({ name, purpose }) => (
                <li
                  key={name}
                  className={cn(
                    styles.techCard,
                    "flex items-center gap-4 rounded-2xl border bg-card p-4",
                  )}
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-muted">
                    <Layers3 className="size-4" aria-hidden="true" />
                  </span>
                  <span>
                    <strong className="block text-sm">{name}</strong>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {purpose}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section
        className="border-b bg-muted/[.12] py-20 sm:py-24 lg:py-30"
        aria-labelledby="features-heading"
      >
        <Container className="max-w-[100rem]">
          <SectionHeading
            eyebrow="Service features"
            id="features-heading"
            title={`What ${service.title} can include.`}
            description="The final feature set follows the agreed scope. Each capability is presented as an option, not a universal package or promise."
          />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border bg-border md:grid-cols-2 xl:grid-cols-3">
            {content.features.map(
              ({ title, description: itemDescription, icon: FeatureIcon }) => (
                <li
                  key={title}
                  className={cn(styles.featureCard, "bg-card p-7 sm:p-8")}
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-muted">
                    <FeatureIcon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-7 text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {itemDescription}
                  </p>
                </li>
              ),
            )}
          </ul>
        </Container>
      </section>

      <section
        className="border-b py-20 sm:py-24 lg:py-30"
        aria-labelledby="deliverables-heading"
      >
        <Container className="max-w-[100rem]">
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
            <SectionHeading
              eyebrow="Deliverables"
              id="deliverables-heading"
              title="A clear handoff, not a black box."
              description="Exact deliverables are confirmed in scope. This checklist describes the practical outputs commonly considered for this service."
            />
            <ul className="grid gap-3 sm:grid-cols-2">
              {content.deliverables.map((item, index) => (
                <li
                  key={item}
                  className="flex items-start gap-4 rounded-2xl border bg-card p-5"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-4" aria-hidden="true" />
                  </span>
                  <span className="pt-1 text-sm font-medium leading-6">
                    {item}
                  </span>
                  <span className="ml-auto font-mono text-[.56rem] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section
        className="border-b bg-muted/[.12] py-20 sm:py-24 lg:py-30"
        aria-labelledby="portfolio-heading"
      >
        <Container className="max-w-[100rem]">
          <SectionHeading
            eyebrow="Latest portfolio"
            id="portfolio-heading"
            title="Published work from the existing portfolio CMS."
            description="Only real, currently published portfolio records appear here. Their relationship to this service depends on the context available in each project."
          />
          {portfolio.length ? (
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {portfolio.map((project) => (
                <article
                  key={project.id}
                  className={cn(
                    styles.portfolioCard,
                    "group overflow-hidden rounded-2xl border bg-card",
                  )}
                >
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="focus-ring block overflow-hidden"
                    aria-label={`View project: ${project.title}`}
                  >
                    {project.cover ? (
                      <CmsMedia
                        media={project.cover}
                        alt={
                          project.cover.alt ?? `${project.title} project cover`
                        }
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={cn(
                          styles.portfolioMedia,
                          "aspect-[16/10] w-full object-cover",
                        )}
                      />
                    ) : (
                      <span
                        className={cn(
                          styles.portfolioMedia,
                          "grid aspect-[16/10] place-items-center bg-muted",
                        )}
                      >
                        <Sparkles
                          className="size-7 text-muted-foreground"
                          aria-hidden="true"
                        />
                      </span>
                    )}
                  </Link>
                  <div className="p-6">
                    <Badge variant="outline">{project.project_type}</Badge>
                    <h3 className="mt-5 text-xl font-semibold">
                      {project.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">
                      {project.summary}
                    </p>
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="focus-ring mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold"
                    >
                      View project
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-3xl border border-dashed bg-card px-6 py-14 text-center">
              <Sparkles
                className="mx-auto size-8 text-muted-foreground"
                aria-hidden="true"
              />
              <h3 className="mt-5 text-2xl font-semibold">
                No published projects are available.
              </h3>
              <p className="mx-auto mt-3 max-w-xl leading-7 text-muted-foreground">
                The portfolio CMS did not return a published record for this
                preview. No project, client, or outcome has been fabricated.
              </p>
              <Button asChild variant="outline" className="mt-7">
                <Link href="/portfolio">Visit Portfolio</Link>
              </Button>
            </div>
          )}
        </Container>
      </section>

      <section
        className="border-b py-20 sm:py-24 lg:py-30"
        aria-labelledby="faq-heading"
      >
        <Container size="content">
          <SectionHeading
            eyebrow="Service FAQ"
            id="faq-heading"
            title={`Questions about ${service.title}.`}
            description="Practical answers about fit, planning, implementation, risk, ownership, and support."
          />
          <div className="mt-12 space-y-3">
            {content.faqs.map(({ question, answer }, index) => (
              <details
                key={question}
                className={cn(
                  styles.disclosure,
                  "group overflow-hidden rounded-2xl border bg-card px-5 sm:px-6",
                )}
                open={index === 0}
              >
                <summary className="focus-ring flex min-h-20 cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-5 font-semibold sm:text-lg">
                  <span className="flex items-start gap-4">
                    <span className="font-mono text-[.62rem] text-muted-foreground">
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

      <section
        className="border-b bg-muted/[.12] py-20 sm:py-24 lg:py-30"
        aria-labelledby="related-heading"
      >
        <Container className="max-w-[100rem]">
          <SectionHeading
            eyebrow="Related services"
            id="related-heading"
            title="Connect the capabilities around the problem."
            description="Explore complementary service areas. The right engagement may combine disciplines, but only where the business context requires them."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {related.map((item, index) => {
              const RelatedIcon = serviceIcon(item.icon);
              return (
                <Link
                  key={item.id}
                  href={`/services/${item.slug}`}
                  className={cn(
                    styles.relatedCard,
                    "focus-ring group rounded-2xl border bg-card p-6",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl bg-muted">
                      <RelatedIcon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[.6rem] text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-7 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">
                    {item.summary}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                    Explore service
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <CTALayout
        eyebrow={
          <Eyebrow className="mb-3 text-xs text-primary-foreground/55">
            Build the right next step
          </Eyebrow>
        }
        title={`Ready to discuss ${service.title}?`}
        description={
          <p className="max-w-2xl leading-relaxed text-primary-foreground/70">
            Bring the goal, current workflow, users, systems, and constraints.
            We’ll help frame an appropriate discovery and proposal path.
          </p>
        }
        actions={
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact#contact-form">
                Request Proposal
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/contact">Discuss Your Project</Link>
            </Button>
          </div>
        }
        className={styles.finalCta}
      />
      <StructuredData data={breadcrumb} />
      <StructuredData data={serviceSchema} />
      <StructuredData data={webPage} />
      <StructuredData data={faqSchema} />
    </>
  );
}
