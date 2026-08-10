import type { Metadata } from "next";

import { AdminMedia } from "@/features/admin";
import { requireAdmin } from "@/lib/auth/auth";
import { getPermissions } from "@/lib/auth/permissions";
import { createDatabaseClient } from "@/lib/database";
import {
  MediaRepository,
  type MediaKind,
  type MediaSort,
} from "@/lib/database/repositories/media-repository";

export const metadata: Metadata = {
  title: "Media Library",
  description: "Manage Cloudinary-backed media assets for Ayeb Solutions.",
  robots: { index: false, follow: false },
};

interface Props {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}
const kinds: readonly MediaKind[] = [
  "image",
  "video",
  "pdf",
  "document",
  "svg",
];
const sorts: readonly MediaSort[] = [
  "newest",
  "oldest",
  "alphabetical",
  "largest",
];
function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
export default async function AdminMediaRoute({ searchParams }: Props) {
  const [params, user] = await Promise.all([searchParams, requireAdmin()]);
  const kindValue = first(params.kind);
  const sortValue = first(params.sort);
  const pageSizeValue = Number(first(params.pageSize));
  const pageSize = [25, 50, 100].includes(pageSizeValue) ? pageSizeValue : 25;
  const filters = {
    kind: kinds.includes(kindValue as MediaKind)
      ? (kindValue as MediaKind)
      : undefined,
    pageSize,
    query: first(params.q)?.trim() || undefined,
    sort: sorts.includes(sortValue as MediaSort)
      ? (sortValue as MediaSort)
      : "newest",
  } as const;
  const media = await new MediaRepository(
    await createDatabaseClient(),
  ).findPage({
    kind: filters.kind,
    page: Math.max(1, Number(first(params.page)) || 1),
    pageSize,
    query: filters.query,
    sort: filters.sort,
  });
  return (
    <AdminMedia
      canEdit={getPermissions(user.role).canManageContent}
      filters={filters}
      media={media}
    />
  );
}
