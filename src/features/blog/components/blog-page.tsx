import Link from "next/link";
import { ArrowRight, BookOpen, Search } from "lucide-react";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { CTALayout } from "@/components/layout/templates";
import { StructuredData } from "@/components/seo/structured-data";
import { SiteBreadcrumbs } from "@/components/shell/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import type { PaginatedResult } from "@/lib/database/repositories/base-repository";
import type { PublicBlogSort } from "@/lib/database/repositories/blog-repository";
import type { BlogArticleRow } from "@/types/database";
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
  readonly articles: PaginatedResult<BlogArticleRow>;
  readonly categories: readonly FilterItem[];
  readonly filters: BlogFilters;
  readonly siteUrl: string;
  readonly tags: readonly FilterItem[];
}

function pageHref(filters: BlogFilters, page: number) {
  const params = new URLSearchParams();
  if (filters.query) params.set("q", filters.query);
  if (filters.category) params.set("category", filters.category);
  if (filters.tag) params.set("tag", filters.tag);
  params.set("sort", filters.sort);
  params.set("pageSize", String(filters.pageSize));
  params.set("page", String(page));
  return `/blog?${params}`;
}

export function BlogPage({
  articles,
  categories,
  filters,
  siteUrl,
  tags,
}: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Ayeb Solutions Insights",
    url: `${siteUrl}/blog`,
    blogPost: articles.data.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      url: `${siteUrl}/blog/${article.slug}`,
    })),
  } as const;
  return (
    <>
      <section
        className={`${styles.hero} relative overflow-hidden border-b py-20 sm:py-28`}
      >
        <Container className="relative z-10 max-w-[100rem]">
          <SiteBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Insights", href: "/blog" },
            ]}
          />
          <div className="mt-14 max-w-5xl">
            <Eyebrow>Insights &amp; resources</Eyebrow>
            <h1 className="mt-5 text-balance text-[clamp(3rem,8vw,7rem)] font-bold leading-[.92] tracking-[-.06em]">
              Useful thinking for better digital decisions.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">
              Browse published guidance on web development, automation, product
              design, integrations, and maintainable software.
            </p>
          </div>
        </Container>
      </section>
      <section
        className="border-b py-14 sm:py-20"
        aria-labelledby="articles-heading"
      >
        <Container className="max-w-[100rem]">
          <form
            method="get"
            role="search"
            className="grid gap-3 rounded-2xl border bg-card p-4 shadow-soft md:grid-cols-2 xl:grid-cols-[2fr_repeat(4,1fr)_auto]"
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
                />
              </span>
            </label>
            <label className={styles.filter}>
              <span>Category</span>
              <select
                name="category"
                defaultValue={filters.category ?? ""}
                className="focus-ring min-h-11 rounded-lg border bg-background px-3"
              >
                <option value="">All categories</option>
                {categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.filter}>
              <span>Tag</span>
              <select
                name="tag"
                defaultValue={filters.tag ?? ""}
                className="focus-ring min-h-11 rounded-lg border bg-background px-3"
              >
                <option value="">All tags</option>
                {tags.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.filter}>
              <span>Sort</span>
              <select
                name="sort"
                defaultValue={filters.sort}
                className="focus-ring min-h-11 rounded-lg border bg-background px-3"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="featured">Featured</option>
              </select>
            </label>
            <label className={styles.filter}>
              <span>Per page</span>
              <select
                name="pageSize"
                defaultValue={filters.pageSize}
                className="focus-ring min-h-11 rounded-lg border bg-background px-3"
              >
                {[12, 24, 48].map((size) => (
                  <option key={size}>{size}</option>
                ))}
              </select>
            </label>
            <Button type="submit" className="self-end">
              Apply
            </Button>
          </form>
          <div className="mt-16 flex items-end justify-between gap-6">
            <div>
              <Eyebrow>Published library</Eyebrow>
              <h2
                id="articles-heading"
                className="mt-4 text-headline font-bold"
              >
                Articles worth keeping.
              </h2>
            </div>
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {articles.count} {articles.count === 1 ? "article" : "articles"}
            </p>
          </div>
          {articles.data.length ? (
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {articles.data.map((article) => (
                <article key={article.id} className={styles.articleCard}>
                  <div className="flex flex-wrap gap-2">
                    {article.is_featured ? <Badge>Featured</Badge> : null}
                    <Badge variant="outline">Published</Badge>
                  </div>
                  <h3 className="mt-6 text-balance text-2xl font-bold tracking-tight">
                    {article.title}
                  </h3>
                  <p className="mt-4 line-clamp-3 leading-7 text-muted-foreground">
                    {article.excerpt || article.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    {article.reading_time_minutes ? (
                      <span>{article.reading_time_minutes} min read</span>
                    ) : null}
                    {article.published_at ? (
                      <time dateTime={article.published_at}>
                        {new Intl.DateTimeFormat("en", {
                          dateStyle: "medium",
                        }).format(new Date(article.published_at))}
                      </time>
                    ) : null}
                  </div>
                  <Button asChild variant="outline" className="mt-8">
                    <Link href={`/blog/${article.slug}`}>
                      Read article{" "}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border bg-card p-10 text-center">
              <BookOpen
                className="mx-auto size-8 text-muted-foreground"
                aria-hidden="true"
              />
              <h3 className="mt-5 text-2xl font-semibold">
                No published articles found
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Adjust the filters or return later when matching editorial
                content has been published.
              </p>
              <Button asChild variant="outline" className="mt-6">
                <Link href="/blog">Clear filters</Link>
              </Button>
            </div>
          )}
          {articles.totalPages > 1 ? (
            <nav
              className="mt-12 flex items-center justify-between gap-4"
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
                  <Link href={pageHref(filters, articles.page + 1)}>Next</Link>
                ) : (
                  <span>Next</span>
                )}
              </Button>
            </nav>
          ) : null}
        </Container>
      </section>
      <CTALayout
        eyebrow={
          <Eyebrow className="mb-3 text-xs text-primary-foreground/55">
            Plan the next step
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
              Start a project{" "}
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
