import Link from "next/link";
import { FolderKanban, Search } from "lucide-react";

import { Badge } from "@/components/ui/status";
import { Button } from "@/components/ui/button";
import type { PaginatedResult } from "@/lib/database/repositories/base-repository";
import type {
  CategoryRow,
  ContentStatus,
  PortfolioProjectRow,
} from "@/types/database";

import { PortfolioProjectDialog } from "./portfolio-project-dialog";
import { PortfolioRowActions } from "./portfolio-row-actions";
import styles from "./admin-portfolio.module.css";

export interface PortfolioFilters {
  readonly category?: string;
  readonly featured?: string;
  readonly pageSize: number;
  readonly query?: string;
  readonly status?: ContentStatus;
}

interface AdminPortfolioProps {
  readonly categories: readonly Pick<CategoryRow, "id" | "name" | "slug">[];
  readonly canDelete: boolean;
  readonly canEdit: boolean;
  readonly filters: PortfolioFilters;
  readonly projects: PaginatedResult<PortfolioProjectRow>;
}

const statusLabels: Readonly<Record<ContentStatus, string>> = {
  archived: "Archived",
  draft: "Draft",
  published: "Published",
  review: "In review",
  scheduled: "Scheduled",
};

function pageHref(filters: PortfolioFilters, page: number) {
  const params = new URLSearchParams();
  if (filters.query) params.set("q", filters.query);
  if (filters.status) params.set("status", filters.status);
  if (filters.category) params.set("category", filters.category);
  if (filters.featured) params.set("featured", filters.featured);
  params.set("pageSize", String(filters.pageSize));
  params.set("page", String(page));
  return `/admin/portfolio?${params.toString()}`;
}

export function AdminPortfolio({
  categories,
  canDelete,
  canEdit,
  filters,
  projects,
}: AdminPortfolioProps) {
  const categoryNames = new Map(
    categories.map((category) => [category.id, category.name]),
  );
  const dateFormatter = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeZone: "UTC",
  });

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Content operations</span>
          <h1>Portfolio Management</h1>
          <p>
            Shape, review, and publish the project stories shown on the public
            portfolio.
          </p>
        </div>
        {canEdit ? (
          <PortfolioProjectDialog categories={categories} mode="create" />
        ) : null}
      </header>

      <section className={styles.summary} aria-label="Portfolio summary">
        <article>
          <span>Matching projects</span>
          <strong>{projects.count}</strong>
        </article>
        <article>
          <span>Current page</span>
          <strong>
            {projects.totalPages
              ? `${projects.page} / ${projects.totalPages}`
              : "—"}
          </strong>
        </article>
        <article>
          <span>Access</span>
          <strong>{canEdit ? "Content editor" : "Read only"}</strong>
        </article>
      </section>

      <section
        aria-labelledby="portfolio-library-title"
        className={styles.panel}
      >
        <div className={styles.panelHeading}>
          <div>
            <span className={styles.kicker}>Project library</span>
            <h2 id="portfolio-library-title">Find and manage projects</h2>
          </div>
          {!canEdit ? (
            <p className={styles.readOnly}>
              Your viewer role has read-only access.
            </p>
          ) : null}
        </div>

        <form className={styles.filters} method="get" role="search">
          <label className={styles.search}>
            <span>Search projects</span>
            <div>
              <Search aria-hidden="true" />
              <input
                defaultValue={filters.query}
                name="q"
                placeholder="Title, summary, or type"
                type="search"
              />
            </div>
          </label>
          <label>
            <span>Status</span>
            <select defaultValue={filters.status ?? ""} name="status">
              <option value="">All statuses</option>
              {Object.entries(statusLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Category</span>
            <select defaultValue={filters.category ?? ""} name="category">
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Featured</span>
            <select defaultValue={filters.featured ?? ""} name="featured">
              <option value="">All projects</option>
              <option value="true">Featured</option>
              <option value="false">Not featured</option>
            </select>
          </label>
          <label>
            <span>Per page</span>
            <select defaultValue={String(filters.pageSize)} name="pageSize">
              {[25, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
          <div className={styles.filterActions}>
            <Button type="submit">Apply</Button>
            <Button asChild variant="ghost">
              <Link href="/admin/portfolio">Reset</Link>
            </Button>
          </div>
        </form>

        {projects.data.length ? (
          <div className={styles.tableWrap}>
            <table>
              <caption className="sr-only">
                Portfolio projects matching the current filters
              </caption>
              <thead>
                <tr>
                  <th scope="col">Project</th>
                  <th scope="col">Category</th>
                  <th scope="col">Status</th>
                  <th scope="col">Featured</th>
                  <th scope="col">Updated</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.data.map((project) => (
                  <tr key={project.id}>
                    <th scope="row">
                      <strong>{project.title}</strong>
                      <span>{project.slug}</span>
                    </th>
                    <td>
                      {project.category_id
                        ? (categoryNames.get(project.category_id) ??
                          "Uncategorized")
                        : "Uncategorized"}
                    </td>
                    <td>
                      <Badge variant="outline">
                        {statusLabels[project.status]}
                      </Badge>
                    </td>
                    <td>{project.is_featured ? "Yes" : "No"}</td>
                    <td>
                      <time dateTime={project.updated_at}>
                        {dateFormatter.format(new Date(project.updated_at))}
                      </time>
                    </td>
                    <td>
                      <PortfolioRowActions
                        canDelete={canDelete}
                        canEdit={canEdit}
                        categories={categories}
                        project={project}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.empty}>
            <FolderKanban aria-hidden="true" />
            <h3>No projects yet</h3>
            <p>
              {filters.query ||
              filters.status ||
              filters.category ||
              filters.featured
                ? "No projects match these filters. Reset them to view the full library."
                : "Create your first project to begin building the portfolio library."}
            </p>
            {canEdit &&
            !filters.query &&
            !filters.status &&
            !filters.category &&
            !filters.featured ? (
              <PortfolioProjectDialog categories={categories} mode="create" />
            ) : (
              <Button asChild variant="outline">
                <Link href="/admin/portfolio">Reset filters</Link>
              </Button>
            )}
          </div>
        )}

        {projects.totalPages > 1 ? (
          <nav aria-label="Portfolio pagination" className={styles.pagination}>
            <Button
              asChild={projects.page > 1}
              disabled={projects.page <= 1}
              variant="outline"
            >
              {projects.page > 1 ? (
                <Link href={pageHref(filters, projects.page - 1)}>
                  Previous
                </Link>
              ) : (
                <span>Previous</span>
              )}
            </Button>
            <span>
              Page {projects.page} of {projects.totalPages}
            </span>
            <Button
              asChild={projects.page < projects.totalPages}
              disabled={projects.page >= projects.totalPages}
              variant="outline"
            >
              {projects.page < projects.totalPages ? (
                <Link href={pageHref(filters, projects.page + 1)}>Next</Link>
              ) : (
                <span>Next</span>
              )}
            </Button>
          </nav>
        ) : null}
      </section>
    </main>
  );
}
