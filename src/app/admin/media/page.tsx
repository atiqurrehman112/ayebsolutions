import type { Metadata } from "next";

import { AdminMedia } from "@/features/admin";

export const metadata: Metadata = {
  title: "Media Library",
  description: "Static media library CMS preview for Ayeb Solutions.",
  robots: { index: false, follow: false },
};

export default function AdminMediaRoute() {
  return <AdminMedia />;
}
