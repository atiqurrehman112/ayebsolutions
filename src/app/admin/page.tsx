import type { Metadata } from "next";

import { AdminDashboard } from "@/features/admin";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Static Ayeb Solutions admin dashboard foundation preview.",
  robots: { index: false, follow: false },
};

export default function AdminDashboardRoute() {
  return <AdminDashboard />;
}
