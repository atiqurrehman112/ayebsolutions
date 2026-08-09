import type { Metadata } from "next";

import { AdminContactLeads } from "@/features/admin";

export const metadata: Metadata = {
  title: "Contact Leads Management",
  description: "Static contact leads management preview for Ayeb Solutions.",
  robots: { index: false, follow: false },
};

export default function AdminContactLeadsRoute() {
  return <AdminContactLeads />;
}
