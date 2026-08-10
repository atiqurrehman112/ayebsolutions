import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Sparkles } from "lucide-react";
import { Card } from "@/components/cards/card";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { CTALayout } from "@/components/layout/templates";
import { StructuredData } from "@/components/seo/structured-data";
import { SiteBreadcrumbs } from "@/components/shell/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import type { MediaLibraryRow, PortfolioProjectRow } from "@/types/database";
import styles from "./portfolio-project-page.module.css";

interface Named {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
}
interface GalleryItem extends MediaLibraryRow {
  readonly caption: string | null;
  readonly sort_order: number;
}
export interface PortfolioProjectPageProps {
  readonly category: Named | null;
  readonly gallery: readonly GalleryItem[];
  readonly project: PortfolioProjectRow;
  readonly related: readonly PortfolioProjectRow[];
  readonly siteName: string;
  readonly siteUrl: string;
  readonly tags: readonly Named[];
}
interface FaqItem {
  readonly answer: string;
  readonly question: string;
}
function strings(value: PortfolioProjectRow["features"]) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}
function faqs(value: PortfolioProjectRow["faq"]): readonly FaqItem[] {
  return Array.isArray(value)
    ? value.filter((item): item is FaqItem =>
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
function body(project: PortfolioProjectRow) {
  const value = project.content;
  return value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    "body" in value &&
    typeof value.body === "string"
    ? value.body
    : null;
}
export function PortfolioProjectPage({
  category,
  gallery,
  project,
  related,
  siteName,
  siteUrl,
  tags,
}: PortfolioProjectPageProps) {
  const faqItems = faqs(project.faq);
  const pageUrl = `${siteUrl}/portfolio/${project.slug}`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Portfolio",
        item: `${siteUrl}/portfolio`,
      },
      { "@type": "ListItem", position: 3, name: project.title, item: pageUrl },
    ],
  } as const;
  const creative = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: pageUrl,
    creator: { "@type": "Organization", name: siteName, url: siteUrl },
    genre: category?.name ?? project.project_type,
    keywords: [...project.technologies, ...tags.map((tag) => tag.name)].join(
      ", ",
    ),
    datePublished: project.published_at,
    dateModified: project.updated_at,
    image: gallery.map((item) => item.secure_url),
  } as const;
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: project.meta_title ?? project.title,
    description: project.meta_description ?? project.summary,
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: siteName, url: siteUrl },
    mainEntity: { "@type": "CreativeWork", name: project.title },
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
  return (
    <article>
      <header
        className={`${styles.hero} relative overflow-hidden border-b py-20 sm:py-28`}
      >
        <Container className="relative z-10 max-w-[100rem]">
          <SiteBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Portfolio", href: "/portfolio" },
              { label: project.title, href: `/portfolio/${project.slug}` },
            ]}
          />
          <div className="mt-14 grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge>{project.project_type}</Badge>
                {category ? (
                  <Badge variant="outline">{category.name}</Badge>
                ) : null}
                {project.is_featured ? (
                  <Badge variant="secondary">Featured</Badge>
                ) : null}
              </div>
              <h1 className="mt-6 text-balance text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[.92] tracking-[-.06em]">
                {project.title}
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">
                {project.summary}
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border">
              <Meta
                term="Published"
                value={
                  project.published_at
                    ? new Intl.DateTimeFormat("en", {
                        dateStyle: "medium",
                        timeZone: "UTC",
                      }).format(new Date(project.published_at))
                    : "Published"
                }
              />
              <Meta
                term="Category"
                value={category?.name ?? "Independent work"}
              />
              <Meta term="Project type" value={project.project_type} />
              <Meta
                term="Technology"
                value={project.technologies[0] ?? "Custom stack"}
              />
            </dl>
          </div>
        </Container>
      </header>
      <section className="border-b py-20 sm:py-24">
        <Container className="max-w-[100rem]">
          <div className="grid gap-12 lg:grid-cols-2">
            <Editorial
              eyebrow="Client goals"
              title="The goals shaping the work"
              text={
                body(project) ??
                "The published project brief defines the context, constraints, and intended experience."
              }
              items={project.client_goals}
            />
            <Editorial
              eyebrow="Challenge & solution"
              title="From operating problem to product direction"
              text={project.challenge ?? project.summary}
              items={project.solution ? [project.solution] : []}
            />
          </div>
        </Container>
      </section>
      <section className="border-b bg-muted/20 py-20 sm:py-24">
        <Container className="max-w-[100rem]">
          <SectionTitle
            eyebrow="Capabilities"
            title="What the solution includes"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {strings(project.features).length ? (
              strings(project.features).map((feature, index) => (
                <Card className="p-6" key={feature}>
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-semibold">{feature}</h3>
                </Card>
              ))
            ) : (
              <p className="col-span-full rounded-xl border border-dashed p-8 text-muted-foreground">
                Detailed capabilities have not been published for this project.
              </p>
            )}
          </div>
        </Container>
      </section>
      <section className="border-b py-20 sm:py-24">
        <Container className="max-w-[100rem]">
          <SectionTitle
            eyebrow="Technology stack"
            title="Tools selected for the published approach"
          />
          <ul className="mt-10 flex flex-wrap gap-3">
            {project.technologies.map((technology) => (
              <li key={technology}>
                <Badge variant="outline" className="px-4 py-2 text-sm">
                  {technology}
                </Badge>
              </li>
            ))}
          </ul>
          {tags.length ? (
            <ul aria-label="Project tags" className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li key={tag.id}>
                  <Badge variant="secondary">{tag.name}</Badge>
                </li>
              ))}
            </ul>
          ) : null}
        </Container>
      </section>
      <section className="border-b bg-muted/20 py-20 sm:py-24">
        <Container className="max-w-[100rem]">
          <SectionTitle
            eyebrow="Project gallery"
            title="Published screens and visual context"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {gallery.length ? (
              gallery.map((item) => (
                <figure
                  className="overflow-hidden rounded-2xl border bg-card"
                  key={item.id}
                >
                  <Image
                    alt={
                      item.alt ??
                      item.caption ??
                      `${project.title} project visual`
                    }
                    className="aspect-[16/10] w-full object-cover"
                    height={item.height ?? 900}
                    src={item.secure_url}
                    width={item.width ?? 1440}
                  />
                  {item.caption ? (
                    <figcaption className="p-4 text-sm text-muted-foreground">
                      {item.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ))
            ) : (
              <div className="col-span-full grid min-h-64 place-items-center rounded-2xl border border-dashed">
                <div className="text-center">
                  <Sparkles
                    className="mx-auto size-7 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <p className="mt-3 text-muted-foreground">
                    No public gallery assets are attached.
                  </p>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>
      <section className="border-b py-20 sm:py-24">
        <Container className="max-w-[100rem]">
          <SectionTitle
            eyebrow="Results"
            title="Published outcomes and observations"
          />
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {project.results.length ? (
              project.results.map((result) => (
                <li
                  className="flex gap-3 rounded-xl border bg-card p-5"
                  key={result}
                >
                  <Check className="mt-1 size-4 shrink-0" aria-hidden="true" />
                  <span className="leading-7">{result}</span>
                </li>
              ))
            ) : (
              <li className="rounded-xl border border-dashed p-8 text-muted-foreground">
                No results have been published. The page does not infer or
                fabricate outcomes.
              </li>
            )}
          </ul>
        </Container>
      </section>
      {faqItems.length ? (
        <section className="border-b bg-muted/20 py-20 sm:py-24">
          <Container size="content">
            <SectionTitle
              eyebrow="Project FAQ"
              title={`Questions about ${project.title}`}
            />
            <div className="mt-10 space-y-3">
              {faqItems.map((item, index) => (
                <details
                  className={`${styles.disclosure} group rounded-xl border bg-card px-5`}
                  key={item.question}
                  open={index === 0}
                >
                  <summary className="focus-ring flex min-h-20 cursor-pointer list-none items-center justify-between gap-4 rounded-lg font-semibold">
                    <span>{item.question}</span>
                    <ChevronDown
                      className="size-4 transition-transform group-open:rotate-180"
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
        <section className="border-b py-20 sm:py-24">
          <Container className="max-w-[100rem]">
            <SectionTitle
              eyebrow="Related projects"
              title="Continue exploring published work"
            />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <Card className="flex flex-col p-6" key={item.id}>
                  <Badge className="self-start">{item.project_type}</Badge>
                  <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                    {item.summary}
                  </p>
                  <Button asChild className="mt-5" variant="outline">
                    <Link href={`/portfolio/${item.slug}`}>
                      View project
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
      <CTALayout
        title="Ready to shape your own solution?"
        description="Start with your business goals, users, constraints, and the outcome the product needs to support."
        actions={
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">
              Book Consultation
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        }
      />
      <StructuredData data={creative} />
      <StructuredData data={webPage} />
      <StructuredData data={breadcrumb} />
      {faqItems.length ? <StructuredData data={faqSchema} /> : null}
    </article>
  );
}
function Meta({
  term,
  value,
}: {
  readonly term: string;
  readonly value: string;
}) {
  return (
    <div className="bg-card p-5">
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">
        {term}
      </dt>
      <dd className="mt-2 font-semibold">{value}</dd>
    </div>
  );
}
function SectionTitle({
  eyebrow,
  title,
}: {
  readonly eyebrow: string;
  readonly title: string;
}) {
  return (
    <div className="max-w-3xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}
function Editorial({
  eyebrow,
  items,
  text,
  title,
}: {
  readonly eyebrow: string;
  readonly items: readonly string[];
  readonly text: string;
  readonly title: string;
}) {
  return (
    <div>
      <SectionTitle eyebrow={eyebrow} title={title} />
      <p className="mt-6 leading-8 text-muted-foreground">{text}</p>
      {items.length ? (
        <ul className="mt-6 space-y-3">
          {items.map((item) => (
            <li className="flex gap-3" key={item}>
              <Check className="mt-1 size-4 shrink-0" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
