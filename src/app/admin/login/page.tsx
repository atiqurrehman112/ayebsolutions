import type { Metadata } from "next";

import { AdminLogin } from "@/features/admin";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Static Ayeb Solutions admin authentication interface preview.",
  robots: { index: false, follow: false },
};

export default function AdminLoginRoute() {
  return <AdminLogin />;
}
