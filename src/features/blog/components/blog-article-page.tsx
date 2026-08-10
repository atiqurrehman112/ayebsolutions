import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  Share2,
  UserRound,
} from "lucide-react";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { CmsMedia } from "@/components/media/cms-media";
import { CTALayout } from "@/components/layout/templates";
import { StructuredData } from "@/components/seo/structured-data";
import { SiteBreadcrumbs } from "@/components/shell/breadcrumbs";
import { Button } from "@/components/ui/button";
import { mediaSeoUrl } from "@/lib/media/media";
import { Badge } from "@/components/ui/status";
import type { PublicBlogContext } from "@/lib/database/repositories/blog-repository";
import type { BlogArticleRow } from "@/types/database";
import styles from "./blog-article-page.module.css";

interface Adjacent {
  readonly next: Pick<BlogArticleRow, "slug" | "title"> | null;
  readonly previous: Pick<BlogArticleRow, "slug" | "title"> | null;
}
interface Props {
  readonly adjacent: Adjacent;
  readonly article: BlogArticleRow;
  readonly context: PublicBlogContext;
  readonly newsletterEnabled: boolean;
  readonly related: readonly BlogArticleRow[];
  readonly siteName: string;
  readonly siteUrl: string;
}
interface Faq {
  readonly answer: string;
  readonly question: string;
}
interface ContentSection {
  readonly heading?: string;
  readonly body: string;
}
function faqItems(value: BlogArticleRow["faq"]): readonly Faq[] {
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
function contentSections(
  value: BlogArticleRow["content"],
): readonly ContentSection[] {
  if (typeof value === "string") return [{ body: value }];
  if (value && typeof value === "object" && !Array.isArray(value)) {
    if ("sections" in value && Array.isArray(value.sections))
      return value.sections.flatMap((item) =>
        item &&
        typeof item === "object" &&
        "body" in item &&
        typeof item.body === "string"
          ? [
              {
                body: item.body,
                heading:
                  "heading" in item && typeof item.heading === "string"
                    ? item.heading
                    : undefined,
              },
            ]
          : [],
      );
    if ("body" in value && typeof value.body === "string")
      return [{ body: value.body }];
  }
  return [];
}
function paragraphs(body: string) {
  return body
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function BlogArticlePage({
  adjacent,
  article,
  context,
  newsletterEnabled,
  related,
  siteName,
  siteUrl,
}: Props) {
  const faqs = faqItems(article.faq);
  const sections = contentSections(article.content);
  const url = `${siteUrl}/blog/${article.slug}`;
  const description = article.meta_description ?? article.description;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Insights",
        item: `${siteUrl}/blog`,
      },
      { "@type": "ListItem", position: 3, name: article.title, item: url },
    ],
  } as const;
  const posting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description,
    url,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: article.author_name
      ? { "@type": "Person", name: article.author_name }
      : { "@type": "Organization", name: siteName },
    publisher: { "@type": "Organization", name: siteName, url: siteUrl },
    image: mediaSeoUrl(context.featuredMedia),
    keywords: [
      ...article.keywords,
      ...context.tags.map((tag) => tag.name),
    ].join(", "),
  } as const;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  } as const;
  return (
    <>
      <article>
        <header
          className={`${styles.hero} relative overflow-hidden border-b py-16 sm:py-24`}
        >
          <Container className="relative z-10 max-w-[100rem]">
            <SiteBreadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Insights", href: "/blog" },
                { label: article.title, href: `/blog/${article.slug}` },
              ]}
            />
            <div className="mt-14 max-w-5xl">
              <div className="flex flex-wrap gap-2">
                {context.category ? (
                  <Badge>{context.category.name}</Badge>
                ) : null}
                {article.is_featured ? (
                  <Badge variant="outline">Featured</Badge>
                ) : null}
              </div>
              <h1 className="mt-6 text-balance text-[clamp(2.8rem,7vw,6.5rem)] font-bold leading-[.94] tracking-[-.055em]">
                {article.title}
              </h1>
              <p className={styles.summary}>
                {article.excerpt || article.description}
              </p>
              <dl className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-muted-foreground">
                {article.author_name ? (
                  <div className="flex items-center gap-2">
                    <UserRound className="size-4" aria-hidden="true" />
                    <dt className="sr-only">Author</dt>
                    <dd>{article.author_name}</dd>
                  </div>
                ) : null}
                {article.published_at ? (
                  <div className="flex items-center gap-2">
                    <CalendarDays className="size-4" aria-hidden="true" />
                    <dt className="sr-only">Published</dt>
                    <dd>
                      <time dateTime={article.published_at}>
                        {new Intl.DateTimeFormat("en", {
                          dateStyle: "long",
                        }).format(new Date(article.published_at))}
                      </time>
                    </dd>
                  </div>
                ) : null}
                {article.reading_time_minutes ? (
                  <div className="flex items-center gap-2">
                    <Clock className="size-4" aria-hidden="true" />
                    <dt className="sr-only">Reading time</dt>
                    <dd>{article.reading_time_minutes} minute read</dd>
                  </div>
                ) : null}
              </dl>
              {context.tags.length ? (
                <div
                  className="mt-6 flex flex-wrap gap-2"
                  aria-label="Article tags"
                >
                  {context.tags.map((tag) => (
                    <Badge key={tag.id} variant="outline">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>
          </Container>
        </header>
        {context.featuredMedia ? (
          <Container className="max-w-[100rem] py-10">
            <div className={styles.featuredImage}>
              <CmsMedia
                media={context.featuredMedia}
                alt={context.featuredMedia.alt ?? article.title}
                sizes="(max-width: 1024px) 100vw, 1440px"
                priority
                className="h-auto w-full object-cover"
              />
            </div>
          </Container>
        ) : null}
        {sections.length ? (
          <section
            className="border-b py-16 sm:py-24"
            aria-label="Article content"
          >
            <Container size="content">
              <div className={styles.prose}>
                {sections.map((section, index) => (
                  <section key={`${section.heading ?? "section"}-${index}`}>
                    {section.heading ? <h2>{section.heading}</h2> : null}
                    {paragraphs(section.body).map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                ))}
              </div>
            </Container>
          </section>
        ) : null}
        <section className="border-b py-14" aria-labelledby="share-heading">
          <Container size="content">
            <div className="rounded-2xl border bg-card p-6 sm:flex sm:items-center sm:justify-between">
              <div>
                <Eyebrow>
                  <Share2 className="mr-2 inline size-3" aria-hidden="true" />
                  Share
                </Eyebrow>
                <h2 id="share-heading" className="mt-3 text-2xl font-bold">
                  Pass this article along.
                </h2>
              </div>
              <div className="mt-5 flex flex-wrap gap-3 sm:mt-0">
                <Button asChild variant="outline">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a
                    href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(url)}`}
                  >
                    Email
                  </a>
                </Button>
              </div>
            </div>
          </Container>
        </section>
        {related.length ? (
          <section
            className="border-b py-16 sm:py-24"
            aria-labelledby="related-heading"
          >
            <Container className="max-w-[100rem]">
              <Eyebrow>Continue reading</Eyebrow>
              <h2 id="related-heading" className="mt-4 text-headline font-bold">
                Related articles
              </h2>
              <div className="mt-9 grid gap-5 md:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    href={`/blog/${item.slug}`}
                    className={`${styles.relatedArticle} focus-ring rounded-2xl border bg-card p-6`}
                  >
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">
                      {item.excerpt || item.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                      Read article{" "}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        ) : null}
        {adjacent.previous || adjacent.next ? (
          <nav className="border-b py-10" aria-label="Adjacent articles">
            <Container size="content" className="grid gap-4 sm:grid-cols-2">
              {adjacent.previous ? (
                <Button
                  asChild
                  variant="outline"
                  className="h-auto justify-start py-4"
                >
                  <Link href={`/blog/${adjacent.previous.slug}`}>
                    <ArrowLeft className="size-4" aria-hidden="true" />
                    <span className="text-left">
                      <span className="block text-xs text-muted-foreground">
                        Previous
                      </span>
                      {adjacent.previous.title}
                    </span>
                  </Link>
                </Button>
              ) : (
                <span />
              )}
              {adjacent.next ? (
                <Button
                  asChild
                  variant="outline"
                  className="h-auto justify-end py-4"
                >
                  <Link href={`/blog/${adjacent.next.slug}`}>
                    <span className="text-right">
                      <span className="block text-xs text-muted-foreground">
                        Next
                      </span>
                      {adjacent.next.title}
                    </span>
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              ) : null}
            </Container>
          </nav>
        ) : null}
        {faqs.length ? (
          <section
            className="border-b py-16 sm:py-24"
            aria-labelledby="faq-heading"
          >
            <Container size="content">
              <Eyebrow>Article FAQ</Eyebrow>
              <h2 id="faq-heading" className="mt-4 text-headline font-bold">
                Questions about this topic
              </h2>
              <div className="mt-10 space-y-3">
                {faqs.map((item) => (
                  <details
                    key={item.question}
                    className={`${styles.disclosure} rounded-xl border bg-card px-5`}
                  >
                    <summary className="focus-ring flex min-h-16 cursor-pointer items-center font-semibold">
                      {item.question}
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
        {newsletterEnabled ? (
          <section
            className="border-b py-16"
            aria-labelledby="newsletter-heading"
          >
            <Container size="content">
              <div className="rounded-2xl border bg-muted/20 p-8">
                <Eyebrow>Newsletter</Eyebrow>
                <h2 id="newsletter-heading" className="mt-4 text-3xl font-bold">
                  Keep useful ideas within reach.
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Newsletter delivery is enabled for this site. Visit the
                  contact page to ask about editorial updates.
                </p>
                <Button asChild variant="outline" className="mt-6">
                  <Link href="/contact">Contact us</Link>
                </Button>
              </div>
            </Container>
          </section>
        ) : null}
      </article>
      <CTALayout
        eyebrow={
          <Eyebrow className="mb-3 text-xs text-primary-foreground/55">
            Apply the thinking
          </Eyebrow>
        }
        title="Ready to explore your own project?"
        description={
          <p className="max-w-2xl text-primary-foreground/70">
            Share the problem, goals, and constraints. We can help plan an
            appropriate technical direction.
          </p>
        }
        actions={
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">
              Book consultation{" "}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        }
        className={styles.finalCta}
      />
      <StructuredData data={breadcrumb} />
      <StructuredData data={posting} />
      {faqs.length ? <StructuredData data={faqSchema} /> : null}
    </>
  );
}
