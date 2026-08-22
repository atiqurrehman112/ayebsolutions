import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";

import { env } from "@/lib/env";
import { MediaRepository } from "@/lib/database/repositories/media-repository";
import { TeamRepository } from "@/lib/database/repositories/team-repository";
import type {
  Database,
  MediaLibraryRow,
  TeamMemberRow,
} from "@/types/database";

export interface PublicTeamMember extends TeamMemberRow {
  readonly profileMedia: MediaLibraryRow | null;
}

function createPublicRepositories() {
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }

  const client = createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );

  return {
    media: new MediaRepository(client),
    team: new TeamRepository(client),
  };
}

export const getPublishedTeamMembers = unstable_cache(
  async (): Promise<readonly PublicTeamMember[]> => {
    const repositories = createPublicRepositories();
    if (!repositories) return [];

    const page = await repositories.team.findPage({
      page: 1,
      pageSize: 100,
      sort: "order-asc",
      status: "published",
    });
    const mediaIds = [
      ...new Set(
        page.data
          .map((member) => member.profile_image)
          .filter((id): id is string => Boolean(id)),
      ),
    ];
    const media = await Promise.all(
      mediaIds.map((id) => repositories.media.findById(id)),
    );
    const mediaById = new Map(
      media
        .filter((item): item is MediaLibraryRow => Boolean(item))
        .map((item) => [item.id, item]),
    );

    return [...page.data]
      .sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          a.display_order - b.display_order ||
          a.name.localeCompare(b.name),
      )
      .map((member) => ({
        ...member,
        profileMedia: member.profile_image
          ? (mediaById.get(member.profile_image) ?? null)
          : null,
      }));
  },
  ["published-team-members"],
  { revalidate: 300, tags: ["team", "media"] },
);
