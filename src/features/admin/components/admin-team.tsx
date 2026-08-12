import Link from "next/link";
import { Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import type { PaginatedResult } from "@/lib/database/repositories/base-repository";
import type { TeamMemberSort } from "@/lib/database/repositories/team-repository";
import type { MediaLibraryRow, TeamMemberRow } from "@/types/database";
import { TeamMemberDialog } from "./team-member-dialog";
import { TeamOrderManager } from "./team-order-manager";
import { TeamRowActions } from "./team-row-actions";
import styles from "./admin-team.module.css";

export interface TeamFilters {
  readonly department?: string;
  readonly featured?: string;
  readonly pageSize: number;
  readonly query?: string;
  readonly sort: TeamMemberSort;
  readonly status?: "draft" | "published";
}
export function AdminTeam({
  canDelete,
  canEdit,
  departments,
  filters,
  media,
  members,
}: {
  readonly canDelete: boolean;
  readonly canEdit: boolean;
  readonly departments: readonly string[];
  readonly filters: TeamFilters;
  readonly media: readonly MediaLibraryRow[];
  readonly members: PaginatedResult<TeamMemberRow>;
}) {
  const filtered = Boolean(
    filters.query || filters.department || filters.featured || filters.status,
  );
  const formatter = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeZone: "UTC",
  });
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>People and expertise</span>
          <h1>Team Management</h1>
          <p>
            Create truthful team profiles, select portraits from the Media
            Library, and control publication and placement.
          </p>
        </div>
        {canEdit ? <TeamMemberDialog media={media} mode="create" /> : null}
      </header>
      <section aria-label="Team summary" className={styles.summary}>
        <article>
          <span>Matching members</span>
          <strong>{members.count}</strong>
        </article>
        <article>
          <span>Current page</span>
          <strong>
            {members.totalPages
              ? `${members.page} / ${members.totalPages}`
              : "—"}
          </strong>
        </article>
        <article>
          <span>Access</span>
          <strong>{canEdit ? "Content editor" : "Read only"}</strong>
        </article>
      </section>
      <section aria-labelledby="team-library-heading" className={styles.panel}>
        <div className={styles.panelHeading}>
          <div>
            <span className={styles.eyebrow}>Profile library</span>
            <h2 id="team-library-heading">Find and manage team members</h2>
          </div>
          {!canEdit ? (
            <p className={styles.muted}>
              Your viewer role has read-only access.
            </p>
          ) : null}
        </div>
        <form className={styles.filters} method="get" role="search">
          <label>
            <span>Search team</span>
            <div className="relative">
              <Search
                className="absolute left-3 top-3 size-4"
                aria-hidden="true"
              />
              <input
                className="pl-9"
                defaultValue={filters.query}
                name="q"
                placeholder="Name, role, department, or bio"
                type="search"
              />
            </div>
          </label>
          <Filter
            label="Status"
            name="status"
            options={[
              ["draft", "Draft"],
              ["published", "Published"],
            ]}
            value={filters.status}
          />
          <Filter
            label="Department"
            name="department"
            options={departments.map((item) => [item, item] as const)}
            value={filters.department}
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
            options={[
              ["order-asc", "Display order"],
              ["order-desc", "Display order, reverse"],
              ["name-asc", "Name"],
              ["updated-desc", "Recently updated"],
            ]}
            value={filters.sort}
          />
          <label>
            <span>Per page</span>
            <select defaultValue={String(filters.pageSize)} name="pageSize">
              {[25, 50, 100].map((size) => (
                <option key={size}>{size}</option>
              ))}
            </select>
          </label>
          <div className={styles.filterActions}>
            <Button type="submit">Apply</Button>
            <Button asChild variant="ghost">
              <Link href="/admin/team">Reset</Link>
            </Button>
          </div>
        </form>
        {members.data.length ? (
          <div className={styles.tableWrap}>
            <table>
              <caption className="sr-only">
                Team members matching the current filters
              </caption>
              <thead>
                <tr>
                  <th scope="col">Member</th>
                  <th scope="col">Department</th>
                  <th scope="col">Status</th>
                  <th scope="col">Featured</th>
                  <th scope="col">Order</th>
                  <th scope="col">Updated</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.data.map((member) => (
                  <tr key={member.id}>
                    <th scope="row">
                      <strong>{member.name}</strong>
                      <span>
                        {member.role} · /{member.slug}
                      </span>
                    </th>
                    <td>{member.department || "Unassigned"}</td>
                    <td>
                      <Badge variant="outline">
                        {member.status === "published" ? "Published" : "Draft"}
                      </Badge>
                    </td>
                    <td>{member.featured ? "Yes" : "No"}</td>
                    <td>{member.display_order}</td>
                    <td>
                      <time dateTime={member.updated_at}>
                        {formatter.format(new Date(member.updated_at))}
                      </time>
                    </td>
                    <td>
                      <TeamRowActions
                        canDelete={canDelete}
                        canEdit={canEdit}
                        media={media}
                        member={member}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.empty}>
            <Users aria-hidden="true" />
            <h3>No team members yet</h3>
            <p>
              {filtered
                ? "No members match these filters."
                : "Create the first truthful team profile."}
            </p>
            {canEdit && !filtered ? (
              <TeamMemberDialog media={media} mode="create" />
            ) : (
              <Button asChild variant="outline">
                <Link href="/admin/team">Reset filters</Link>
              </Button>
            )}
          </div>
        )}
        {members.totalPages > 1 ? (
          <nav aria-label="Team pagination" className={styles.pagination}>
            <PageButton
              disabled={members.page <= 1}
              href={pageHref(filters, members.page - 1)}
            >
              Previous
            </PageButton>
            <span>
              Page {members.page} of {members.totalPages}
            </span>
            <PageButton
              disabled={members.page >= members.totalPages}
              href={pageHref(filters, members.page + 1)}
            >
              Next
            </PageButton>
          </nav>
        ) : null}
      </section>
      {canEdit && members.data.length > 1 ? (
        <section aria-labelledby="team-order-heading" className={styles.panel}>
          <div className={styles.panelHeading}>
            <div>
              <span className={styles.eyebrow}>Display sequence</span>
              <h2 id="team-order-heading">Order this result page</h2>
            </div>
            <p className={styles.muted}>
              Use the unfiltered first page for the complete primary order.
            </p>
          </div>
          <TeamOrderManager members={members.data} />
        </section>
      ) : null}
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
function pageHref(filters: TeamFilters, page: number) {
  const p = new URLSearchParams();
  if (filters.query) p.set("q", filters.query);
  if (filters.status) p.set("status", filters.status);
  if (filters.department) p.set("department", filters.department);
  if (filters.featured) p.set("featured", filters.featured);
  p.set("sort", filters.sort);
  p.set("pageSize", String(filters.pageSize));
  p.set("page", String(page));
  return `/admin/team?${p}`;
}
function PageButton({
  children,
  disabled,
  href,
}: {
  readonly children: string;
  readonly disabled: boolean;
  readonly href: string;
}) {
  return (
    <Button asChild={!disabled} disabled={disabled} variant="outline">
      {disabled ? <span>{children}</span> : <Link href={href}>{children}</Link>}
    </Button>
  );
}
