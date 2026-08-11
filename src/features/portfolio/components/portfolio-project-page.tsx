import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ExternalLink,
  Layers3,
} from "lucide-react";
import { Card } from "@/components/cards/card";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { CTALayout } from "@/components/layout/templates";
import { CmsMedia } from "@/components/media/cms-media";
import { StructuredData } from "@/components/seo/structured-data";
import { SiteBreadcrumbs } from "@/components/shell/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import { mediaSeoUrl } from "@/lib/media/media";
import type {
  Json,
  MediaLibraryRow,
  PortfolioProjectRow,
} from "@/types/database";
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

interface ProcessItem {
  readonly description?: string;
  readonly title: string;
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

function contentRecord(
  project: PortfolioProjectRow,
): Readonly<Record<string, Json | undefined>> | null {
  const value = project.content;
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Readonly<Record<string, Json | undefined>>;
}

function contentText(project: PortfolioProjectRow, key: string) {
  const value = contentRecord(project)?.[key];
  return typeof value === "string" && value.trim() ? value : null;
}

function processItems(project: PortfolioProjectRow): readonly ProcessItem[] {
  const value = contentRecord(project)?.process;
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (typeof item === "string" && item.trim()) return [{ title: item }];
    if (!item || typeof item !== "object" || Array.isArray(item)) return [];
    const title =
      "title" in item && typeof item.title === "string" ? item.title : null;
    const description =
      "description" in item && typeof item.description === "string"
        ? item.description
        : undefined;
    return title ? [{ title, description }] : [];
  });
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
  const overview =
    contentText(project, "body") ?? contentText(project, "overview");
  const client = contentText(project, "client");
  const projectYear = contentText(project, "year");
  const process = processItems(project);
  const features = strings(project.features);
  const heroMedia = gallery[0];
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
    image: gallery.flatMap((item) => {
      const url = mediaSeoUrl(item);
      return url ? [url] : [];
    }),
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
        className={`${styles.hero} relative isolate overflow-hidden border-b pb-18 pt-20 sm:pb-24 sm:pt-28`}
      >
        <Container className="relative z-10 max-w-[100rem]">
          <SiteBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Portfolio", href: "/portfolio" },
              { label: project.title, href: `/portfolio/${project.slug}` },
            ]}
          />
          <div className="mt-14 grid gap-12 lg:grid-cols-[1.12fr_.88fr] lg:items-end lg:gap-20">
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
              <h1 className="mt-7 text-balance text-[clamp(3.25rem,7vw,7rem)] font-bold leading-[.88] tracking-[-.07em]">
                {project.title}
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">
                {project.summary}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Discuss a similar project
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#case-study">Read the case study</Link>
                </Button>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border shadow-soft">
              {project.published_at ? (
                <Meta
                  term="Published"
                  value={new Intl.DateTimeFormat("en", {
                    year: "numeric",
                    timeZone: "UTC",
                  }).format(new Date(project.published_at))}
                />
              ) : null}
              {category ? <Meta term="Category" value={category.name} /> : null}
              {client ? <Meta term="Client" value={client} /> : null}
              {projectYear ? (
                <Meta term="Project year" value={projectYear} />
              ) : null}
              <Meta term="Project type" value={project.project_type} />
              {project.technologies[0] ? (
                <Meta term="Core technology" value={project.technologies[0]} />
              ) : null}
            </dl>
          </div>
          {heroMedia ? (
            <figure
              className={`${styles.heroMedia} mt-14 overflow-hidden rounded-[1.75rem] border bg-card shadow-elevated sm:mt-18`}
            >
              <CmsMedia
                alt={
                  heroMedia.alt ??
                  heroMedia.caption ??
                  `${project.title} project overview`
                }
                className="aspect-[16/8] w-full object-cover"
                media={heroMedia}
                priority
                sizes="(max-width: 1600px) 100vw, 1600px"
              />
              {heroMedia.caption ? (
                <figcaption className="border-t px-5 py-4 text-sm text-muted-foreground">
                  {heroMedia.caption}
                </figcaption>
              ) : null}
            </figure>
          ) : null}
        </Container>
      </header>

      <div id="case-study" className="scroll-mt-28">
        {overview || project.challenge || project.solution ? (
          <section
            className="border-b py-20 sm:py-28"
            aria-labelledby="overview-heading"
          >
            <Container className="max-w-[100rem]">
              <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
                <div>
                  <Eyebrow>Project overview</Eyebrow>
                  <h2
                    id="overview-heading"
                    className="mt-4 text-balance text-4xl font-bold tracking-tight sm:text-6xl"
                  >
                    Context before craft.
                  </h2>
                </div>
                <div className="space-y-12">
                  {overview ? (
                    <Editorial title="Overview" text={overview} />
                  ) : null}
                  {project.challenge ? (
                    <Editorial
                      title="Challenge"
                      text={project.challenge}
                      items={project.client_goals}
                    />
                  ) : null}
                  {project.solution ? (
                    <Editorial title="Solution" text={project.solution} />
                  ) : null}
                </div>
              </div>
            </Container>
          </section>
        ) : null}

        {process.length || features.length ? (
          <section
            className={`${styles.processSection} border-b py-20 text-primary-foreground sm:py-28`}
            aria-labelledby="process-heading"
          >
            <Container className="max-w-[100rem]">
              <SectionTitle
                eyebrow="Process & capabilities"
                id="process-heading"
                title="How the published solution took shape"
                inverse
              />
              {process.length ? (
                <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-primary-foreground/15 bg-primary-foreground/15 md:grid-cols-2 lg:grid-cols-4">
                  {process.map((item, index) => (
                    <li
                      className="bg-primary p-6 sm:p-8"
                      key={`${item.title}-${index}`}
                    >
                      <span className="font-mono text-xs text-primary-foreground/45">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-8 text-xl font-semibold">
                        {item.title}
                      </h3>
                      {item.description ? (
                        <p className="mt-3 text-sm leading-7 text-primary-foreground/65">
                          {item.description}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ol>
              ) : null}
              {features.length ? (
                <ul
                  className={`${process.length ? "mt-10" : "mt-12"} grid gap-3 sm:grid-cols-2 lg:grid-cols-4`}
                  aria-label="Published project capabilities"
                >
                  {features.map((feature) => (
                    <li
                      className="flex gap-3 rounded-xl border border-primary-foreground/15 bg-primary-foreground/[.05] p-5"
                      key={feature}
                    >
                      <Check
                        className="mt-1 size-4 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Container>
          </section>
        ) : null}

        {project.technologies.length || tags.length ? (
          <section
            className="border-b py-20 sm:py-24"
            aria-labelledby="technology-heading"
          >
            <Container className="max-w-[100rem]">
              <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-start lg:gap-20">
                <SectionTitle
                  eyebrow="Technology stack"
                  id="technology-heading"
                  title="Tools selected for the published approach"
                />
                <div>
                  {project.technologies.length ? (
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {project.technologies.map((technology, index) => (
                        <li
                          className={`${styles.technologyCard} flex items-center gap-4 rounded-xl border bg-card p-5`}
                          key={technology}
                        >
                          <span className="grid size-10 place-items-center rounded-lg bg-muted">
                            <Layers3 className="size-4" aria-hidden="true" />
                          </span>
                          <span className="font-semibold">{technology}</span>
                          <span className="ml-auto font-mono text-xs text-muted-foreground">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {tags.length ? (
                    <ul
                      aria-label="Project tags"
                      className="mt-5 flex flex-wrap gap-2"
                    >
                      {tags.map((tag) => (
                        <li key={tag.id}>
                          <Badge variant="secondary">{tag.name}</Badge>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </Container>
          </section>
        ) : null}

        {project.results.length ? (
          <section
            className="border-b bg-muted/20 py-20 sm:py-24"
            aria-labelledby="results-heading"
          >
            <Container className="max-w-[100rem]">
              <SectionTitle
                eyebrow="Published results"
                id="results-heading"
                title="Outcomes recorded in the case study"
              />
              <ul className="mt-10 grid gap-4 md:grid-cols-2">
                {project.results.map((result, index) => (
                  <li
                    className={`${styles.resultCard} rounded-2xl border bg-card p-6 sm:p-8`}
                    key={result}
                  >
                    <span className="font-mono text-xs text-muted-foreground">
                      Outcome {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-5 text-lg leading-8">{result}</p>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        ) : null}

        {gallery.length > 1 ? (
          <section
            className="border-b py-20 sm:py-24"
            aria-labelledby="gallery-heading"
          >
            <Container className="max-w-[100rem]">
              <SectionTitle
                eyebrow="Project gallery"
                id="gallery-heading"
                title="Published screens and visual context"
              />
              <div
                className={`${styles.gallery} mt-10 grid gap-5 md:grid-cols-2`}
              >
                {gallery.slice(1).map((item, index) => (
                  <figure
                    className={`${styles.galleryItem} overflow-hidden rounded-2xl border bg-card ${index % 3 === 0 ? styles.galleryWide : ""}`}
                    key={item.id}
                  >
                    <CmsMedia
                      alt={
                        item.alt ??
                        item.caption ??
                        `${project.title} project visual`
                      }
                      className="aspect-[16/10] w-full object-cover"
                      media={item}
                      sizes={
                        index % 3 === 0
                          ? "(max-width: 768px) 100vw, 66vw"
                          : "(max-width: 768px) 100vw, 50vw"
                      }
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
            className="border-b bg-muted/20 py-20 sm:py-24"
            aria-labelledby="faq-heading"
          >
            <Container size="content">
              <SectionTitle
                eyebrow="Project FAQ"
                id="faq-heading"
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
          <section
            className="border-b py-20 sm:py-24"
            aria-labelledby="related-heading"
          >
            <Container className="max-w-[100rem]">
              <SectionTitle
                eyebrow="Related projects"
                id="related-heading"
                title="Continue exploring published work"
              />
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {related.map((item) => (
                  <Card
                    className={`${styles.relatedCard} group flex flex-col p-6 sm:p-7`}
                    key={item.id}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <Badge className="self-start">{item.project_type}</Badge>
                      <ArrowUpRight
                        className="size-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mt-8 text-2xl font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                      {item.summary}
                    </p>
                    <Link
                      className="focus-ring mt-6 inline-flex min-h-11 items-center gap-2 self-start rounded-lg text-sm font-semibold"
                      href={`/portfolio/${item.slug}`}
                    >
                      View case study
                      <ExternalLink className="size-4" aria-hidden="true" />
                    </Link>
                  </Card>
                ))}
              </div>
            </Container>
          </section>
        ) : null}
      </div>

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
  id,
  inverse = false,
  title,
}: {
  readonly eyebrow: string;
  readonly id: string;
  readonly inverse?: boolean;
  readonly title: string;
}) {
  return (
    <div className="max-w-3xl">
      <Eyebrow className={inverse ? "text-primary-foreground/55" : undefined}>
        {eyebrow}
      </Eyebrow>
      <h2
        className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-5xl"
        id={id}
      >
        {title}
      </h2>
    </div>
  );
}

function Editorial({
  items = [],
  text,
  title,
}: {
  readonly items?: readonly string[];
  readonly text: string;
  readonly title: string;
}) {
  return (
    <div className="border-t pt-6">
      <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
        {text}
      </p>
      {items.length ? (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <li className="flex gap-3 rounded-xl border bg-card p-4" key={item}>
              <Check className="mt-1 size-4 shrink-0" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
