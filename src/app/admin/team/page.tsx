import type { Metadata } from "next";
import { AdminTeam } from "@/features/admin";
import { requireAdmin } from "@/lib/auth/auth";
import { getPermissions } from "@/lib/auth/permissions";
import { createDatabaseClient } from "@/lib/database";
import { MediaRepository } from "@/lib/database/repositories/media-repository";
import {
  TeamRepository,
  type TeamMemberSort,
} from "@/lib/database/repositories/team-repository";

export const metadata: Metadata = {
  title: "Team Management",
  description: "Manage Ayeb Solutions team profiles.",
  robots: { index: false, follow: false },
};
interface Props {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}
const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;
const sorts: readonly TeamMemberSort[] = [
  "order-asc",
  "order-desc",
  "name-asc",
  "updated-desc",
];
export default async function AdminTeamRoute({ searchParams }: Props) {
  const [params, user, client] = await Promise.all([
    searchParams,
    requireAdmin(),
    createDatabaseClient(),
  ]);
  const status = first(params.status);
  const featured = first(params.featured);
  const sortValue = first(params.sort) as TeamMemberSort;
  const requestedSize = Number(first(params.pageSize));
  const pageSize = [25, 50, 100].includes(requestedSize) ? requestedSize : 25;
  const filters = {
    department: first(params.department) || undefined,
    featured:
      featured === "true" || featured === "false" ? featured : undefined,
    pageSize,
    query: first(params.q)?.trim() || undefined,
    sort: sorts.includes(sortValue) ? sortValue : ("order-asc" as const),
    status:
      status === "draft" || status === "published"
        ? (status as "draft" | "published")
        : undefined,
  };
  const repository = new TeamRepository(client);
  const mediaRepository = new MediaRepository(client);
  const [members, departments, mediaPage] = await Promise.all([
    repository.findPage({
      ...filters,
      featured:
        filters.featured === undefined
          ? undefined
          : filters.featured === "true",
      page: Math.max(1, Number(first(params.page)) || 1),
    }),
    repository.departments(),
    mediaRepository.findPage({ kind: "image", page: 1, pageSize: 100 }),
  ]);
  const permissions = getPermissions(user.role);
  return (
    <AdminTeam
      canDelete={user.role === "admin"}
      canEdit={permissions.canManageContent}
      departments={departments}
      filters={filters}
      media={mediaPage.data.filter((item) => item.status === "published")}
      members={members}
    />
  );
}
