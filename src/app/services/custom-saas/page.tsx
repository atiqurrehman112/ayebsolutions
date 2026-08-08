import type { Metadata } from "next";

import { company } from "@/config/company";
import { CustomSaasPage } from "@/features/services";

const title = "Custom SaaS Development Services";
const description =
  "Custom SaaS platforms, internal systems, portals, and operational software designed around clear product architecture, security, and maintainable growth.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/custom-saas" },
  openGraph: {
    type: "website",
    url: "/services/custom-saas",
    title,
    description,
    siteName: company.name,
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function CustomSaasRoute() {
  return <CustomSaasPage />;
}
