import type { Metadata } from "next";

import { AdminContactLeads } from "@/features/admin";
import { requireAdmin } from "@/lib/auth/auth";
import { getPermissions } from "@/lib/auth/permissions";
import { createDatabaseClient } from "@/lib/database";
import {
  ContactLeadsRepository,
  type LeadPriority,
  type LeadSort,
} from "@/lib/database/repositories/contact-leads-repository";
import type { LeadStatus } from "@/types/database";

export const metadata: Metadata = {
  title: "Contact Leads CRM",
  description: "Manage Ayeb Solutions contact inquiries.",
  robots: { index: false, follow: false },
};
interface Props {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}
const statuses: readonly LeadStatus[] = [
  "new",
  "read",
  "in_progress",
  "replied",
  "won",
  "lost",
  "archived",
];
const priorities: readonly LeadPriority[] = ["low", "medium", "high", "urgent"];
const sorts: readonly LeadSort[] = [
  "newest",
  "oldest",
  "priority",
  "status",
  "company",
];
const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function AdminContactLeadsRoute({ searchParams }: Props) {
  const [params, user, client] = await Promise.all([
    searchParams,
    requireAdmin(),
    createDatabaseClient(),
  ]);
  const repository = new ContactLeadsRepository(client);
  const statusValue = first(params.status) as LeadStatus;
  const priorityValue = first(params.priority) as LeadPriority;
  const sortValue = first(params.sort) as LeadSort;
  const requestedSize = Number(first(params.pageSize));
  const pageSize: 25 | 50 | 100 =
    requestedSize === 50 ? 50 : requestedSize === 100 ? 100 : 25;
  const filters = {
    assignedTo: first(params.assignedTo) || undefined,
    dateFrom: first(params.dateFrom) || undefined,
    dateTo: first(params.dateTo) || undefined,
    pageSize,
    priority: priorities.includes(priorityValue) ? priorityValue : undefined,
    query: first(params.q)?.trim() || undefined,
    sort: sorts.includes(sortValue) ? sortValue : ("newest" as const),
    status: statuses.includes(statusValue) ? statusValue : undefined,
    service: first(params.service) || undefined,
    budget: first(params.budget) || undefined,
    hasReply: first(params.hasReply) === "true" ? true : undefined,
    needsFollowUp: first(params.needsFollowUp) === "true" ? true : undefined,
  };
  const [leads, assignees, filterOptions, templates, metrics, dueFollowUps] =
    await Promise.all([
      repository.findPage({
        ...filters,
        page: Math.max(1, Number(first(params.page)) || 1),
      }),
      repository.findAssignees(),
      repository.findFilterOptions(),
      user.role === "admin" ? repository.findTemplates() : Promise.resolve([]),
      user.role === "admin"
        ? repository.getEmailCenterMetrics()
        : Promise.resolve(null),
      user.role === "admin"
        ? repository.findDueFollowUps()
        : Promise.resolve([]),
    ]);
  const context = await repository.findContext(
    leads.data.map((lead) => lead.id),
  );
  const visibleLeads =
    user.role === "admin"
      ? leads
      : {
          ...leads,
          data: leads.data.map((lead) => ({ ...lead, notes: null })),
        };
  return (
    <AdminContactLeads
      assignees={assignees}
      canDelete={user.role === "admin"}
      canEdit={getPermissions(user.role).canManageContent}
      canManageNotes={user.role === "admin"}
      canCommunicate={user.role === "admin"}
      context={context}
      filters={filters}
      leads={visibleLeads}
      filterOptions={filterOptions}
      templates={templates}
      metrics={metrics}
      dueFollowUps={dueFollowUps}
    />
  );
}
