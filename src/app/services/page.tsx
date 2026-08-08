import type { Metadata } from "next";

import { company } from "@/config/company";
import { ServicesPage } from "@/features/services";

const title = "Web Development, AI Automation & SaaS Services";
const description =
  "Explore Ayeb Solutions services for custom web development, AI automation, SaaS products, UI/UX design, API integration, and ongoing maintenance.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    url: "/services",
    title,
    description,
    siteName: company.name,
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function ServicesRoute() {
  return <ServicesPage />;
}
