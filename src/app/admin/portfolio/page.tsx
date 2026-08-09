import type { Metadata } from "next";

import { AdminPortfolio } from "@/features/admin";
import { requireAdmin } from "@/lib/auth/auth";
import { getPermissions } from "@/lib/auth/permissions";
import { createDatabaseClient } from "@/lib/database";
import { PortfolioRepository } from "@/lib/database/repositories/portfolio-repository";
import type { ContentStatus } from "@/types/database";
import { z } from "zod";

export const metadata: Metadata = {
  title: "Portfolio Management",
  description: "Manage Ayeb Solutions portfolio projects.",
  robots: { index: false, follow: false },
};

interface Props {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
const contentStatuses: readonly ContentStatus[] = [
  "draft",
  "review",
  "published",
  "archived",
];

export default async function AdminPortfolioRoute({ searchParams }: Props) {
  const [params, user] = await Promise.all([searchParams, requireAdmin()]);
  const statusValue = first(params.status);
  const status = contentStatuses.includes(statusValue as ContentStatus)
    ? (statusValue as ContentStatus)
    : undefined;
  const pageSizeValue = Number(first(params.pageSize));
  const pageSize = [25, 50, 100].includes(pageSizeValue) ? pageSizeValue : 25;
  const page = Math.max(1, Number(first(params.page)) || 1);
  const featuredValue = first(params.featured);
  const repository = new PortfolioRepository(await createDatabaseClient());
  const categoryValue = first(params.category);
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
    status,
  } as const;
  const [projects, categories] = await Promise.all([
    repository.findPage({
      categoryId: filters.category,
      featured:
        filters.featured === undefined
          ? undefined
          : filters.featured === "true",
      page,
      pageSize,
      query: filters.query,
      status,
    }),
    repository.findCategories(),
  ]);
  const permissions = getPermissions(user.role);
  return (
    <AdminPortfolio
      canDelete={user.role === "admin"}
      canEdit={permissions.canManageContent}
      categories={categories}
      filters={filters}
      projects={projects}
    />
  );
}
