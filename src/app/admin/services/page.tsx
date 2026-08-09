import type { Metadata } from "next";

import { AdminServices } from "@/features/admin";
import { requireAdmin } from "@/lib/auth/auth";
import { getPermissions } from "@/lib/auth/permissions";
import { createDatabaseClient } from "@/lib/database";
import {
  ServicesRepository,
  type ServiceSort,
} from "@/lib/database/repositories/services-repository";
import type { ContentStatus } from "@/types/database";
import { z } from "zod";

export const metadata: Metadata = {
  title: "Services Management",
  description: "Manage Ayeb Solutions service content.",
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
const sorts: readonly ServiceSort[] = [
  "display-asc",
  "display-desc",
  "title-asc",
  "title-desc",
  "updated-desc",
];
function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
export default async function AdminServicesRoute({ searchParams }: Props) {
  const [params, user] = await Promise.all([searchParams, requireAdmin()]);
  const statusValue = first(params.status);
  const categoryValue = first(params.category);
  const featuredValue = first(params.featured);
  const sortValue = first(params.sort);
  const pageSizeValue = Number(first(params.pageSize));
  const pageSize = [25, 50, 100].includes(pageSizeValue) ? pageSizeValue : 25;
  const filters = {
    category: z.uuid().safeParse(categoryValue).success
      ? categoryValue
      : undefined,
    featured:
      featuredValue === "true" || featuredValue === "false"
        ? featuredValue
        : undefined,
    pageSize,
    query: first(params.q)?.trim() || undefined,
    sort: sorts.includes(sortValue as ServiceSort)
      ? (sortValue as ServiceSort)
      : "display-asc",
    status: statuses.includes(statusValue as ContentStatus)
      ? (statusValue as ContentStatus)
      : undefined,
  } as const;
  const repository = new ServicesRepository(await createDatabaseClient());
  const [services, categories] = await Promise.all([
    repository.findPage({
      categoryId: filters.category,
      featured:
        filters.featured === undefined
          ? undefined
          : filters.featured === "true",
      page: Math.max(1, Number(first(params.page)) || 1),
      pageSize,
      query: filters.query,
      sort: filters.sort,
      status: filters.status,
    }),
    repository.findCategories(),
  ]);
  const permissions = getPermissions(user.role);
  return (
    <AdminServices
      canDelete={user.role === "admin"}
      canEdit={permissions.canManageContent}
      categories={categories}
      filters={filters}
      services={services}
    />
  );
}
