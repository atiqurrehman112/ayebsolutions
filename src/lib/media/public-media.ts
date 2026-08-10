import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";

import { MediaRepository } from "@/lib/database/repositories/media-repository";
import { env } from "@/lib/env";
import type { Database, MediaLibraryRow } from "@/types/database";

function repository() {
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    return null;
  return new MediaRepository(
    createClient<Database>(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } },
    ),
  );
}

const loadPublicMedia = unstable_cache(
  async (roles: readonly string[]) =>
    (await repository()?.findPublicByUsage(roles)) ?? [],
  ["public-media-by-role"],
  { revalidate: 300, tags: ["media"] },
);

export async function getPublicMediaByRole(
  roles: readonly string[],
): Promise<Readonly<Record<string, MediaLibraryRow | null>>> {
  const media = await loadPublicMedia(roles);
  return Object.fromEntries(
    roles.map((role) => [
      role,
      media.find(
        (item) =>
          item.usage_locations.includes(role) || item.tags.includes(role),
      ) ?? null,
    ]),
  );
}
