import type { Metadata } from "next";

import { AdminPortfolio } from "@/features/admin";

export const metadata: Metadata = {
  title: "Portfolio Management",
  description:
    "Static portfolio management CMS interface preview for Ayeb Solutions.",
  robots: { index: false, follow: false },
};

export default function AdminPortfolioRoute() {
  return <AdminPortfolio />;
}
