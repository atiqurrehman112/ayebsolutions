import type { Metadata } from "next";

import { AdminServices } from "@/features/admin";

export const metadata: Metadata = {
  title: "Services Management",
  description: "Static services management CMS preview for Ayeb Solutions.",
  robots: { index: false, follow: false },
};

export default function AdminServicesRoute() {
  return <AdminServices />;
}
