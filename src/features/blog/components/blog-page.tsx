import type { CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Clock,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { CTALayout } from "@/components/layout/templates";
import { CmsMedia } from "@/components/media/cms-media";
import { StructuredData } from "@/components/seo/structured-data";
import { SiteBreadcrumbs } from "@/components/shell/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import type { PaginatedResult } from "@/lib/database/repositories/base-repository";
import type {
  PublicBlogArticle,
  PublicBlogSort,
} from "@/lib/database/repositories/blog-repository";
import { mediaSeoUrl } from "@/lib/media/media";
import styles from "./blog-page.module.css";

interface FilterItem {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
}

export interface BlogFilters {
  readonly category?: string;
  readonly pageSize: number;
  readonly query?: string;
  readonly sort: PublicBlogSort;
  readonly tag?: string;
}

interface Props {
  readonly articles: PaginatedResult<PublicBlogArticle>;
  readonly categories: readonly FilterItem[];
  readonly filters: BlogFilters;
  readonly siteUrl: string;
  readonly tags: readonly FilterItem[];
}

function pageHref(filters: BlogFilters, page: number) {
  const parameters = new URLSearchParams();
  if (filters.query) parameters.set("q", filters.query);
  if (filters.category) parameters.set("category", filters.category);
  if (filters.tag) parameters.set("tag", filters.tag);
  parameters.set("sort", filters.sort);
  parameters.set("pageSize", String(filters.pageSize));
  parameters.set("page", String(page));
  return `/blog?${parameters}`;
}

function publishedDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(value));
}

export function BlogPage({
  articles,
  categories,
  filters,
  siteUrl,
  tags,
}: Props) {
  const categoryById = new Map(
    categories.map((category) => [category.id, category.name]),
  );
  const featured = articles.data.find((article) => article.is_featured);
  const remaining = featured
    ? articles.data.filter((article) => article.id !== featured.id)
    : articles.data;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Ayeb Solutions Insights",
    url: `${siteUrl}/blog`,
    blogPost: articles.data.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      url: `${siteUrl}/blog/${article.slug}`,
      image: mediaSeoUrl(article.featuredMedia),
    })),
  } as const;

  return (
    <>
      <header
        className={`${styles.hero} relative isolate overflow-hidden border-b py-20 sm:py-28 lg:py-32`}
      >
        <Container className="relative z-10 max-w-[100rem]">
          <SiteBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Insights", href: "/blog" },
            ]}
          />
          <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:gap-20">
            <div>
              <Eyebrow>Ideas for building with intent</Eyebrow>
              <h1 className="mt-6 text-balance text-[clamp(3.25rem,8vw,7.5rem)] font-bold leading-[.87] tracking-[-.07em]">
                Practical thinking for ambitious digital work.
              </h1>
            </div>
            <div className="lg:pb-2">
              <p className="max-w-xl text-lg leading-8 text-muted-foreground">
                Published perspectives on modern software, AI automation,
                product design, integrations, and the decisions that make
                digital systems last.
              </p>
              <a
                className="focus-ring mt-7 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold"
                href="#article-library"
              >
                Browse the publication
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-3">
            <HeroMetric
              label="Published articles"
              value={String(articles.count).padStart(2, "0")}
            />
            <HeroMetric
              label="Editorial categories"
              value={String(categories.length).padStart(2, "0")}
            />
            <HeroMetric label="Source" value="CMS" />
          </div>
        </Container>
      </header>

      <main>
        {featured ? (
          <section
            className="border-b py-16 sm:py-24"
            aria-labelledby="featured-article-heading"
          >
            <Container className="max-w-[100rem]">
              <div className="mb-8 flex items-center justify-between gap-5">
                <Eyebrow>Featured perspective</Eyebrow>
                <span className="font-mono text-xs text-muted-foreground">
                  Editor’s selection
                </span>
              </div>
              <article
                className={`${styles.featuredArticle} group grid overflow-hidden rounded-[1.75rem] border bg-card shadow-elevated lg:grid-cols-[1.08fr_.92fr]`}
              >
                <Link
                  className={`${styles.featuredMediaLink} focus-ring relative block min-h-72 overflow-hidden lg:min-h-[34rem]`}
                  href={`/blog/${featured.slug}`}
                  aria-label={`Read featured article: ${featured.title}`}
                >
                  {featured.featuredMedia ? (
                    <CmsMedia
                      media={featured.featuredMedia}
                      alt={featured.featuredMedia.alt ?? featured.title}
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className={`${styles.featuredMedia} absolute inset-0 size-full object-cover`}
                    />
                  ) : (
                    <div
                      className={`${styles.featuredMedia} absolute inset-0 grid place-items-center`}
                    >
                      <Sparkles
                        className="size-10 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <span className="sr-only">
                        No public featured image is configured
                      </span>
                    </div>
                  )}
                  <span
                    className={`${styles.openArticle} absolute right-5 top-5 grid size-12 place-items-center rounded-full bg-background text-foreground shadow-soft`}
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="size-5" />
                  </span>
                </Link>
                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                  <div className="flex flex-wrap gap-2">
                    <Badge>Featured</Badge>
                    {featured.category_id &&
                    categoryById.get(featured.category_id) ? (
                      <Badge variant="outline">
                        {categoryById.get(featured.category_id)}
                      </Badge>
                    ) : null}
                  </div>
                  <h2
                    id="featured-article-heading"
                    className="mt-6 text-balance text-3xl font-bold leading-tight tracking-[-.04em] sm:text-5xl"
                  >
                    {featured.title}
                  </h2>
                  <p className="mt-5 line-clamp-4 leading-8 text-muted-foreground">
                    {featured.excerpt || featured.description}
                  </p>
                  <ArticleMeta article={featured} />
                  {featured.keywords.length ? (
                    <TagList tags={featured.keywords.slice(0, 4)} />
                  ) : null}
                  <Link
                    className={`${styles.articleCta} focus-ring mt-8 inline-flex min-h-11 items-center gap-2 self-start rounded-lg text-sm font-semibold`}
                    href={`/blog/${featured.slug}`}
                  >
                    Read the featured article
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </Container>
          </section>
        ) : null}

        <section
          className="border-b py-14 sm:py-20"
          aria-labelledby="discovery-heading"
        >
          <Container className="max-w-[100rem]">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <Eyebrow>Explore the archive</Eyebrow>
                <h2
                  id="discovery-heading"
                  className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
                >
                  Find the thinking you need.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-muted-foreground">
                Search the published library, then refine by category, tag, or
                editorial order.
              </p>
            </div>
            <form
              method="get"
              role="search"
              className={`${styles.filterPanel} mt-8 grid gap-4 rounded-2xl border bg-card p-4 shadow-soft md:grid-cols-2 xl:grid-cols-[2fr_repeat(4,1fr)_auto]`}
            >
              <label className={styles.filter}>
                <span>Search articles</span>
                <span className="relative">
                  <Search
                    className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <input
                    name="q"
                    defaultValue={filters.query}
                    className="focus-ring min-h-11 w-full rounded-lg border bg-background pl-10 pr-3"
                    placeholder="Search published content"
                    type="search"
                  />
                </span>
              </label>
              <FilterSelect
                label="Category"
                name="category"
                options={categories.map((item) => [item.id, item.name])}
                value={filters.category}
              />
              <FilterSelect
                label="Tag"
                name="tag"
                options={tags.map((item) => [item.id, item.name])}
                value={filters.tag}
              />
              <FilterSelect
                label="Sort"
                name="sort"
                options={[
                  ["newest", "Newest first"],
                  ["oldest", "Oldest first"],
                  ["featured", "Featured first"],
                ]}
                value={filters.sort}
              />
              <FilterSelect
                label="Per page"
                name="pageSize"
                options={[
                  ["12", "12 articles"],
                  ["24", "24 articles"],
                  ["48", "48 articles"],
                ]}
                value={String(filters.pageSize)}
              />
              <div className="flex items-end gap-2">
                <Button type="submit" className="min-h-11 flex-1 xl:flex-none">
                  <SlidersHorizontal className="size-4" aria-hidden="true" />
                  Apply
                </Button>
                <Button asChild variant="ghost" className="min-h-11">
                  <Link href="/blog">Reset</Link>
                </Button>
              </div>
            </form>
          </Container>
        </section>

        <section
          id="article-library"
          className="scroll-mt-28 border-b py-18 sm:py-24"
          aria-labelledby="articles-heading"
        >
          <Container className="max-w-[100rem]">
            <div className="flex items-end justify-between gap-6">
              <div>
                <Eyebrow>Published library</Eyebrow>
                <h2
                  id="articles-heading"
                  className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl"
                >
                  Articles worth keeping.
                </h2>
              </div>
              <p className="text-sm text-muted-foreground" aria-live="polite">
                {articles.count} {articles.count === 1 ? "article" : "articles"}
              </p>
            </div>

            {articles.data.length ? (
              remaining.length ? (
                <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {remaining.map((article, index) => (
                    <ArticleCard
                      article={article}
                      category={
                        article.category_id
                          ? categoryById.get(article.category_id)
                          : undefined
                      }
                      index={index}
                      key={article.id}
                    />
                  ))}
                </div>
              ) : (
                <p className="mt-10 rounded-2xl border border-dashed p-8 text-muted-foreground">
                  The featured article is the only published entry in this view.
                </p>
              )
            ) : (
              <div
                className={`${styles.emptyState} mt-10 rounded-3xl border border-dashed p-8 text-center sm:p-16`}
              >
                <span className="mx-auto grid size-14 place-items-center rounded-2xl border bg-card">
                  <BookOpen
                    className="size-6 text-muted-foreground"
                    aria-hidden="true"
                  />
                </span>
                <h3 className="mt-6 text-2xl font-semibold">
                  No published articles match this view.
                </h3>
                <p className="mx-auto mt-3 max-w-xl leading-7 text-muted-foreground">
                  Clear the current filters to return to the full published
                  library. No placeholder editorial content is inserted.
                </p>
                <Button asChild variant="outline" className="mt-7">
                  <Link href="/blog">View all published articles</Link>
                </Button>
              </div>
            )}

            {articles.totalPages > 1 ? (
              <nav
                className="mt-12 flex items-center justify-between gap-4 border-t pt-8"
                aria-label="Article pages"
              >
                <Button
                  asChild={articles.page > 1}
                  disabled={articles.page <= 1}
                  variant="outline"
                >
                  {articles.page > 1 ? (
                    <Link href={pageHref(filters, articles.page - 1)}>
                      Previous
                    </Link>
                  ) : (
                    <span>Previous</span>
                  )}
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {articles.page} of {articles.totalPages}
                </span>
                <Button
                  asChild={articles.page < articles.totalPages}
                  disabled={articles.page >= articles.totalPages}
                  variant="outline"
                >
                  {articles.page < articles.totalPages ? (
                    <Link href={pageHref(filters, articles.page + 1)}>
                      Next
                    </Link>
                  ) : (
                    <span>Next</span>
                  )}
                </Button>
              </nav>
            ) : null}
          </Container>
        </section>
      </main>

      <CTALayout
        eyebrow={
          <Eyebrow className="mb-3 text-xs text-primary-foreground/55">
            Turn insight into action
          </Eyebrow>
        }
        title="Have a digital challenge worth exploring?"
        description={
          <p className="max-w-2xl text-primary-foreground/70">
            Bring the context, constraints, and goals. We will help shape a
            practical discovery path.
          </p>
        }
        actions={
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">
              Start a project
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        }
        className={styles.finalCta}
      />
      <StructuredData data={schema} />
    </>
  );
}

function ArticleCard({
  article,
  category,
  index,
}: {
  readonly article: PublicBlogArticle;
  readonly category?: string;
  readonly index: number;
}) {
  return (
    <article
      className={`${styles.articleCard} group flex h-full flex-col overflow-hidden`}
      style={
        { "--reveal-delay": `${Math.min(index, 8) * 70}ms` } as CSSProperties
      }
    >
      <Link
        className="focus-ring relative block overflow-hidden"
        href={`/blog/${article.slug}`}
        aria-label={`Read article: ${article.title}`}
      >
        {article.featuredMedia ? (
          <CmsMedia
            media={article.featuredMedia}
            alt={article.featuredMedia.alt ?? article.title}
            sizes="(max-width: 768px) 100vw, 33vw"
            className={`${styles.cardMedia} aspect-[16/10] w-full object-cover`}
          />
        ) : (
          <div
            className={`${styles.cardMedia} grid aspect-[16/10] place-items-center`}
          >
            <BookOpen
              className="size-8 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="sr-only">
              No public featured image is configured
            </span>
          </div>
        )}
        <span
          className={`${styles.openArticle} absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-background text-foreground shadow-soft`}
          aria-hidden="true"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap gap-2">
          {article.is_featured ? <Badge>Featured</Badge> : null}
          {category ? <Badge variant="outline">{category}</Badge> : null}
        </div>
        <h3 className="mt-5 text-balance text-2xl font-bold tracking-tight">
          {article.title}
        </h3>
        <p className="mt-4 line-clamp-3 flex-1 text-sm leading-7 text-muted-foreground">
          {article.excerpt || article.description}
        </p>
        <ArticleMeta article={article} />
        {article.keywords.length ? (
          <TagList tags={article.keywords.slice(0, 3)} />
        ) : null}
        <Link
          className={`${styles.articleCta} focus-ring mt-7 inline-flex min-h-11 items-center gap-2 self-start rounded-lg text-sm font-semibold`}
          href={`/blog/${article.slug}`}
        >
          Continue reading
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

function ArticleMeta({ article }: { readonly article: PublicBlogArticle }) {
  if (!article.published_at && !article.reading_time_minutes) return null;
  return (
    <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
      {article.published_at ? (
        <span className="inline-flex items-center gap-2">
          <CalendarDays className="size-3.5" aria-hidden="true" />
          <time dateTime={article.published_at}>
            {publishedDate(article.published_at)}
          </time>
        </span>
      ) : null}
      {article.reading_time_minutes ? (
        <span className="inline-flex items-center gap-2">
          <Clock className="size-3.5" aria-hidden="true" />
          {article.reading_time_minutes} min read
        </span>
      ) : null}
    </div>
  );
}

function TagList({ tags }: { readonly tags: readonly string[] }) {
  return (
    <ul aria-label="Article tags" className="mt-5 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag}>
          <Badge variant="secondary">{tag}</Badge>
        </li>
      ))}
    </ul>
  );
}

function HeroMetric({
  label,
  value,
}: {
  readonly label: string;
  readonly value: string;
}) {
  return (
    <div className="bg-background/70 p-5 backdrop-blur sm:p-6">
      <span className="font-mono text-2xl font-semibold tracking-tight">
        {value}
      </span>
      <span className="mt-1 block text-xs uppercase tracking-[.14em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function FilterSelect({
  label,
  name,
  options,
  value,
}: {
  readonly label: string;
  readonly name: string;
  readonly options: readonly (readonly [string, string])[];
  readonly value?: string;
}) {
  return (
    <label className={styles.filter}>
      <span>{label}</span>
      <select
        name={name}
        defaultValue={value ?? ""}
        className="focus-ring min-h-11 rounded-lg border bg-background px-3"
      >
        <option value="">All</option>
        {options.map(([key, text]) => (
          <option key={key} value={key}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}
