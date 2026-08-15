import type { Metadata } from "next";
import { AdminFounder } from "@/features/admin";
import { requireAdmin } from "@/lib/auth/auth";
import { getPermissions } from "@/lib/auth/permissions";
import { createDatabaseClient } from "@/lib/database";
import { FounderRepository } from "@/lib/database/repositories/founder-repository";
import { MediaRepository } from "@/lib/database/repositories/media-repository";

export const metadata: Metadata = {
  title: "Founder Profile",
  description: "Manage the public Founder profile.",
  robots: { index: false, follow: false },
};

export default async function AdminFounderRoute() {
  const [user, client] = await Promise.all([
    requireAdmin(),
    createDatabaseClient(),
  ]);
  const [profile, media] = await Promise.all([
    new FounderRepository(client).findSingleton(),
    new MediaRepository(client).findPage({
      kind: "image",
      page: 1,
      pageSize: 100,
    }),
  ]);
  return (
    <AdminFounder
      canEdit={getPermissions(user.role).canManageContent}
      media={media.data.filter((item) => item.status === "published")}
      profile={profile}
    />
  );
}
