import Link from "next/link";
import { BookOpen, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import type { PaginatedResult } from "@/lib/database/repositories/base-repository";
import type {
  AppRole,
  BlogArticleRow,
  CategoryRow,
  ContentStatus,
} from "@/types/database";
import { BlogArticleDialog } from "./blog-article-dialog";
import { BlogRowActions } from "./blog-row-actions";
import styles from "./admin-blog.module.css";

export interface BlogFilters {
  readonly authorRole?: AppRole;
  readonly category?: string;
  readonly featured?: string;
  readonly pageSize: number;
  readonly query?: string;
  readonly status?: ContentStatus;
}
interface Props {
  readonly articles: PaginatedResult<BlogArticleRow>;
  readonly canDelete: boolean;
  readonly canEdit: boolean;
  readonly categories: readonly Pick<CategoryRow, "id" | "name" | "slug">[];
  readonly filters: BlogFilters;
}
const statusLabels: Readonly<Record<ContentStatus, string>> = {
  archived: "Archived",
  draft: "Draft",
  published: "Published",
  review: "In review",
};
const roleLabels: Readonly<Record<AppRole, string>> = {
  admin: "Admin",
  editor: "Editor",
  viewer: "Viewer",
};

function pageHref(filters: BlogFilters, page: number) {
  const params = new URLSearchParams();
  if (filters.query) params.set("q", filters.query);
  if (filters.status) params.set("status", filters.status);
  if (filters.category) params.set("category", filters.category);
  if (filters.featured) params.set("featured", filters.featured);
  if (filters.authorRole) params.set("authorRole", filters.authorRole);
  params.set("pageSize", String(filters.pageSize));
  params.set("page", String(page));
  return `/admin/blog?${params.toString()}`;
}

export function AdminBlog({
  articles,
  canDelete,
  canEdit,
  categories,
  filters,
}: Props) {
  const categoryNames = new Map(
    categories.map((category) => [category.id, category.name]),
  );
  const formatter = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeZone: "UTC",
  });
  const filtered = Boolean(
    filters.query ||
    filters.status ||
    filters.category ||
    filters.featured ||
    filters.authorRole,
  );
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Editorial operations</span>
          <h1>Blog Management</h1>
          <p>
            Draft, review, and publish useful insights through one focused
            editorial workspace.
          </p>
        </div>
        {canEdit ? (
          <BlogArticleDialog categories={categories} mode="create" />
        ) : null}
      </header>
      <section aria-label="Article summary" className={styles.summary}>
        <article>
          <span>Matching articles</span>
          <strong>{articles.count}</strong>
        </article>
        <article>
          <span>Current page</span>
          <strong>
            {articles.totalPages
              ? `${articles.page} / ${articles.totalPages}`
              : "—"}
          </strong>
        </article>
        <article>
          <span>Access</span>
          <strong>{canEdit ? "Content editor" : "Read only"}</strong>
        </article>
      </section>
      <section
        aria-labelledby="article-library-heading"
        className={styles.panel}
      >
        <div className={styles.panelHeading}>
          <div>
            <span className={styles.eyebrow}>Article library</span>
            <h2 id="article-library-heading">Find and manage articles</h2>
          </div>
          {!canEdit ? <p>Your viewer role has read-only access.</p> : null}
        </div>
        <form className={styles.filters} method="get" role="search">
          <label className={styles.search}>
            <span>Search articles</span>
            <div>
              <Search aria-hidden="true" />
              <input
                defaultValue={filters.query}
                name="q"
                placeholder="Title, excerpt, content, or tag"
                type="search"
              />
            </div>
          </label>
          <Filter
            label="Status"
            name="status"
            value={filters.status}
            options={Object.entries(statusLabels)}
          />
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
          <Filter
            label="Featured"
            name="featured"
            value={filters.featured}
            options={[
              ["true", "Featured"],
              ["false", "Not featured"],
            ]}
          />
          <Filter
            label="Author role"
            name="authorRole"
            value={filters.authorRole}
            options={Object.entries(roleLabels)}
          />
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
              <Link href="/admin/blog">Reset</Link>
            </Button>
          </div>
        </form>
        {articles.data.length ? (
          <div className={styles.tableWrap}>
            <table>
              <caption className="sr-only">
                Articles matching the current filters
              </caption>
              <thead>
                <tr>
                  <th scope="col">Article</th>
                  <th scope="col">Category</th>
                  <th scope="col">Status</th>
                  <th scope="col">Reading time</th>
                  <th scope="col">Featured</th>
                  <th scope="col">Updated</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.data.map((article) => (
                  <tr key={article.id}>
                    <th scope="row">
                      <strong>{article.title}</strong>
                      <span>/{article.slug}</span>
                      <small>
                        {article.keywords.slice(0, 3).join(" · ") || "No tags"}
                      </small>
                    </th>
                    <td>
                      {article.category_id
                        ? (categoryNames.get(article.category_id) ??
                          "Uncategorized")
                        : "Uncategorized"}
                    </td>
                    <td>
                      <Badge variant="outline">
                        {statusLabels[article.status]}
                      </Badge>
                    </td>
                    <td>
                      {article.reading_time_minutes
                        ? `${article.reading_time_minutes} min`
                        : "Not set"}
                    </td>
                    <td>{article.is_featured ? "Yes" : "No"}</td>
                    <td>
                      <time dateTime={article.updated_at}>
                        {formatter.format(new Date(article.updated_at))}
                      </time>
                    </td>
                    <td>
                      <BlogRowActions
                        article={article}
                        canDelete={canDelete}
                        canEdit={canEdit}
                        categories={categories}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.empty}>
            <BookOpen aria-hidden="true" />
            <h3>No articles yet</h3>
            <p>
              {filtered
                ? "No articles match these filters. Reset them to see the full library."
                : "Create your first article to begin the editorial library."}
            </p>
            {canEdit && !filtered ? (
              <BlogArticleDialog categories={categories} mode="create" />
            ) : (
              <Button asChild variant="outline">
                <Link href="/admin/blog">Reset filters</Link>
              </Button>
            )}
          </div>
        )}
        {articles.totalPages > 1 ? (
          <nav aria-label="Article pagination" className={styles.pagination}>
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
            <span>
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
      </section>
    </main>
  );
}

function Filter({
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
    <label>
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
