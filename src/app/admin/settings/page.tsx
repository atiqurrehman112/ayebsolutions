import type { Metadata } from "next";

import { AdminSettings } from "@/features/admin";

export const metadata: Metadata = {
  title: "Settings Management",
  description: "Static settings management preview for Ayeb Solutions.",
  robots: { index: false, follow: false },
};

export default function AdminSettingsRoute() {
  return <AdminSettings />;
}
