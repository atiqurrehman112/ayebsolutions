import type { Metadata } from "next";
import { headers } from "next/headers";

import { AdminLayout } from "@/features/admin";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Ayeb Admin" },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

interface AdminRouteLayoutProps {
  readonly children: React.ReactNode;
}

export default async function AdminRouteLayout({
  children,
}: AdminRouteLayoutProps) {
  const requestHeaders = await headers();

  if (requestHeaders.get("x-ayeb-admin-path") === "/admin/login") {
    return children;
  }

  return <AdminLayout>{children}</AdminLayout>;
}
