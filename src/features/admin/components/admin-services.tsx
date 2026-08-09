import Link from "next/link";
import { Search, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import type { PaginatedResult } from "@/lib/database/repositories/base-repository";
import type { ServiceSort } from "@/lib/database/repositories/services-repository";
import type { CategoryRow, ContentStatus, ServiceRow } from "@/types/database";
import { ServiceDialog } from "./service-dialog";
import { ServiceRowActions } from "./service-row-actions";
import styles from "./admin-services.module.css";

export interface ServiceFilters {
  readonly category?: string;
  readonly featured?: string;
  readonly pageSize: number;
  readonly query?: string;
  readonly sort: ServiceSort;
  readonly status?: ContentStatus;
}
interface Props {
  readonly services: PaginatedResult<ServiceRow>;
  readonly canDelete: boolean;
  readonly canEdit: boolean;
  readonly categories: readonly Pick<CategoryRow, "id" | "name" | "slug">[];
  readonly filters: ServiceFilters;
}
const statuses: Readonly<Record<ContentStatus, string>> = {
  archived: "Archived",
  draft: "Draft",
  published: "Published",
  review: "In review",
};
const sorts: readonly (readonly [ServiceSort, string])[] = [
  ["display-asc", "Display order"],
  ["display-desc", "Display order, descending"],
  ["title-asc", "Title, A–Z"],
  ["title-desc", "Title, Z–A"],
  ["updated-desc", "Recently updated"],
];
function pageHref(filters: ServiceFilters, page: number) {
  const p = new URLSearchParams();
  if (filters.query) p.set("q", filters.query);
  if (filters.status) p.set("status", filters.status);
  if (filters.category) p.set("category", filters.category);
  if (filters.featured) p.set("featured", filters.featured);
  p.set("sort", filters.sort);
  p.set("pageSize", String(filters.pageSize));
  p.set("page", String(page));
  return `/admin/services?${p.toString()}`;
}

export function AdminServices({
  services,
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
    filters.query || filters.status || filters.category || filters.featured,
  );
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Offer management</span>
          <h1>Services Management</h1>
          <p>
            Maintain the service catalogue, publication state, display priority,
            and discoverability from one workspace.
          </p>
        </div>
        {canEdit ? (
          <ServiceDialog categories={categories} mode="create" />
        ) : null}
      </header>
      <section aria-label="Service summary" className={styles.summary}>
        <article>
          <span>Matching services</span>
          <strong>{services.count}</strong>
        </article>
        <article>
          <span>Current page</span>
          <strong>
            {services.totalPages
              ? `${services.page} / ${services.totalPages}`
              : "—"}
          </strong>
        </article>
        <article>
          <span>Access</span>
          <strong>{canEdit ? "Content editor" : "Read only"}</strong>
        </article>
      </section>
      <section
        aria-labelledby="service-library-heading"
        className={styles.panel}
      >
        <div className={styles.panelHeading}>
          <div>
            <span className={styles.eyebrow}>Service catalogue</span>
            <h2 id="service-library-heading">Find and manage services</h2>
          </div>
          {!canEdit ? <p>Your viewer role has read-only access.</p> : null}
        </div>
        <form className={styles.filters} method="get" role="search">
          <label className={styles.search}>
            <span>Search services</span>
            <div>
              <Search aria-hidden="true" />
              <input
                defaultValue={filters.query}
                name="q"
                placeholder="Title, summary, or description"
                type="search"
              />
            </div>
          </label>
          <Filter
            label="Status"
            name="status"
            options={Object.entries(statuses)}
            value={filters.status}
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
            options={[
              ["true", "Featured"],
              ["false", "Not featured"],
            ]}
            value={filters.featured}
          />
          <Filter
            label="Sort"
            name="sort"
            options={sorts}
            value={filters.sort}
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
              <Link href="/admin/services">Reset</Link>
            </Button>
          </div>
        </form>
        {services.data.length ? (
          <div className={styles.tableWrap}>
            <table>
              <caption className="sr-only">
                Services matching the current filters
              </caption>
              <thead>
                <tr>
                  <th scope="col">Service</th>
                  <th scope="col">Category</th>
                  <th scope="col">Status</th>
                  <th scope="col">Featured</th>
                  <th scope="col">Order</th>
                  <th scope="col">Updated</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.data.map((service) => (
                  <tr key={service.id}>
                    <th scope="row">
                      <strong>{service.title}</strong>
                      <span>/{service.slug}</span>
                      <small>
                        {service.icon || "No icon"}
                        {service.keywords.length
                          ? ` · ${service.keywords.slice(0, 2).join(" · ")}`
                          : ""}
                      </small>
                    </th>
                    <td>
                      {service.category_id
                        ? (categoryNames.get(service.category_id) ??
                          "Uncategorized")
                        : "Uncategorized"}
                    </td>
                    <td>
                      <Badge variant="outline">
                        {statuses[service.status]}
                      </Badge>
                    </td>
                    <td>{service.is_featured ? "Yes" : "No"}</td>
                    <td>{service.sort_order}</td>
                    <td>
                      <time dateTime={service.updated_at}>
                        {formatter.format(new Date(service.updated_at))}
                      </time>
                    </td>
                    <td>
                      <ServiceRowActions
                        canDelete={canDelete}
                        canEdit={canEdit}
                        categories={categories}
                        service={service}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.empty}>
            <Settings2 aria-hidden="true" />
            <h3>No services yet</h3>
            <p>
              {filtered
                ? "No services match these filters. Reset them to view the full catalogue."
                : "Create your first service to begin the catalogue."}
            </p>
            {canEdit && !filtered ? (
              <ServiceDialog categories={categories} mode="create" />
            ) : (
              <Button asChild variant="outline">
                <Link href="/admin/services">Reset filters</Link>
              </Button>
            )}
          </div>
        )}
        {services.totalPages > 1 ? (
          <nav aria-label="Service pagination" className={styles.pagination}>
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
            <span>
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
