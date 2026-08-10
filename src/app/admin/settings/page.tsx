import type { Metadata } from "next";
import { AdminSettings } from "@/features/admin";
import { requireAdmin } from "@/lib/auth/auth";
import { createDatabaseClient } from "@/lib/database";
import { MediaRepository } from "@/lib/database/repositories/media-repository";
import { SettingsRepository } from "@/lib/database/repositories/settings-repository";
import { fallbackSiteSettings } from "@/lib/settings/site-settings";

export const metadata: Metadata = {
  title: "Site Settings",
  description: "Manage production website configuration.",
  robots: { index: false, follow: false },
};
export default async function AdminSettingsRoute() {
  const [user, client] = await Promise.all([
    requireAdmin(),
    createDatabaseClient(),
  ]);
  const [settings, media] = await Promise.all([
    new SettingsRepository(client).find(),
    new MediaRepository(client).findAll(),
  ]);
  return (
    <AdminSettings
      canEdit={user.role === "admin"}
      media={media.filter((item) => item.resource_type === "image")}
      settings={settings ?? fallbackSiteSettings}
    />
  );
}
