import Link from "next/link";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { CmsMedia } from "@/components/media/cms-media";
import { CTALayout } from "@/components/layout/templates";
import { StructuredData } from "@/components/seo/structured-data";
import { SiteBreadcrumbs } from "@/components/shell/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import type { PublicServiceContext } from "@/lib/database/repositories/services-repository";
import type { ServiceRow } from "@/types/database";
import { serviceIcon } from "./services-page";
import styles from "./service-detail-page.module.css";

interface Props {
  readonly context: PublicServiceContext;
  readonly related: readonly ServiceRow[];
  readonly service: ServiceRow;
  readonly siteName: string;
  readonly siteUrl: string;
}
interface Faq {
  readonly answer: string;
  readonly question: string;
}
interface Step {
  readonly description?: string;
  readonly title: string;
}
function faqs(value: ServiceRow["faq"]): readonly Faq[] {
  return Array.isArray(value)
    ? value.filter((item): item is Faq =>
        Boolean(
          item &&
          typeof item === "object" &&
          "question" in item &&
          "answer" in item &&
          typeof item.question === "string" &&
          typeof item.answer === "string",
        ),
      )
    : [];
}
function steps(value: ServiceRow["process"]): readonly Step[] {
  return Array.isArray(value)
    ? value.flatMap((item) =>
        item &&
        typeof item === "object" &&
        "title" in item &&
        typeof item.title === "string"
          ? [
              {
                title: item.title,
                description:
                  "description" in item && typeof item.description === "string"
                    ? item.description
                    : undefined,
              },
            ]
          : [],
      )
    : [];
}

export function ServiceDetailPage({
  context,
  related,
  service,
  siteName,
  siteUrl,
}: Props) {
  const Icon = serviceIcon(service.icon);
  const faqItems = faqs(service.faq);
  const workflow = steps(service.process);
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
    serviceType: context.category?.name ?? service.title,
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
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  } as const;
  const groups = [
    { id: "benefits", label: "Benefits", items: service.benefits },
    { id: "deliverables", label: "Deliverables", items: service.deliverables },
  ].filter((group) => group.items.length);
  return (
    <>
      <section
        className={`${styles.hero} relative overflow-hidden border-b py-16 sm:py-24`}
      >
        <Container className="relative z-10 max-w-[100rem]">
          <SiteBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.title, href: `/services/${service.slug}` },
            ]}
          />
          <div className="mt-14 max-w-5xl">
            <span className={styles.icon}>
              <Icon className="size-7" aria-hidden="true" />
            </span>
            <div className="mt-6 flex flex-wrap gap-2">
              {context.category ? <Badge>{context.category.name}</Badge> : null}
              {service.is_featured ? (
                <Badge variant="outline">Featured</Badge>
              ) : null}
            </div>
            <h1 className="mt-6 text-balance text-[clamp(2.8rem,7vw,6.5rem)] font-bold leading-[.94] tracking-[-.055em]">
              {service.title}
            </h1>
            {service.subtitle ? (
              <p className="mt-6 max-w-3xl text-xl font-medium leading-8">
                {service.subtitle}
              </p>
            ) : null}
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              {service.description}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">
                  Book consultation{" "}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/portfolio">View portfolio</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
      {service.features.length ? (
        <section
          className="border-b py-16 sm:py-24"
          aria-labelledby="features-heading"
        >
          <Container className="max-w-[100rem]">
            <Eyebrow>Capabilities</Eyebrow>
            <h2 id="features-heading" className="mt-4 text-headline font-bold">
              What this service can include.
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {service.features.map((feature) => (
                <article
                  key={feature}
                  className={`${styles.feature} rounded-2xl border bg-card p-6`}
                >
                  <Check className="size-5" aria-hidden="true" />
                  <h3 className="mt-5 text-lg font-semibold">{feature}</h3>
                </article>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
      {service.technologies.length ? (
        <section
          className="border-b bg-muted/[0.12] py-16"
          aria-labelledby="technology-heading"
        >
          <Container className="max-w-[100rem]">
            <Eyebrow>Technology</Eyebrow>
            <h2
              id="technology-heading"
              className="mt-4 text-headline font-bold"
            >
              Tools selected for the work.
            </h2>
            <ul className="mt-9 flex flex-wrap gap-3">
              {service.technologies.map((item) => (
                <li key={item}>
                  <Badge variant="outline" className="px-4 py-2">
                    {item}
                  </Badge>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
      {groups.map((group) => (
        <section
          key={group.id}
          className="border-b py-16 sm:py-24"
          aria-labelledby={`${group.id}-heading`}
        >
          <Container className="max-w-[100rem]">
            <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr]">
              <div>
                <Eyebrow>{group.label}</Eyebrow>
                <h2
                  id={`${group.id}-heading`}
                  className="mt-4 text-headline font-bold"
                >
                  {group.label} defined by the CMS.
                </h2>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border bg-card p-5"
                  >
                    <Check
                      className="mt-1 size-4 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      ))}
      {workflow.length ? (
        <section
          className="border-b py-16 sm:py-24"
          aria-labelledby="process-heading"
        >
          <Container className="max-w-[100rem]">
            <Eyebrow>Process</Eyebrow>
            <h2 id="process-heading" className="mt-4 text-headline font-bold">
              A visible path through delivery.
            </h2>
            <ol className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {workflow.map((step, index) => (
                <li
                  key={`${step.title}-${index}`}
                  className="rounded-2xl border bg-card p-6"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
                  {step.description ? (
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {step.description}
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          </Container>
        </section>
      ) : null}
      {context.gallery.length ? (
        <section
          className="border-b py-16 sm:py-24"
          aria-labelledby="gallery-heading"
        >
          <Container className="max-w-[100rem]">
            <Eyebrow>Service gallery</Eyebrow>
            <h2 id="gallery-heading" className="mt-4 text-headline font-bold">
              Supporting visual context.
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {context.gallery.map((item) => (
                <figure key={item.id} className={styles.gallery}>
                  <CmsMedia
                    media={item}
                    alt={item.alt ?? item.caption ?? service.title}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {item.caption ? (
                    <figcaption className="border-t p-4 text-sm text-muted-foreground">
                      {item.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
      {faqItems.length ? (
        <section
          className="border-b py-16 sm:py-24"
          aria-labelledby="faq-heading"
        >
          <Container size="content">
            <Eyebrow>Service FAQ</Eyebrow>
            <h2 id="faq-heading" className="mt-4 text-headline font-bold">
              Questions about {service.title}.
            </h2>
            <div className="mt-10 space-y-3">
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  className={`${styles.disclosure} group rounded-xl border bg-card px-5`}
                >
                  <summary className="focus-ring flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                    {item.question}
                    <ChevronDown
                      className="size-4 shrink-0 transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="border-t pb-6 pt-5 leading-7 text-muted-foreground">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
      {related.length ? (
        <section
          className="border-b py-16 sm:py-24"
          aria-labelledby="related-heading"
        >
          <Container className="max-w-[100rem]">
            <Eyebrow>Related services</Eyebrow>
            <h2 id="related-heading" className="mt-4 text-headline font-bold">
              Continue exploring.
            </h2>
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/services/${item.slug}`}
                  className={`${styles.feature} focus-ring rounded-2xl border bg-card p-6`}
                >
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">
                    {item.summary}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                    Explore <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
      <CTALayout
        eyebrow={
          <Eyebrow className="mb-3 text-xs text-primary-foreground/55">
            Next step
          </Eyebrow>
        }
        title={`Discuss ${service.title}`}
        description={
          <p className="max-w-2xl text-primary-foreground/70">
            Start with your goals, users, constraints, and existing systems. We
            will help frame an appropriate discovery path.
          </p>
        }
        actions={
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">
              Start a conversation{" "}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        }
        className={styles.finalCta}
      />
      <StructuredData data={breadcrumb} />
      <StructuredData data={serviceSchema} />
      <StructuredData data={webPage} />
      {faqItems.length ? <StructuredData data={faqSchema} /> : null}
    </>
  );
}
