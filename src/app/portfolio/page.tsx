import type { Metadata } from "next";

import { company } from "@/config/company";
import { PortfolioPage } from "@/features/portfolio";

const title = "Portfolio, Product Concepts & Technical Demonstrations";
const description =
  "Explore clearly labeled internal concepts, prototypes, case studies, demonstrations, and UI experiments from Ayeb Solutions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/portfolio" },
  openGraph: {
    type: "website",
    url: "/portfolio",
    title,
    description,
    siteName: company.name,
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function PortfolioRoute() {
  return <PortfolioPage />;
}
