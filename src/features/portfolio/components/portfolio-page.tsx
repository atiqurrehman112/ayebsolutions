import Link from "next/link";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import { Card } from "@/components/cards/card";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { CmsMedia } from "@/components/media/cms-media";
import { CTALayout } from "@/components/layout/templates";
import { StructuredData } from "@/components/seo/structured-data";
import { SiteBreadcrumbs } from "@/components/shell/breadcrumbs";
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
  const p = new URLSearchParams();
  if (filters.query) p.set("q", filters.query);
  if (filters.category) p.set("category", filters.category);
  if (filters.tag) p.set("tag", filters.tag);
  p.set("sort", filters.sort);
  p.set("pageSize", String(filters.pageSize));
  p.set("page", String(page));
  return `/portfolio?${p}`;
}
export function PortfolioPage({
  categories,
  filters,
  projects,
  siteUrl,
  tags,
}: Props) {
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
      <section
        className={`${styles.hero} relative overflow-hidden border-b py-20 sm:py-28`}
      >
        <Container className="relative z-10 max-w-[100rem]">
          <SiteBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Portfolio", href: "/portfolio" },
            ]}
          />
          <div className="mt-14 max-w-5xl">
            <Eyebrow>Live portfolio</Eyebrow>
            <h1 className="mt-5 text-balance text-[clamp(3rem,8vw,7rem)] font-bold leading-[.92] tracking-[-.06em]">
              Work built around real business problems.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">
              Explore published projects from the Ayeb Solutions CMS. Every
              entry carries its own project type, context, technology, and
              editorial detail.
            </p>
          </div>
        </Container>
      </section>
      <section className="border-b py-16 sm:py-20">
        <Container className="max-w-[100rem]">
          <form
            className="grid gap-3 rounded-2xl border bg-card p-4 shadow-soft md:grid-cols-2 xl:grid-cols-[2fr_repeat(4,1fr)_auto]"
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
                  placeholder="Title, summary, or project type"
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
                ["newest", "Newest"],
                ["oldest", "Oldest"],
                ["featured", "Featured"],
                ["alphabetical", "Alphabetical"],
              ]}
              value={filters.sort}
            />
            <Select
              label="Per page"
              name="pageSize"
              options={[
                ["12", "12"],
                ["24", "24"],
                ["48", "48"],
              ]}
              value={String(filters.pageSize)}
            />
            <div className="flex items-end gap-2">
              <Button type="submit">Apply</Button>
              <Button asChild variant="ghost">
                <Link href="/portfolio">Reset</Link>
              </Button>
            </div>
          </form>
          <div className="mt-12 flex items-end justify-between gap-4">
            <div>
              <Eyebrow>Published work</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                {projects.count} {projects.count === 1 ? "project" : "projects"}
              </h2>
            </div>
            {filters.query || filters.category || filters.tag ? (
              <Badge variant="outline">Filtered view</Badge>
            ) : null}
          </div>
          {projects.data.length ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {projects.data.map((project) => (
                <Card
                  key={project.id}
                  className={`${styles.hoverCard} flex h-full flex-col overflow-hidden ${project.is_featured ? "md:col-span-2 xl:grid xl:grid-cols-[.85fr_1.15fr]" : ""}`}
                >
                  {project.cover ? (
                    <CmsMedia
                      media={project.cover}
                      alt={project.cover.alt ?? `${project.title} preview`}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className={`${styles.projectVisual} aspect-[16/10] w-full border-b object-cover`}
                    />
                  ) : (
                    <div
                      className={`${styles.projectVisual} grid place-items-center border-b`}
                    >
                      <Sparkles
                        className="size-8 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <span className="sr-only">
                        No project media is configured
                      </span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap gap-2">
                      <Badge>{project.project_type}</Badge>
                      {project.is_featured ? (
                        <Badge variant="secondary">Featured</Badge>
                      ) : null}
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold tracking-tight">
                      {project.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                      {project.summary}
                    </p>
                    <ul
                      aria-label={`${project.title} technologies`}
                      className="mt-5 flex flex-wrap gap-2"
                    >
                      {project.technologies.map((technology) => (
                        <li key={technology}>
                          <Badge variant="outline">{technology}</Badge>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="mt-6 w-full" variant="outline">
                      <Link href={`/portfolio/${project.slug}`}>
                        View project
                        <ArrowRight aria-hidden="true" className="size-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed p-16 text-center">
              <h3 className="text-xl font-semibold">
                No published projects found
              </h3>
              <p className="mt-3 text-muted-foreground">
                Try clearing the current search or filters.
              </p>
            </div>
          )}
          <nav
            aria-label="Portfolio pages"
            className="mt-10 flex items-center justify-end gap-4"
          >
            <Button
              asChild={projects.page > 1}
              disabled={projects.page <= 1}
              variant="outline"
            >
              {projects.page > 1 ? (
                <Link href={href(filters, projects.page - 1)}>Previous</Link>
              ) : (
                <span>Previous</span>
              )}
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {projects.page}
              {projects.totalPages ? ` of ${projects.totalPages}` : ""}
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
        </Container>
      </section>
      <CTALayout
        title="Have a project worth building well?"
        description="Tell us about the problem, constraints, and outcome you are working toward."
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
