import type { Metadata } from "next";
import { AdminSiteSettings } from "@/features/admin";
import { requireAdmin } from "@/lib/auth/auth";
import { createDatabaseClient } from "@/lib/database";
import { MediaRepository } from "@/lib/database/repositories/media-repository";
import { SiteSettingsRepository } from "@/lib/database/repositories/site-settings-repository";
export const metadata: Metadata = {
  title: "Site Settings",
  description: "Manage global public website settings.",
  robots: { index: false, follow: false },
};
export default async function AdminSiteSettingsPage() {
  await requireAdmin();
  const client = await createDatabaseClient();
  const [settings, media] = await Promise.all([
    new SiteSettingsRepository(client).findSingleton(),
    new MediaRepository(client).findPage({
      kind: "image",
      page: 1,
      pageSize: 100,
    }),
  ]);
  if (!settings)
    throw new Error("The canonical settings singleton is unavailable.");
  return (
    <AdminSiteSettings
      settings={settings}
      media={media.data.filter((item) => item.status === "published")}
    />
  );
}
