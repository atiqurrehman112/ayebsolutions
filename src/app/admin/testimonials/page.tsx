import type { Metadata } from "next";

import { AdminTestimonials } from "@/features/admin";
import { requireAdmin } from "@/lib/auth/auth";
import { getPermissions } from "@/lib/auth/permissions";
import { createDatabaseClient } from "@/lib/database";
import {
  TestimonialsRepository,
  type TestimonialSort,
} from "@/lib/database/repositories/testimonials-repository";
import type {
  ContentStatus,
  TestimonialApprovalStatus,
} from "@/types/database";

export const metadata: Metadata = {
  title: "Testimonials Management",
  description: "Manage Ayeb Solutions testimonial content and approvals.",
  robots: { index: false, follow: false },
};

interface Props {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}
const statuses: readonly ContentStatus[] = [
  "draft",
  "review",
  "published",
  "archived",
];
const approvals: readonly TestimonialApprovalStatus[] = [
  "pending",
  "approved",
  "rejected",
];
const sorts: readonly TestimonialSort[] = [
  "display-asc",
  "display-desc",
  "updated-desc",
  "name-asc",
  "rating-desc",
];
function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
export default async function AdminTestimonialsRoute({ searchParams }: Props) {
  const [params, user] = await Promise.all([searchParams, requireAdmin()]);
  const statusValue = first(params.status);
  const approvalValue = first(params.approval);
  const featuredValue = first(params.featured);
  const sortValue = first(params.sort);
  const pageSizeValue = Number(first(params.pageSize));
  const pageSize = [25, 50, 100].includes(pageSizeValue) ? pageSizeValue : 25;
  const filters = {
    approval: approvals.includes(approvalValue as TestimonialApprovalStatus)
      ? (approvalValue as TestimonialApprovalStatus)
      : undefined,
    featured:
      featuredValue === "true" || featuredValue === "false"
        ? featuredValue
        : undefined,
    pageSize,
    query: first(params.q)?.trim() || undefined,
    sort: sorts.includes(sortValue as TestimonialSort)
      ? (sortValue as TestimonialSort)
      : "display-asc",
    status: statuses.includes(statusValue as ContentStatus)
      ? (statusValue as ContentStatus)
      : undefined,
  } as const;
  const repository = new TestimonialsRepository(await createDatabaseClient());
  const testimonials = await repository.findPage({
    approval: filters.approval,
    featured:
      filters.featured === undefined ? undefined : filters.featured === "true",
    page: Math.max(1, Number(first(params.page)) || 1),
    pageSize,
    query: filters.query,
    sort: filters.sort,
    status: filters.status,
  });
  const permissions = getPermissions(user.role);
  return (
    <AdminTestimonials
      canDelete={user.role === "admin"}
      canEdit={permissions.canManageContent}
      filters={filters}
      testimonials={testimonials}
    />
  );
}
