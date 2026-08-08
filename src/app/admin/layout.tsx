import type { Metadata } from "next";

import { AdminLayout } from "@/features/admin";

export const metadata: Metadata = {
  title: { default: "Admin Preview", template: "%s | Ayeb Admin" },
  robots: { index: false, follow: false },
};

interface AdminRouteLayoutProps {
  readonly children: React.ReactNode;
}

export default function AdminRouteLayout({ children }: AdminRouteLayoutProps) {
  return <AdminLayout>{children}</AdminLayout>;
}
