import Link from "next/link";
import { Inbox, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import type { PaginatedResult } from "@/lib/database/repositories/base-repository";
import type {
  LeadContext,
  LeadPriority,
  LeadSort,
} from "@/lib/database/repositories/contact-leads-repository";
import type { ContactLeadRow, LeadStatus, ProfileRow } from "@/types/database";
import { LeadRowActions } from "./lead-row-actions";
import styles from "./admin-contact-leads.module.css";

export interface LeadFilters {
  readonly assignedTo?: string;
  readonly dateFrom?: string;
  readonly dateTo?: string;
  readonly pageSize: number;
  readonly priority?: LeadPriority;
  readonly query?: string;
  readonly sort: LeadSort;
  readonly status?: LeadStatus;
}
interface Props {
  readonly assignees: readonly Pick<
    ProfileRow,
    "display_name" | "id" | "role"
  >[];
  readonly canDelete: boolean;
  readonly canEdit: boolean;
  readonly context: Readonly<Record<string, LeadContext>>;
  readonly filters: LeadFilters;
  readonly leads: PaginatedResult<ContactLeadRow>;
}
const statusLabels: Readonly<Record<LeadStatus, string>> = {
  archived: "Archived",
  contacted: "Contacted",
  lost: "Lost",
  new: "New",
  proposal_sent: "Proposal sent",
  qualified: "Qualified",
  won: "Won",
};
const priorities: readonly LeadPriority[] = ["low", "medium", "high", "urgent"];
function pageHref(filters: LeadFilters, page: number) {
  const p = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) p.set(key, String(value));
  });
  p.set("page", String(page));
  return `/admin/contact-leads?${p}`;
}
export function AdminContactLeads({
  assignees,
  canDelete,
  canEdit,
  context,
  filters,
  leads,
}: Props) {
  const names = new Map(
    assignees.map((profile) => [
      profile.id,
      profile.display_name ?? profile.role,
    ]),
  );
  const date = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeZone: "UTC",
  });
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Inquiry operations</span>
          <h1>Contact Leads CRM</h1>
          <p>
            Review incoming project inquiries, coordinate ownership, document
            decisions, and keep every response accountable.
          </p>
        </div>
        <Badge variant="secondary">Supabase connected</Badge>
      </header>
      <section aria-label="Lead summary" className={styles.summary}>
        <article>
          <span>Matching leads</span>
          <strong>{leads.count}</strong>
        </article>
        <article>
          <span>Current page</span>
          <strong>
            {leads.totalPages ? `${leads.page} / ${leads.totalPages}` : "—"}
          </strong>
        </article>
        <article>
          <span>Access</span>
          <strong>{canEdit ? "Manage" : "Read only"}</strong>
        </article>
      </section>
      <section aria-labelledby="lead-inbox-heading" className={styles.panel}>
        <div className={styles.panelHeading}>
          <div>
            <span className={styles.eyebrow}>Live inbox</span>
            <h2 id="lead-inbox-heading">Find and manage inquiries</h2>
          </div>
          {!canEdit ? <p>Your viewer role has read-only access.</p> : null}
        </div>
        <form className={styles.filters} method="get" role="search">
          <label className={styles.search}>
            <span>Search</span>
            <div>
              <Search aria-hidden="true" />
              <input
                defaultValue={filters.query}
                name="q"
                placeholder="Name, email, company, subject, message"
                type="search"
              />
            </div>
          </label>
          <Filter
            label="Status"
            name="status"
            options={Object.entries(statusLabels)}
            value={filters.status}
          />
          <Filter
            label="Priority"
            name="priority"
            options={priorities.map((item) => [item, item])}
            value={filters.priority}
          />
          <Filter
            label="Assigned user"
            name="assignedTo"
            options={[
              ["unassigned", "Unassigned"],
              ...assignees.map(
                (item) => [item.id, item.display_name ?? item.role] as const,
              ),
            ]}
            value={filters.assignedTo}
          />
          <label>
            <span>From</span>
            <input
              defaultValue={filters.dateFrom}
              name="dateFrom"
              type="date"
            />
          </label>
          <label>
            <span>To</span>
            <input defaultValue={filters.dateTo} name="dateTo" type="date" />
          </label>
          <Filter
            label="Sort"
            name="sort"
            options={[
              ["newest", "Newest"],
              ["oldest", "Oldest"],
              ["priority", "Priority"],
              ["status", "Status"],
              ["company", "Company"],
            ]}
            value={filters.sort}
          />
          <Filter
            label="Per page"
            name="pageSize"
            options={[
              ["25", "25"],
              ["50", "50"],
              ["100", "100"],
            ]}
            value={String(filters.pageSize)}
          />
          <div className={styles.filterActions}>
            <Button type="submit">Apply</Button>
            <Button asChild variant="ghost">
              <Link href="/admin/contact-leads">Reset</Link>
            </Button>
          </div>
        </form>
        {leads.data.length ? (
          <div className={styles.tableWrap}>
            <table>
              <caption className="sr-only">
                Contact leads matching the current filters
              </caption>
              <thead>
                <tr>
                  <th scope="col">Lead</th>
                  <th scope="col">Project</th>
                  <th scope="col">Priority</th>
                  <th scope="col">Status</th>
                  <th scope="col">Assigned</th>
                  <th scope="col">Received</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.data.map((lead) => (
                  <tr key={lead.id}>
                    <th scope="row">
                      <strong>{lead.name}</strong>
                      <span>{lead.company || lead.email}</span>
                    </th>
                    <td>
                      <strong>{lead.subject || lead.project_type}</strong>
                      <span>{lead.source}</span>
                    </td>
                    <td>
                      <Badge
                        variant={
                          lead.priority === "urgent" ? "warning" : "outline"
                        }
                      >
                        {lead.priority}
                      </Badge>
                    </td>
                    <td>
                      <Badge variant="secondary">
                        {statusLabels[lead.status]}
                      </Badge>
                    </td>
                    <td>
                      {lead.assigned_to
                        ? (names.get(lead.assigned_to) ?? "Unknown user")
                        : "Unassigned"}
                    </td>
                    <td>{date.format(new Date(lead.created_at))}</td>
                    <td>
                      <LeadRowActions
                        assignees={assignees}
                        canDelete={canDelete}
                        canEdit={canEdit}
                        context={
                          context[lead.id] ?? { emails: [], statuses: [] }
                        }
                        lead={lead}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.empty}>
            <Inbox aria-hidden="true" />
            <h3>No leads found</h3>
            <p>
              New inquiries will appear here after they are stored in Supabase.
            </p>
          </div>
        )}
        <nav aria-label="Lead pages" className={styles.pagination}>
          <Button
            asChild={leads.page > 1}
            disabled={leads.page <= 1}
            variant="outline"
          >
            {leads.page > 1 ? (
              <Link href={pageHref(filters, leads.page - 1)}>Previous</Link>
            ) : (
              <span>Previous</span>
            )}
          </Button>
          <span>
            Page {leads.page}
            {leads.totalPages ? ` of ${leads.totalPages}` : ""}
          </span>
          <Button
            asChild={leads.page < leads.totalPages}
            disabled={leads.page >= leads.totalPages}
            variant="outline"
          >
            {leads.page < leads.totalPages ? (
              <Link href={pageHref(filters, leads.page + 1)}>Next</Link>
            ) : (
              <span>Next</span>
            )}
          </Button>
        </nav>
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
