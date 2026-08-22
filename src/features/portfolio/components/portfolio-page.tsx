import type { CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/cards/card";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { CTALayout } from "@/components/layout/templates";
import { CmsMedia } from "@/components/media/cms-media";
import { StructuredData } from "@/components/seo/structured-data";
import { SiteBreadcrumbs } from "@/components/shell/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import type { PaginatedResult } from "@/lib/database/repositories/base-repository";
import type {
  PublicPortfolioProject,
  PublicPortfolioSort,
} from "@/lib/database/repositories/portfolio-repository";
import { mediaSeoUrl } from "@/lib/media/media";
import styles from "./portfolio-page.module.css";

export interface PortfolioFilters {
  readonly category?: string;
  readonly pageSize: number;
  readonly query?: string;
  readonly sort: PublicPortfolioSort;
  readonly tag?: string;
}

interface FilterItem {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
}

interface Props {
  readonly categories: readonly FilterItem[];
  readonly filters: PortfolioFilters;
  readonly projects: PaginatedResult<PublicPortfolioProject>;
  readonly siteUrl: string;
  readonly tags: readonly FilterItem[];
}

function href(filters: PortfolioFilters, page: number) {
  const parameters = new URLSearchParams();
  if (filters.query) parameters.set("q", filters.query);
  if (filters.category) parameters.set("category", filters.category);
  if (filters.tag) parameters.set("tag", filters.tag);
  parameters.set("sort", filters.sort);
  parameters.set("pageSize", String(filters.pageSize));
  parameters.set("page", String(page));
  return `/portfolio?${parameters}`;
}

export function PortfolioPage({
  categories,
  filters,
  projects,
  siteUrl,
  tags,
}: Props) {
  const categoryById = new Map(
    categories.map((category) => [category.id, category.name]),
  );
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Portfolio",
    url: `${siteUrl}/portfolio`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.count,
      itemListElement: projects.data.map((project, index) => ({
        "@type": "ListItem",
        position: (projects.page - 1) * projects.pageSize + index + 1,
        url: `${siteUrl}/portfolio/${project.slug}`,
        name: project.title,
        image: mediaSeoUrl(project.cover),
      })),
    },
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
              { label: "Portfolio", href: "/portfolio" },
            ]}
          />
          <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:gap-20">
            <div className="max-w-6xl">
              <Eyebrow>Selected work · Published from our CMS</Eyebrow>
              <h1 className="mt-6 text-balance text-[clamp(3.25rem,8vw,7.5rem)] font-bold leading-[.87] tracking-[-.07em]">
                Digital products shaped around the problem.
              </h1>
            </div>
            <div className="lg:pb-2">
              <p className="max-w-xl text-lg leading-8 text-muted-foreground">
                Explore published web platforms, automation systems, and product
                experiences. Each case study reflects the context and detail
                currently available in the portfolio CMS.
              </p>
              <a
                className="focus-ring mt-7 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold"
                href="#published-work"
              >
                Explore the work
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-3">
            <HeroMetric
              label="Published projects"
              value={String(projects.count).padStart(2, "0")}
            />
            <HeroMetric
              label="Available disciplines"
              value={String(categories.length).padStart(2, "0")}
            />
            <HeroMetric label="Presentation" value="CMS-led" />
          </div>
        </Container>
      </header>

      <main>
        <section
          className="border-b py-14 sm:py-18"
          aria-labelledby="portfolio-controls-heading"
        >
          <Container className="max-w-[100rem]">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <Eyebrow>Find relevant work</Eyebrow>
                <h2
                  id="portfolio-controls-heading"
                  className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
                >
                  Refine the collection.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-muted-foreground">
                Search project context, then narrow by published category, tag,
                or editorial order.
              </p>
            </div>
            <form
              className={`${styles.filterPanel} mt-8 grid gap-4 rounded-2xl border bg-card p-4 shadow-soft md:grid-cols-2 xl:grid-cols-[2fr_repeat(4,1fr)_auto]`}
              method="get"
              role="search"
            >
              <label className={styles.filter}>
                <span>Search projects</span>
                <div>
                  <Search aria-hidden="true" />
                  <input
                    defaultValue={filters.query}
                    name="q"
                    placeholder="Search title, summary, or type"
                    type="search"
                  />
                </div>
              </label>
              <Select
                label="Category"
                name="category"
                options={categories.map((item) => [item.id, item.name])}
                value={filters.category}
              />
              <Select
                label="Tag"
                name="tag"
                options={tags.map((item) => [item.id, item.name])}
                value={filters.tag}
              />
              <Select
                label="Sort"
                name="sort"
                options={[
                  ["newest", "Newest first"],
                  ["oldest", "Oldest first"],
                  ["featured", "Featured first"],
                  ["alphabetical", "Title A–Z"],
                ]}
                value={filters.sort}
              />
              <Select
                label="Per page"
                name="pageSize"
                options={[
                  ["12", "12 projects"],
                  ["24", "24 projects"],
                  ["48", "48 projects"],
                ]}
                value={String(filters.pageSize)}
              />
              <div className="flex items-end gap-2">
                <Button type="submit" className="min-h-11 flex-1 xl:flex-none">
                  <SlidersHorizontal className="size-4" aria-hidden="true" />
                  Apply
                </Button>
                <Button asChild variant="ghost" className="min-h-11">
                  <Link href="/portfolio">Reset</Link>
                </Button>
              </div>
            </form>
          </Container>
        </section>

        <section
          id="published-work"
          className="scroll-mt-28 border-b py-18 sm:py-24"
          aria-labelledby="published-work-heading"
        >
          <Container className="max-w-[100rem]">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <Eyebrow>Published work</Eyebrow>
                <h2
                  id="published-work-heading"
                  className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl"
                >
                  {projects.count}{" "}
                  {projects.count === 1 ? "case study" : "case studies"}
                </h2>
              </div>
              {filters.query || filters.category || filters.tag ? (
                <Badge variant="outline">Filtered collection</Badge>
              ) : (
                <span className="text-sm text-muted-foreground">
                  Page {projects.page}
                </span>
              )}
            </div>

            {projects.data.length ? (
              <div
                className={`${styles.projectGrid} mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-12`}
              >
                {projects.data.map((project, index) => (
                  <ProjectCard
                    category={
                      project.category_id
                        ? categoryById.get(project.category_id)
                        : undefined
                    }
                    index={index}
                    key={project.id}
                    project={project}
                  />
                ))}
              </div>
            ) : (
              <div
                className={`${styles.emptyState} mt-10 rounded-3xl border border-dashed p-8 text-center sm:p-16`}
              >
                <span className="mx-auto grid size-14 place-items-center rounded-2xl border bg-card">
                  <BriefcaseBusiness
                    className="size-6 text-muted-foreground"
                    aria-hidden="true"
                  />
                </span>
                <h3 className="mt-6 text-2xl font-semibold">
                  No published projects match this view.
                </h3>
                <p className="mx-auto mt-3 max-w-lg leading-7 text-muted-foreground">
                  Clear the current filters to return to the complete published
                  collection. No placeholder project data is inserted.
                </p>
                <Button asChild className="mt-7" variant="outline">
                  <Link href="/portfolio">View all published work</Link>
                </Button>
              </div>
            )}

            {projects.totalPages > 1 ? (
              <nav
                aria-label="Portfolio pages"
                className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-8"
              >
                <Button
                  asChild={projects.page > 1}
                  disabled={projects.page <= 1}
                  variant="outline"
                >
                  {projects.page > 1 ? (
                    <Link href={href(filters, projects.page - 1)}>
                      Previous
                    </Link>
                  ) : (
                    <span>Previous</span>
                  )}
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {projects.page} of {projects.totalPages}
                </span>
                <Button
                  asChild={projects.page < projects.totalPages}
                  disabled={projects.page >= projects.totalPages}
                  variant="outline"
                >
                  {projects.page < projects.totalPages ? (
                    <Link href={href(filters, projects.page + 1)}>Next</Link>
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
        title="Have a problem worth solving well?"
        description="Bring the goals, constraints, and operating context. We will help shape the clearest useful next step."
        actions={
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">
              Start a conversation
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        }
      />
      <StructuredData data={schema} />
    </>
  );
}

function ProjectCard({
  category,
  index,
  project,
}: {
  readonly category?: string;
  readonly index: number;
  readonly project: PublicPortfolioProject;
}) {
  const result = project.results[0];
  const isWide = project.is_featured || index % 5 === 0;
  return (
    <Card
      className={`${styles.projectCard} ${isWide ? styles.wideCard : ""} group flex h-full flex-col overflow-hidden`}
      style={
        { "--reveal-delay": `${Math.min(index, 8) * 70}ms` } as CSSProperties
      }
    >
      <Link
        className={`${styles.mediaLink} focus-ring relative block overflow-hidden`}
        href={`/portfolio/${project.slug}`}
        aria-label={`View case study: ${project.title}`}
      >
        {project.cover ? (
          <CmsMedia
            media={project.cover}
            alt={project.cover.alt ?? `${project.title} project cover`}
            sizes={
              isWide
                ? "(max-width: 768px) 100vw, 66vw"
                : "(max-width: 768px) 100vw, 33vw"
            }
            className={`${styles.projectVisual} aspect-[16/10] w-full object-cover`}
          />
        ) : (
          <div
            className={`${styles.projectVisual} grid aspect-[16/10] place-items-center`}
          >
            <Sparkles
              className="size-8 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="sr-only">No public cover image is configured</span>
          </div>
        )}
        <span
          className={`${styles.openProject} absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-background text-foreground shadow-soft`}
          aria-hidden="true"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          {project.is_featured ? (
            <Badge variant="secondary">Featured</Badge>
          ) : null}
          <Badge variant="outline">{category ?? project.project_type}</Badge>
        </div>
        <h3 className="mt-5 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-muted-foreground">
          {project.summary}
        </p>
        {result ? (
          <div className="mt-5 border-l-2 border-primary/30 pl-4">
            <span className="text-[.65rem] font-semibold uppercase tracking-[.14em] text-muted-foreground">
              Published result
            </span>
            <p className="mt-1 line-clamp-2 text-sm leading-6">{result}</p>
          </div>
        ) : null}
        {project.technologies.length ? (
          <ul
            aria-label={`${project.title} technologies`}
            className="mt-6 flex flex-wrap gap-2"
          >
            {project.technologies.slice(0, 4).map((technology) => (
              <li key={technology}>
                <Badge variant="outline">{technology}</Badge>
              </li>
            ))}
          </ul>
        ) : null}
        <Link
          className={`${styles.cardCta} focus-ring mt-7 inline-flex min-h-11 items-center gap-2 self-start rounded-lg text-sm font-semibold`}
          href={`/portfolio/${project.slug}`}
        >
          Read the case study
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </Card>
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

function Select({
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
      <select defaultValue={value ?? ""} name={name}>
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
