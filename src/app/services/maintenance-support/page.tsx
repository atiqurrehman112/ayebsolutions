import type { Metadata } from "next";

import { company } from "@/config/company";
import { MaintenanceSupportPage } from "@/features/services";

const title = "Website Maintenance & Technical Support";
const description =
  "Ongoing website and application maintenance covering security updates, performance, monitoring, technical improvements, and operational support.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/maintenance-support" },
  openGraph: {
    type: "website",
    url: "/services/maintenance-support",
    title,
    description,
    siteName: company.name,
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function MaintenanceSupportRoute() {
  return <MaintenanceSupportPage />;
}
