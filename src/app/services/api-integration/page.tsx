import type { Metadata } from "next";

import { company } from "@/config/company";
import { ApiIntegrationPage } from "@/features/services";

const title = "API & System Integration Services";
const description =
  "API integration services for connecting business systems, automating data exchange, and building secure, maintainable application workflows.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/api-integration" },
  openGraph: {
    type: "website",
    url: "/services/api-integration",
    title,
    description,
    siteName: company.name,
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function ApiIntegrationRoute() {
  return <ApiIntegrationPage />;
}
