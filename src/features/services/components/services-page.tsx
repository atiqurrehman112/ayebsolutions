import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Braces,
  Code2,
  Cog,
  Layers3,
  Palette,
  Search,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { CmsMedia } from "@/components/media/cms-media";
import { CTALayout } from "@/components/layout/templates";
import { StructuredData } from "@/components/seo/structured-data";
import { SiteBreadcrumbs } from "@/components/shell/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import type { PaginatedResult } from "@/lib/database/repositories/base-repository";
import type {
  PublicService,
  PublicServiceSort,
} from "@/lib/database/repositories/services-repository";
import { mediaSeoUrl } from "@/lib/media/media";
import styles from "./services-page.module.css";

const icons: Readonly<Record<string, LucideIcon>> = {
  braces: Braces,
  bot: Bot,
  code: Code2,
  code2: Code2,
  cog: Cog,
  link2: Braces,
  layers: Layers3,
  layers3: Layers3,
  palette: Palette,
  api: Braces,
  panelstopleft: Layers3,
  workflow: Cog,
};
export function serviceIcon(name: string | null) {
  const key = name?.replace(/[^a-z0-9]/gi, "").toLowerCase() ?? "";
  return icons[key] ?? Sparkles;
}
interface Category {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
}
export interface ServiceFilters {
  readonly category?: string;
  readonly featured?: boolean;
  readonly pageSize: number;
  readonly query?: string;
  readonly sort: PublicServiceSort;
}
interface Props {
  readonly categories: readonly Category[];
  readonly filters: ServiceFilters;
  readonly services: PaginatedResult<PublicService>;
  readonly siteUrl: string;
}
function pageHref(filters: ServiceFilters, page: number) {
  const params = new URLSearchParams();
  if (filters.query) params.set("q", filters.query);
  if (filters.category) params.set("category", filters.category);
  if (filters.featured !== undefined)
    params.set("featured", String(filters.featured));
  params.set("sort", filters.sort);
  params.set("pageSize", String(filters.pageSize));
  params.set("page", String(page));
  return `/services?${params}`;
}

export function ServicesPage({
  categories,
  filters,
  services,
  siteUrl,
}: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Services",
    url: `${siteUrl}/services`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: services.count,
      itemListElement: services.data.map((service, index) => ({
        "@type": "ListItem",
        position: (services.page - 1) * services.pageSize + index + 1,
        name: service.title,
        url: `${siteUrl}/services/${service.slug}`,
        image: mediaSeoUrl(service.cover),
      })),
    },
  } as const;
  return (
    <>
      <section
        className={`${styles.heroBackground} relative overflow-hidden border-b py-20 sm:py-28`}
      >
        <Container className="relative z-10 max-w-[100rem]">
          <SiteBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
            ]}
          />
          <div className="mt-14 max-w-5xl">
            <Eyebrow>Published services</Eyebrow>
            <h1 className="mt-5 text-balance text-[clamp(3rem,8vw,7rem)] font-bold leading-[.92] tracking-[-.06em]">
              Digital capability, shaped around the work.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">
              Explore services currently published by Ayeb Solutions, with clear
              capabilities, technologies, and delivery context from the CMS.
            </p>
          </div>
        </Container>
      </section>
      <section
        className="border-b py-14 sm:py-20"
        aria-labelledby="services-heading"
      >
        <Container className="max-w-[100rem]">
          <form
            method="get"
            role="search"
            className="grid gap-3 rounded-2xl border bg-card p-4 shadow-soft md:grid-cols-2 xl:grid-cols-[2fr_repeat(4,1fr)_auto]"
          >
            <label className={styles.filter}>
              <span>Search services</span>
              <span className="relative">
                <Search
                  className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  name="q"
                  defaultValue={filters.query}
                  className="focus-ring min-h-11 w-full rounded-lg border bg-background pl-10 pr-3"
                  placeholder="Search published services"
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
              <span>Featured</span>
              <select
                name="featured"
                defaultValue={
                  filters.featured === undefined ? "" : String(filters.featured)
                }
                className="focus-ring min-h-11 rounded-lg border bg-background px-3"
              >
                <option value="">All services</option>
                <option value="true">Featured</option>
                <option value="false">Standard</option>
              </select>
            </label>
            <label className={styles.filter}>
              <span>Sort</span>
              <select
                name="sort"
                defaultValue={filters.sort}
                className="focus-ring min-h-11 rounded-lg border bg-background px-3"
              >
                <option value="display-asc">Display order</option>
                <option value="display-desc">Reverse order</option>
                <option value="title-asc">Title A–Z</option>
                <option value="title-desc">Title Z–A</option>
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
              <Eyebrow>Service catalogue</Eyebrow>
              <h2
                id="services-heading"
                className="mt-4 text-headline font-bold"
              >
                Expertise connected to outcomes.
              </h2>
            </div>
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {services.count} {services.count === 1 ? "service" : "services"}
            </p>
          </div>
          {services.data.length ? (
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {services.data.map((service) => {
                const Icon = serviceIcon(service.icon);
                return (
                  <article
                    key={service.id}
                    className={`${styles.serviceCard} rounded-2xl border bg-card p-6 sm:p-8`}
                  >
                    {service.cover ? (
                      <CmsMedia
                        media={service.cover}
                        alt={service.cover.alt ?? `${service.title} service`}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="mb-6 aspect-[16/9] w-full rounded-xl object-cover"
                      />
                    ) : null}
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid size-12 place-items-center rounded-xl border bg-muted/30">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      {service.is_featured ? <Badge>Featured</Badge> : null}
                    </div>
                    <h3 className="mt-7 text-balance text-2xl font-bold tracking-tight">
                      {service.title}
                    </h3>
                    <p className="mt-4 line-clamp-3 leading-7 text-muted-foreground">
                      {service.summary}
                    </p>
                    {service.technologies.length ? (
                      <ul
                        className="mt-6 flex flex-wrap gap-2"
                        aria-label={`${service.title} technologies`}
                      >
                        {service.technologies.slice(0, 4).map((technology) => (
                          <li key={technology}>
                            <Badge variant="outline">{technology}</Badge>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <Button asChild variant="outline" className="mt-8">
                      <Link
                        href={`/services/${service.slug}`}
                        aria-label={`Explore ${service.title}`}
                      >
                        Explore service{" "}
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    </Button>
                    <p className="mt-5 truncate font-mono text-[0.65rem] text-muted-foreground">
                      /services/{service.slug}
                    </p>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border bg-card p-10 text-center">
              <Sparkles
                className="mx-auto size-8 text-muted-foreground"
                aria-hidden="true"
              />
              <h3 className="mt-5 text-2xl font-semibold">
                No published services found
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Adjust the filters or return when matching services have been
                published.
              </p>
              <Button asChild variant="outline" className="mt-6">
                <Link href="/services">Clear filters</Link>
              </Button>
            </div>
          )}
          {services.totalPages > 1 ? (
            <nav
              className="mt-12 flex items-center justify-between gap-4"
              aria-label="Service pages"
            >
              <Button
                asChild={services.page > 1}
                disabled={services.page <= 1}
                variant="outline"
              >
                {services.page > 1 ? (
                  <Link href={pageHref(filters, services.page - 1)}>
                    Previous
                  </Link>
                ) : (
                  <span>Previous</span>
                )}
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {services.page} of {services.totalPages}
              </span>
              <Button
                asChild={services.page < services.totalPages}
                disabled={services.page >= services.totalPages}
                variant="outline"
              >
                {services.page < services.totalPages ? (
                  <Link href={pageHref(filters, services.page + 1)}>Next</Link>
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
            Start with discovery
          </Eyebrow>
        }
        title="Need a solution shaped around your workflow?"
        description={
          <p className="max-w-2xl text-primary-foreground/70">
            Share the business context and technical constraints. We can help
            identify an appropriate path.
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
        className={styles.finalPanel}
      />
      <StructuredData data={schema} />
    </>
  );
}
