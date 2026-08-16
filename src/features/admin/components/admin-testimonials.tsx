import Link from "next/link";
import { MessageSquareQuote, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import type { PaginatedResult } from "@/lib/database/repositories/base-repository";
import type { TestimonialSort } from "@/lib/database/repositories/testimonials-repository";
import type {
  ContentStatus,
  TestimonialApprovalStatus,
  TestimonialRow,
} from "@/types/database";
import { TestimonialDialog } from "./testimonial-dialog";
import { TestimonialRowActions } from "./testimonial-row-actions";
import styles from "./admin-testimonials.module.css";

export interface TestimonialFilters {
  readonly approval?: TestimonialApprovalStatus;
  readonly featured?: string;
  readonly pageSize: number;
  readonly query?: string;
  readonly sort: TestimonialSort;
  readonly status?: ContentStatus;
}
interface Props {
  readonly canDelete: boolean;
  readonly canEdit: boolean;
  readonly filters: TestimonialFilters;
  readonly testimonials: PaginatedResult<TestimonialRow>;
}
const statuses: Readonly<Record<ContentStatus, string>> = {
  archived: "Archived",
  draft: "Draft",
  published: "Published",
  review: "In review",
  scheduled: "Scheduled",
};
const approvals: Readonly<Record<TestimonialApprovalStatus, string>> = {
  approved: "Approved",
  pending: "Pending",
  rejected: "Rejected",
};
const sorts: readonly (readonly [TestimonialSort, string])[] = [
  ["display-asc", "Display order"],
  ["display-desc", "Display order, descending"],
  ["updated-desc", "Recently updated"],
  ["name-asc", "Reviewer name"],
  ["rating-desc", "Rating, high to low"],
];
function pageHref(filters: TestimonialFilters, page: number) {
  const p = new URLSearchParams();
  if (filters.query) p.set("q", filters.query);
  if (filters.status) p.set("status", filters.status);
  if (filters.approval) p.set("approval", filters.approval);
  if (filters.featured) p.set("featured", filters.featured);
  p.set("sort", filters.sort);
  p.set("pageSize", String(filters.pageSize));
  p.set("page", String(page));
  return `/admin/testimonials?${p.toString()}`;
}
export function AdminTestimonials({
  canDelete,
  canEdit,
  filters,
  testimonials,
}: Props) {
  const formatter = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeZone: "UTC",
  });
  const filtered = Boolean(
    filters.query || filters.status || filters.approval || filters.featured,
  );
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Trust content</span>
          <h1>Testimonials Management</h1>
          <p>
            Review consent-aware feedback, record approval, and control where
            verified testimonials become visible.
          </p>
        </div>
        {canEdit ? <TestimonialDialog mode="create" /> : null}
      </header>
      <section aria-label="Testimonial summary" className={styles.summary}>
        <article>
          <span>Matching testimonials</span>
          <strong>{testimonials.count}</strong>
        </article>
        <article>
          <span>Current page</span>
          <strong>
            {testimonials.totalPages
              ? `${testimonials.page} / ${testimonials.totalPages}`
              : "—"}
          </strong>
        </article>
        <article>
          <span>Access</span>
          <strong>{canEdit ? "Content editor" : "Read only"}</strong>
        </article>
      </section>
      <section
        aria-labelledby="testimonial-library-heading"
        className={styles.panel}
      >
        <div className={styles.panelHeading}>
          <div>
            <span className={styles.eyebrow}>Moderation library</span>
            <h2 id="testimonial-library-heading">
              Find, verify, and publish feedback
            </h2>
          </div>
          {!canEdit ? <p>Your viewer role has read-only access.</p> : null}
        </div>
        <form className={styles.filters} method="get" role="search">
          <label className={styles.search}>
            <span>Search testimonials</span>
            <div>
              <Search aria-hidden="true" />
              <input
                defaultValue={filters.query}
                name="q"
                placeholder="Name, company, position, or quote"
                type="search"
              />
            </div>
          </label>
          <Filter
            label="Publish status"
            name="status"
            options={Object.entries(statuses)}
            value={filters.status}
          />
          <Filter
            label="Approval"
            name="approval"
            options={Object.entries(approvals)}
            value={filters.approval}
          />
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
              <Link href="/admin/testimonials">Reset</Link>
            </Button>
          </div>
        </form>
        {testimonials.data.length ? (
          <div className={styles.tableWrap}>
            <table>
              <caption className="sr-only">
                Testimonials matching the current filters
              </caption>
              <thead>
                <tr>
                  <th scope="col">Reviewer</th>
                  <th scope="col">Approval</th>
                  <th scope="col">Status</th>
                  <th scope="col">Rating</th>
                  <th scope="col">Featured</th>
                  <th scope="col">Order</th>
                  <th scope="col">Updated</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.data.map((testimonial) => (
                  <tr key={testimonial.id}>
                    <th scope="row">
                      <strong>{testimonial.reviewer_name}</strong>
                      <span>
                        {testimonial.reviewer_role || "Position not provided"}
                        {testimonial.company_name
                          ? ` · ${testimonial.company_name}`
                          : ""}
                      </span>
                      <small>
                        {testimonial.consent_verified
                          ? "Consent verified"
                          : "Consent not verified"}
                      </small>
                    </th>
                    <td>
                      <Badge variant="outline">
                        {approvals[testimonial.approval_status]}
                      </Badge>
                    </td>
                    <td>
                      <Badge variant="outline">
                        {statuses[testimonial.status]}
                      </Badge>
                    </td>
                    <td>
                      {testimonial.rating
                        ? `${testimonial.rating} / 5`
                        : "Not rated"}
                    </td>
                    <td>{testimonial.is_featured ? "Yes" : "No"}</td>
                    <td>{testimonial.display_order}</td>
                    <td>
                      <time dateTime={testimonial.updated_at}>
                        {formatter.format(new Date(testimonial.updated_at))}
                      </time>
                    </td>
                    <td>
                      <TestimonialRowActions
                        canDelete={canDelete}
                        canEdit={canEdit}
                        testimonial={testimonial}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.empty}>
            <MessageSquareQuote aria-hidden="true" />
            <h3>No testimonials yet</h3>
            <p>
              {filtered
                ? "No testimonials match these filters. Reset them to view the full library."
                : "Create your first testimonial after confirming the source and consent context."}
            </p>
            {canEdit && !filtered ? (
              <TestimonialDialog mode="create" />
            ) : (
              <Button asChild variant="outline">
                <Link href="/admin/testimonials">Reset filters</Link>
              </Button>
            )}
          </div>
        )}
        {testimonials.totalPages > 1 ? (
          <nav
            aria-label="Testimonial pagination"
            className={styles.pagination}
          >
            <Button
              asChild={testimonials.page > 1}
              disabled={testimonials.page <= 1}
              variant="outline"
            >
              {testimonials.page > 1 ? (
                <Link href={pageHref(filters, testimonials.page - 1)}>
                  Previous
                </Link>
              ) : (
                <span>Previous</span>
              )}
            </Button>
            <span>
              Page {testimonials.page} of {testimonials.totalPages}
            </span>
            <Button
              asChild={testimonials.page < testimonials.totalPages}
              disabled={testimonials.page >= testimonials.totalPages}
              variant="outline"
            >
              {testimonials.page < testimonials.totalPages ? (
                <Link href={pageHref(filters, testimonials.page + 1)}>
                  Next
                </Link>
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
