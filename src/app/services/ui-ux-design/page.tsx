import type { Metadata } from "next";

import { company } from "@/config/company";
import { UiUxDesignPage } from "@/features/services";

const title = "UI/UX Design Services";
const description =
  "User-centered UI/UX design services for accessible websites, software products, dashboards, mobile experiences, and scalable design systems.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/ui-ux-design" },
  openGraph: {
    type: "website",
    url: "/services/ui-ux-design",
    title,
    description,
    siteName: company.name,
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function UiUxDesignRoute() {
  return <UiUxDesignPage />;
}
