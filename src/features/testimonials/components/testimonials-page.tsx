import Link from "next/link";
import { ArrowRight, Quote, Search, Star } from "lucide-react";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { CmsMedia } from "@/components/media/cms-media";
import { CTALayout } from "@/components/layout/templates";
import { StructuredData } from "@/components/seo/structured-data";
import { SiteBreadcrumbs } from "@/components/shell/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import type { PaginatedResult } from "@/lib/database/repositories/base-repository";
import type {
  PublicTestimonial,
  PublicTestimonialSort,
} from "@/lib/database/repositories/testimonials-repository";
import styles from "./testimonials-page.module.css";

export interface TestimonialFilters {
  readonly featured?: boolean;
  readonly industry?: string;
  readonly pageSize: number;
  readonly query?: string;
  readonly rating?: number;
  readonly sort: PublicTestimonialSort;
}
interface Props {
  readonly filters: TestimonialFilters;
  readonly industries: readonly string[];
  readonly siteName: string;
  readonly siteUrl: string;
  readonly testimonials: PaginatedResult<PublicTestimonial>;
}
function href(filters: TestimonialFilters, page: number) {
  const p = new URLSearchParams();
  if (filters.query) p.set("q", filters.query);
  if (filters.industry) p.set("industry", filters.industry);
  if (filters.rating) p.set("rating", String(filters.rating));
  if (filters.featured !== undefined)
    p.set("featured", String(filters.featured));
  p.set("sort", filters.sort);
  p.set("pageSize", String(filters.pageSize));
  p.set("page", String(page));
  return `/testimonials?${p}`;
}
export function TestimonialsPage({
  filters,
  industries,
  siteName,
  siteUrl,
  testimonials,
}: Props) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Testimonials",
        item: `${siteUrl}/testimonials`,
      },
    ],
  } as const;
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
  } as const;
  return (
    <>
      <section className={`${styles.hero} border-b py-20 sm:py-28`}>
        <Container className="max-w-[100rem]">
          <SiteBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Testimonials", href: "/testimonials" },
            ]}
          />
          <div className="mt-14 max-w-5xl">
            <Eyebrow>Testimonials</Eyebrow>
            <h1 className="mt-5 text-balance text-[clamp(3rem,8vw,7rem)] font-bold leading-[.92] tracking-[-.06em]">
              Feedback shared with permission.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">
              Browse feedback that has completed review, received consent, and
              been published through the Ayeb Solutions CMS.
            </p>
          </div>
        </Container>
      </section>
      <section
        className="border-b py-14 sm:py-20"
        aria-labelledby="testimonial-list-heading"
      >
        <Container className="max-w-[100rem]">
          <form
            method="get"
            role="search"
            className="grid gap-3 rounded-2xl border bg-card p-4 shadow-soft md:grid-cols-2 xl:grid-cols-[2fr_repeat(5,1fr)_auto]"
          >
            <label className={styles.filter}>
              <span>Search</span>
              <span className="relative">
                <Search
                  className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  name="q"
                  defaultValue={filters.query}
                  className="focus-ring min-h-11 w-full rounded-lg border bg-background pl-10 pr-3"
                  placeholder="Reviewer, company, quote"
                />
              </span>
            </label>
            <label className={styles.filter}>
              <span>Rating</span>
              <select
                name="rating"
                defaultValue={filters.rating ?? ""}
                className="focus-ring min-h-11 rounded-lg border bg-background px-3"
              >
                <option value="">All ratings</option>
                {[5, 4, 3, 2, 1].map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </label>
            <label className={styles.filter}>
              <span>Featured</span>
              <select
                name="featured"
                defaultValue={
                  filters.featured === undefined ? "" : String(filters.featured)
                }
                className="focus-ring min-h-11 rounded-lg border bg-background px-3"
              >
                <option value="">All</option>
                <option value="true">Featured</option>
                <option value="false">Standard</option>
              </select>
            </label>
            <label className={styles.filter}>
              <span>Industry</span>
              <select
                name="industry"
                defaultValue={filters.industry ?? ""}
                className="focus-ring min-h-11 rounded-lg border bg-background px-3"
              >
                <option value="">All industries</option>
                {industries.map((item) => (
                  <option key={item}>{item}</option>
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
                <option value="display">Display order</option>
                <option value="highest-rating">Highest rating</option>
                <option value="newest">Newest</option>
              </select>
            </label>
            <label className={styles.filter}>
              <span>Per page</span>
              <select
                name="pageSize"
                defaultValue={filters.pageSize}
                className="focus-ring min-h-11 rounded-lg border bg-background px-3"
              >
                {[12, 24, 48].map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </label>
            <Button type="submit" className="self-end">
              Apply
            </Button>
          </form>
          <div className="mt-16 flex items-end justify-between gap-6">
            <div>
              <Eyebrow>Published feedback</Eyebrow>
              <h2
                id="testimonial-list-heading"
                className="mt-4 text-headline font-bold"
              >
                Reviewed voices, presented clearly.
              </h2>
            </div>
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {testimonials.count}{" "}
              {testimonials.count === 1 ? "testimonial" : "testimonials"}
            </p>
          </div>
          {testimonials.data.length ? (
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {testimonials.data.map((item) => (
                <figure
                  key={item.id}
                  className={`${styles.card} flex flex-col rounded-2xl border bg-card p-6`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <Quote
                      className="size-6 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <div className="flex gap-2">
                      {item.is_featured ? <Badge>Featured</Badge> : null}
                      {item.rating ? (
                        <span
                          className="flex items-center gap-1 text-sm"
                          aria-label={`${item.rating} out of 5 stars`}
                        >
                          <Star
                            className="size-4 fill-current"
                            aria-hidden="true"
                          />
                          {item.rating}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <blockquote className="mt-6 flex-1 text-lg leading-8">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="mt-7 border-t pt-5">
                    <div className="flex items-center gap-3">
                      {item.avatar ? (
                        <span className={styles.avatar}>
                          <CmsMedia
                            media={item.avatar}
                            alt={item.avatar.alt ?? item.reviewer_name}
                            sizes="96px"
                            className="size-full object-cover"
                          />
                        </span>
                      ) : null}
                      <div>
                        <strong className="block">{item.reviewer_name}</strong>
                        {item.reviewer_role ? (
                          <span className="text-sm text-muted-foreground">
                            {item.reviewer_role}
                          </span>
                        ) : null}
                      </div>
                      {item.companyLogo ? (
                        <CmsMedia
                          media={item.companyLogo}
                          alt={
                            item.companyLogo.alt ??
                            `${item.company_name ?? "Company"} logo`
                          }
                          sizes="120px"
                          className="ml-auto max-h-8 w-auto"
                        />
                      ) : null}
                    </div>
                    {item.company_name || item.industry ? (
                      <p className="mt-4 text-sm text-muted-foreground">
                        {[item.company_name, item.industry]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    ) : null}
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border bg-card p-10 text-center">
              <Quote
                className="mx-auto size-8 text-muted-foreground"
                aria-hidden="true"
              />
              <h3 className="mt-5 text-2xl font-semibold">
                No published testimonials found
              </h3>
              <p className="mt-3 text-muted-foreground">
                Adjust the filters or return when consented feedback has been
                published.
              </p>
              <Button asChild variant="outline" className="mt-6">
                <Link href="/testimonials">Clear filters</Link>
              </Button>
            </div>
          )}
          {testimonials.totalPages > 1 ? (
            <nav
              className="mt-12 flex items-center justify-between gap-4"
              aria-label="Testimonial pages"
            >
              <Button
                asChild={testimonials.page > 1}
                disabled={testimonials.page <= 1}
                variant="outline"
              >
                {testimonials.page > 1 ? (
                  <Link href={href(filters, testimonials.page - 1)}>
                    Previous
                  </Link>
                ) : (
                  <span>Previous</span>
                )}
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {testimonials.page} of {testimonials.totalPages}
              </span>
              <Button
                asChild={testimonials.page < testimonials.totalPages}
                disabled={testimonials.page >= testimonials.totalPages}
                variant="outline"
              >
                {testimonials.page < testimonials.totalPages ? (
                  <Link href={href(filters, testimonials.page + 1)}>Next</Link>
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
            Your project
          </Eyebrow>
        }
        title="Ready to discuss what comes next?"
        description={
          <p className="max-w-2xl text-primary-foreground/70">
            Share your goals and constraints so we can plan an appropriate
            discovery process.
          </p>
        }
        actions={
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">
              Start a conversation
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        }
      />
      <StructuredData data={organization} />
      <StructuredData data={breadcrumb} />
      {testimonials.data.map((item) => (
        <StructuredData
          key={item.id}
          data={{
            "@context": "https://schema.org",
            "@type": "Review",
            author: { "@type": "Person", name: item.reviewer_name },
            reviewBody: item.quote,
            itemReviewed: {
              "@type": "Organization",
              name: siteName,
              url: siteUrl,
            },
            reviewRating: item.rating
              ? {
                  "@type": "Rating",
                  ratingValue: item.rating,
                  bestRating: 5,
                  worstRating: 1,
                }
              : undefined,
          }}
        />
      ))}
    </>
  );
}
