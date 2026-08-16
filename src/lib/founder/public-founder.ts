import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";
import { FounderRepository } from "@/lib/database/repositories/founder-repository";
import { MediaRepository } from "@/lib/database/repositories/media-repository";
import type {
  Database,
  FounderProfileRow,
  MediaLibraryRow,
} from "@/types/database";

export interface PublicFounderProfile extends FounderProfileRow {
  readonly profilePhoto: MediaLibraryRow | null;
  readonly coverImage: MediaLibraryRow | null;
  readonly openGraphImage: MediaLibraryRow | null;
}

export const getPublishedFounderProfile = unstable_cache(
  async (): Promise<PublicFounderProfile | null> => {
    if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
      return null;
    const client = createClient<Database>(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } },
    );
    const profile = await new FounderRepository(client).findPublished();
    if (!profile) return null;
    const mediaRepository = new MediaRepository(client);
    const [profilePhoto, coverImage, openGraphImage] = await Promise.all([
      profile.profile_photo
        ? mediaRepository.findById(profile.profile_photo)
        : null,
      profile.cover_image
        ? mediaRepository.findById(profile.cover_image)
        : null,
      profile.open_graph_image
        ? mediaRepository.findById(profile.open_graph_image)
        : null,
    ]);
    return { ...profile, profilePhoto, coverImage, openGraphImage };
  },
  ["published-founder-profile"],
  { revalidate: 300, tags: ["founder", "media"] },
);
