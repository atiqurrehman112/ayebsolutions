import type { Metadata } from "next";

import { company } from "@/config/company";
import { SolutionsPage } from "@/features/solutions";

const title = "Business Solutions for Connected Operations";
const description =
  "Explore business-focused solutions for AI automation, connected workflows, CRM, internal dashboards, customer portals, SaaS platforms, and digital transformation.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/solutions" },
  openGraph: {
    type: "website",
    url: "/solutions",
    title,
    description,
    siteName: company.name,
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function SolutionsRoute() {
  return <SolutionsPage />;
}
