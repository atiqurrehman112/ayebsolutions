import type { Metadata } from "next";

import { company } from "@/config/company";
import { WebDevelopmentPage } from "@/features/services";

const title = "Custom Web Development Services";
const description =
  "Custom websites and web applications engineered for performance, accessibility, scalability, and long-term ownership by Ayeb Solutions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/web-development" },
  openGraph: {
    type: "website",
    url: "/services/web-development",
    title,
    description,
    siteName: company.name,
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function WebDevelopmentRoute() {
  return <WebDevelopmentPage />;
}
