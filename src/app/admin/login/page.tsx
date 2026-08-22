import type { Metadata } from "next";

import { AdminLogin } from "@/features/admin";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Secure sign in for the Ayeb Solutions administration area.",
  robots: { index: false, follow: false },
};

interface AdminLoginRouteProps {
  readonly searchParams: Promise<{ readonly error?: string }>;
}

export const dynamic = "force-dynamic";

export default async function AdminLoginRoute({
  searchParams,
}: AdminLoginRouteProps) {
  const { error } = await searchParams;
  return <AdminLogin error={error} />;
}
