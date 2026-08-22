import { unstable_cache } from "next/cache";
import { createServiceRoleDatabaseClient } from "@/lib/database";
import { MediaRepository } from "@/lib/database/repositories/media-repository";
import { SiteSettingsRepository } from "@/lib/database/repositories/site-settings-repository";
import type { MediaLibraryRow, SiteConfigurationRow } from "@/types/database";

export interface PublicSiteSettings {
  readonly configuration: SiteConfigurationRow;
  readonly media: Readonly<Record<string, MediaLibraryRow | null>>;
}

export const getPublicSiteSettings = unstable_cache(
  async (): Promise<PublicSiteSettings | null> => {
    try {
      const client = createServiceRoleDatabaseClient();
      const configuration = await new SiteSettingsRepository(
        client,
      ).findPublished();
      if (!configuration) return null;
      const ids = [
        configuration.logo_media_id,
        configuration.white_logo_media_id,
        configuration.favicon_media_id,
        configuration.default_share_media_id,
        configuration.open_graph_media_id,
        configuration.twitter_media_id,
      ].filter((id): id is string => Boolean(id));
      const repository = new MediaRepository(client);
      const resolved = await Promise.all(
        ids.map(async (id) => [id, await repository.findById(id)] as const),
      );
      return { configuration, media: Object.fromEntries(resolved) };
    } catch {
      return null;
    }
  },
  ["public-site-settings"],
  { revalidate: 300, tags: ["site-settings", "media"] },
);
