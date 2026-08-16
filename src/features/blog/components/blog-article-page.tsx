import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock,
  Mail,
  MessageSquareQuote,
  Share2,
  UserRound,
} from "lucide-react";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { CmsMedia } from "@/components/media/cms-media";
import { CTALayout } from "@/components/layout/templates";
import { StructuredData } from "@/components/seo/structured-data";
import { SiteBreadcrumbs } from "@/components/shell/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import type { PublicBlogContext } from "@/lib/database/repositories/blog-repository";
import { mediaSeoUrl } from "@/lib/media/media";
import type { BlogArticleRow, MediaLibraryRow } from "@/types/database";
import { CopyArticleLink, ReadingProgress } from "./article-tools";
import styles from "./blog-article-page.module.css";

interface Adjacent {
  readonly next: Pick<BlogArticleRow, "slug" | "title"> | null;
  readonly previous: Pick<BlogArticleRow, "slug" | "title"> | null;
}

interface Props {
  readonly adjacent: Adjacent;
  readonly article: BlogArticleRow;
  readonly context: PublicBlogContext;
  readonly related: readonly BlogArticleRow[];
  readonly siteName: string;
  readonly siteUrl: string;
}

interface Faq {
  readonly answer: string;
  readonly question: string;
}

interface ContentSection {
  readonly body: string;
  readonly heading?: string;
}

type ContentBlock =
  | { readonly type: "callout"; readonly text: string }
  | { readonly language?: string; readonly text: string; readonly type: "code" }
  | { readonly items: readonly string[]; readonly type: "ordered-list" }
  | { readonly type: "paragraph"; readonly text: string }
  | { readonly type: "quote"; readonly text: string }
  | {
      readonly type: "media";
      readonly id: string;
      readonly mediaType: "image" | "video";
      readonly alt: string;
    }
  | {
      readonly headers: readonly string[];
      readonly rows: readonly (readonly string[])[];
      readonly type: "table";
    }
  | { readonly items: readonly string[]; readonly type: "unordered-list" };

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
  const fromBody = (body: string): readonly ContentSection[] => {
    const parts = body.split(/^##\s+(.+)$/gm);
    if (parts.length === 1) return body.trim() ? [{ body }] : [];
    const sections: ContentSection[] = [];
    if (parts[0]?.trim()) sections.push({ body: parts[0] });
    for (let index = 1; index < parts.length; index += 2)
      sections.push({
        heading: parts[index]?.trim(),
        body: parts[index + 1]?.trim() ?? "",
      });
    return sections;
  };
  if (typeof value === "string") return fromBody(value);
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
      return fromBody(value.body);
  }
  return [];
}

function slugify(value: string, index: number) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${slug || "section"}-${index + 1}`;
}

function tableCells(line: string) {
  return line
    .split("|")
    .map((cell) => cell.trim())
    .filter(Boolean);
}

function blocks(body: string): readonly ContentBlock[] {
  return body
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean)
    .flatMap((chunk): readonly ContentBlock[] => {
      const media = chunk.match(
        /^\[(image|video):([0-9a-f-]{36}):([^\]]+)\]$/i,
      );
      if (media)
        return [
          {
            type: "media",
            mediaType: media[1]?.toLowerCase() === "video" ? "video" : "image",
            id: media[2] ?? "",
            alt: media[3] ?? "Article media",
          },
        ];
      if (chunk.startsWith("```") && chunk.endsWith("```")) {
        const lines = chunk.slice(3, -3).trim().split("\n");
        const language = lines[0]?.match(/^[a-zA-Z0-9+#-]+$/)
          ? lines.shift()
          : undefined;
        return [{ language, text: lines.join("\n"), type: "code" }];
      }
      const lines = chunk
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      if (lines.length >= 2 && lines.every((line) => line.includes("|"))) {
        const parsed = lines.map(tableCells);
        const hasDivider = parsed[1]?.every((cell) => /^:?-{3,}:?$/.test(cell));
        return [
          {
            headers: parsed[0] ?? [],
            rows: parsed.slice(hasDivider ? 2 : 1),
            type: "table",
          },
        ];
      }
      if (lines.every((line) => /^[-*]\s+/.test(line)))
        return [
          {
            items: lines.map((line) => line.replace(/^[-*]\s+/, "")),
            type: "unordered-list",
          },
        ];
      if (lines.every((line) => /^\d+[.)]\s+/.test(line)))
        return [
          {
            items: lines.map((line) => line.replace(/^\d+[.)]\s+/, "")),
            type: "ordered-list",
          },
        ];
      if (chunk.startsWith(">"))
        return [
          {
            text: lines.map((line) => line.replace(/^>\s?/, "")).join(" "),
            type: "quote",
          },
        ];
      if (/^\[!(NOTE|TIP|IMPORTANT)\]/i.test(chunk))
        return [
          {
            text: chunk.replace(/^\[!(NOTE|TIP|IMPORTANT)\]\s*/i, ""),
            type: "callout",
          },
        ];
      return [{ text: chunk, type: "paragraph" }];
    });
}

function inlineText(text: string): ReactNode {
  return text
    .split(
      /(\[(?:button:)?[^\]]+\]\((?:https?:\/\/|\/)[^)]+\)|https?:\/\/[^\s]+)/g,
    )
    .map((part, index) => {
      const markdown = part.match(
        /^\[([^\]]+)\]\(((?:https?:\/\/|\/)[^)]+)\)$/,
      );
      if (markdown) {
        const button = markdown[1]?.startsWith("button:");
        const label = button ? markdown[1]?.slice(7) : markdown[1];
        const href = markdown[2] ?? "/";
        const external = href.startsWith("http");
        return (
          <a
            className={
              button
                ? "focus-ring inline-flex min-h-11 items-center rounded-full bg-foreground px-5 font-semibold text-background"
                : "focus-ring rounded-sm font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
            }
            href={href}
            key={`${href}-${index}`}
            rel={external ? "noreferrer" : undefined}
            target={external ? "_blank" : undefined}
          >
            {label}
            {external ? (
              <span className="sr-only"> (opens in a new tab)</span>
            ) : null}
          </a>
        );
      }
      return /^https?:\/\//.test(part) ? (
        <a
          className="focus-ring rounded-sm font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
          href={part}
          key={`${part}-${index}`}
          rel="noreferrer"
          target="_blank"
        >
          {part}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : (
        part
      );
    });
}

export function BlogArticlePage({
  adjacent,
  article,
  context,
  related,
  siteName,
  siteUrl,
}: Props) {
  const faqs = faqItems(article.faq);
  const sections = contentSections(article.content).map((section, index) => ({
    ...section,
    id: section.heading ? slugify(section.heading, index) : undefined,
  }));
  const tableOfContents = sections.filter(
    (
      section,
    ): section is typeof section & {
      readonly heading: string;
      readonly id: string;
    } => Boolean(section.heading && section.id),
  );
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
    image: mediaSeoUrl(context.openGraphMedia ?? context.featuredMedia),
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
      <ReadingProgress />
      <article>
        <header
          className={`${styles.hero} relative isolate overflow-hidden border-b pb-18 pt-16 sm:pb-24 sm:pt-24`}
        >
          <Container className="relative z-10 max-w-[100rem]">
            <SiteBreadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Insights", href: "/blog" },
                { label: article.title, href: `/blog/${article.slug}` },
              ]}
            />
            <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:gap-20">
              <div>
                <div className="flex flex-wrap gap-2">
                  {context.category ? (
                    <Badge>{context.category.name}</Badge>
                  ) : null}
                  {article.is_featured ? (
                    <Badge variant="outline">Featured</Badge>
                  ) : null}
                </div>
                <h1 className="mt-7 text-balance text-[clamp(3rem,7vw,6.75rem)] font-bold leading-[.89] tracking-[-.065em]">
                  {article.title}
                </h1>
                <p className={styles.summary}>
                  {article.excerpt || article.description}
                </p>
              </div>
              <div>
                <dl className={styles.heroMeta}>
                  {article.author_name ? (
                    <Meta
                      icon={<UserRound className="size-4" aria-hidden="true" />}
                      term="Author"
                      value={article.author_name}
                    />
                  ) : null}
                  {article.published_at ? (
                    <Meta
                      icon={
                        <CalendarDays className="size-4" aria-hidden="true" />
                      }
                      term="Published"
                      value={
                        <time dateTime={article.published_at}>
                          {new Intl.DateTimeFormat("en", {
                            dateStyle: "long",
                            timeZone: "UTC",
                          }).format(new Date(article.published_at))}
                        </time>
                      }
                    />
                  ) : null}
                  {article.reading_time_minutes ? (
                    <Meta
                      icon={<Clock className="size-4" aria-hidden="true" />}
                      term="Reading time"
                      value={`${article.reading_time_minutes} minute read`}
                    />
                  ) : null}
                </dl>
                {context.tags.length ? (
                  <ul
                    className="mt-6 flex flex-wrap gap-2"
                    aria-label="Article tags"
                  >
                    {context.tags.map((tag) => (
                      <li key={tag.id}>
                        <Badge variant="outline">{tag.name}</Badge>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
            {context.featuredMedia ? (
              <figure className={`${styles.featuredImage} mt-14 sm:mt-18`}>
                <CmsMedia
                  media={context.featuredMedia}
                  alt={context.featuredMedia.alt ?? article.title}
                  sizes="(max-width: 1600px) 100vw, 1600px"
                  priority
                  className="aspect-[16/8] w-full object-cover"
                />
              </figure>
            ) : null}
          </Container>
        </header>

        {sections.length ? (
          <section
            className="border-b py-16 sm:py-24"
            aria-label="Article content"
          >
            <Container className="max-w-[86rem]">
              <div
                className={
                  tableOfContents.length
                    ? "grid gap-12 lg:grid-cols-[15rem_minmax(0,48rem)] lg:justify-center lg:gap-16"
                    : "mx-auto max-w-3xl"
                }
              >
                {tableOfContents.length ? (
                  <aside className="hidden lg:block">
                    <nav
                      className={styles.contents}
                      aria-label="Table of contents"
                    >
                      <span className="text-xs font-semibold uppercase tracking-[.14em] text-muted-foreground">
                        On this page
                      </span>
                      <ol className="mt-5 space-y-3">
                        {tableOfContents.map((section, index) => (
                          <li key={section.id}>
                            <a
                              className="focus-ring block rounded-md text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground"
                              href={`#${section.id}`}
                            >
                              <span className="mr-2 font-mono text-[.65rem]">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              {section.heading}
                            </a>
                          </li>
                        ))}
                      </ol>
                    </nav>
                  </aside>
                ) : null}
                <div className={styles.prose}>
                  {sections.map((section, index) => (
                    <section
                      id={section.id}
                      className="scroll-mt-32"
                      key={`${section.heading ?? "section"}-${index}`}
                    >
                      {section.heading ? <h2>{section.heading}</h2> : null}
                      {blocks(section.body).map((block, blockIndex) => (
                        <ContentBlockView
                          block={block}
                          media={context.gallery}
                          key={`${block.type}-${blockIndex}`}
                        />
                      ))}
                    </section>
                  ))}
                </div>
              </div>
            </Container>
          </section>
        ) : null}

        {context.gallery.length ? (
          <section
            className="border-b py-14"
            aria-labelledby="article-gallery-heading"
          >
            <Container size="content">
              <h2 id="article-gallery-heading" className="text-2xl font-bold">
                Article gallery
              </h2>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                {context.gallery.map((item) => (
                  <figure
                    className="overflow-hidden rounded-2xl border bg-card"
                    key={item.id}
                  >
                    <CmsMedia
                      className="aspect-video w-full object-cover"
                      media={item}
                      alt={item.alt ?? item.file_name}
                      sizes="(max-width: 640px) 100vw, 384px"
                    />
                    {item.alt ? (
                      <figcaption className="p-3 text-sm text-muted-foreground">
                        {item.alt}
                      </figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            </Container>
          </section>
        ) : null}

        <section className="border-b py-14" aria-labelledby="share-heading">
          <Container size="content">
            <div
              className={`${styles.sharePanel} rounded-2xl border bg-card p-6 sm:flex sm:items-center sm:justify-between sm:p-8`}
            >
              <div>
                <Eyebrow>
                  <Share2 className="mr-2 inline size-3" aria-hidden="true" />
                  Share this perspective
                </Eyebrow>
                <h2 id="share-heading" className="mt-3 text-2xl font-bold">
                  Useful ideas travel further.
                </h2>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 sm:mt-0">
                <CopyArticleLink url={url} />
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
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(article.title)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    X<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a
                    href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(url)}`}
                  >
                    <Mail className="size-4" aria-hidden="true" />
                    Email
                  </a>
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {adjacent.previous || adjacent.next ? (
          <nav className="border-b py-12" aria-label="Adjacent articles">
            <Container className="grid max-w-[86rem] gap-4 sm:grid-cols-2">
              {adjacent.previous ? (
                <Link
                  className={`${styles.adjacentLink} focus-ring group rounded-2xl border bg-card p-6`}
                  href={`/blog/${adjacent.previous.slug}`}
                >
                  <span className="flex items-center gap-2 text-xs uppercase tracking-[.12em] text-muted-foreground">
                    <ArrowLeft className="size-4" aria-hidden="true" />
                    Previous article
                  </span>
                  <strong className="mt-4 block text-lg">
                    {adjacent.previous.title}
                  </strong>
                </Link>
              ) : (
                <span />
              )}
              {adjacent.next ? (
                <Link
                  className={`${styles.adjacentLink} focus-ring group rounded-2xl border bg-card p-6 text-right`}
                  href={`/blog/${adjacent.next.slug}`}
                >
                  <span className="flex items-center justify-end gap-2 text-xs uppercase tracking-[.12em] text-muted-foreground">
                    Next article
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                  <strong className="mt-4 block text-lg">
                    {adjacent.next.title}
                  </strong>
                </Link>
              ) : null}
            </Container>
          </nav>
        ) : null}

        {related.length ? (
          <section
            className="border-b py-18 sm:py-24"
            aria-labelledby="related-heading"
          >
            <Container className="max-w-[100rem]">
              <Eyebrow>Continue reading</Eyebrow>
              <h2
                id="related-heading"
                className="mt-4 text-balance text-4xl font-bold tracking-tight sm:text-5xl"
              >
                Related perspectives
              </h2>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    href={`/blog/${item.slug}`}
                    className={`${styles.relatedArticle} focus-ring group rounded-2xl border bg-card p-6 sm:p-7`}
                  >
                    <span className="flex items-center justify-between gap-4">
                      <Badge variant="outline">Article</Badge>
                      <ArrowUpRight
                        className="size-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </span>
                    <h3 className="mt-8 text-2xl font-bold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">
                      {item.excerpt || item.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                      Read article
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        ) : null}

        {faqs.length ? (
          <section
            className="border-b bg-muted/20 py-18 sm:py-24"
            aria-labelledby="faq-heading"
          >
            <Container size="content">
              <Eyebrow>Article FAQ</Eyebrow>
              <h2
                id="faq-heading"
                className="mt-4 text-balance text-4xl font-bold tracking-tight sm:text-5xl"
              >
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

        <section
          className="border-b py-16"
          aria-labelledby="newsletter-heading"
        >
          <Container size="content">
            <div
              className={`${styles.newsletterPanel} rounded-2xl border bg-card p-8 sm:p-10`}
            >
              <Eyebrow>Editorial updates</Eyebrow>
              <h2
                id="newsletter-heading"
                className="mt-4 text-balance text-3xl font-bold sm:text-4xl"
              >
                Keep useful ideas within reach.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                Newsletter subscriptions are not collected on this page. Get in
                touch if you would like to ask about future editorial updates.
              </p>
              <Button asChild variant="outline" className="mt-6">
                <Link href="/contact">Ask about updates</Link>
              </Button>
            </div>
          </Container>
        </section>
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
              Book consultation
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

function Meta({
  icon,
  term,
  value,
}: {
  readonly icon: ReactNode;
  readonly term: string;
  readonly value: ReactNode;
}) {
  return (
    <div>
      <dt>
        {icon}
        {term}
      </dt>
      <dd>{value}</dd>
    </div>
  );
}

function ContentBlockView({
  block,
  media,
}: {
  readonly block: ContentBlock;
  readonly media: readonly MediaLibraryRow[];
}) {
  if (block.type === "media") {
    const item = media.find((entry) => entry.id === block.id);
    return item ? (
      <figure>
        <CmsMedia
          className="w-full rounded-2xl object-cover"
          media={item}
          alt={block.alt}
          sizes="(max-width: 768px) 100vw, 768px"
        />
        <figcaption>{block.alt}</figcaption>
      </figure>
    ) : null;
  }
  if (block.type === "quote")
    return (
      <blockquote>
        <MessageSquareQuote className="size-6" aria-hidden="true" />
        <p>{inlineText(block.text)}</p>
      </blockquote>
    );
  if (block.type === "callout")
    return (
      <aside className={styles.callout}>
        <strong>Worth noting</strong>
        <p>{inlineText(block.text)}</p>
      </aside>
    );
  if (block.type === "code")
    return (
      <div className={styles.codeBlock}>
        {block.language ? <span>{block.language}</span> : null}
        <pre tabIndex={0}>
          <code>{block.text}</code>
        </pre>
      </div>
    );
  if (block.type === "unordered-list")
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>{inlineText(item)}</li>
        ))}
      </ul>
    );
  if (block.type === "ordered-list")
    return (
      <ol>
        {block.items.map((item) => (
          <li key={item}>{inlineText(item)}</li>
        ))}
      </ol>
    );
  if (block.type === "table")
    return (
      <div
        className={styles.tableWrap}
        tabIndex={0}
        role="region"
        aria-label="Scrollable article table"
      >
        <table>
          <thead>
            <tr>
              {block.headers.map((header) => (
                <th key={header} scope="col">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIndex) => (
                  <td key={`${cell}-${cellIndex}`}>{inlineText(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  return <p>{inlineText(block.text)}</p>;
}
