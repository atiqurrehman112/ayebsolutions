import type { Metadata } from "next";

import { AdminBlog } from "@/features/admin";
import { requireAdmin } from "@/lib/auth/auth";
import { getPermissions } from "@/lib/auth/permissions";
import { createDatabaseClient } from "@/lib/database";
import { BlogRepository } from "@/lib/database/repositories/blog-repository";
import type { AppRole, ContentStatus } from "@/types/database";
import { z } from "zod";

export const metadata: Metadata = {
  title: "Blog Management",
  description: "Manage Ayeb Solutions blog articles.",
  robots: { index: false, follow: false },
};

interface Props {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}
const statuses: readonly ContentStatus[] = [
  "draft",
  "review",
  "scheduled",
  "published",
  "archived",
];
const roles: readonly AppRole[] = ["admin", "editor", "viewer"];
function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminBlogRoute({ searchParams }: Props) {
  const [params, user] = await Promise.all([searchParams, requireAdmin()]);
  const statusValue = first(params.status);
  const roleValue = first(params.authorRole);
  const categoryValue = first(params.category);
  const featuredValue = first(params.featured);
  const pageSizeValue = Number(first(params.pageSize));
  const pageSize = [25, 50, 100].includes(pageSizeValue) ? pageSizeValue : 25;
  const filters = {
    authorRole: roles.includes(roleValue as AppRole)
      ? (roleValue as AppRole)
      : undefined,
    category: z.uuid().safeParse(categoryValue).success
      ? categoryValue
      : undefined,
    featured:
      featuredValue === "true" || featuredValue === "false"
        ? featuredValue
        : undefined,
    pageSize,
    query: first(params.q)?.trim() || undefined,
    status: statuses.includes(statusValue as ContentStatus)
      ? (statusValue as ContentStatus)
      : undefined,
  } as const;
  const repository = new BlogRepository(await createDatabaseClient());
  const [articles, categories, authors, media] = await Promise.all([
    repository.findPage({
      authorRole: filters.authorRole,
      categoryId: filters.category,
      featured:
        filters.featured === undefined
          ? undefined
          : filters.featured === "true",
      page: Math.max(1, Number(first(params.page)) || 1),
      pageSize,
      query: filters.query,
      status: filters.status,
    }),
    repository.findCategories(),
    repository.findAuthors(),
    repository.findEditorMedia(),
  ]);
  const galleryMap = await repository.findGalleryMap(
    articles.data.map((article) => article.id),
  );
  const permissions = getPermissions(user.role);
  return (
    <AdminBlog
      articles={articles}
      canDelete={user.role === "admin"}
      canEdit={permissions.canManageContent}
      categories={categories}
      filters={filters}
      authors={authors}
      media={media}
      galleryMap={galleryMap}
    />
  );
}
