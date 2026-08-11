import type { Metadata } from "next";
import { ServicesPage } from "@/features/services";
import { company } from "@/config/company";
import { marketingServices } from "@/config/marketing";

const title = "Digital Services";
const description =
  "Explore web development, automation, SaaS, design, e-commerce, and custom software services from Ayeb Solutions.";
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
  twitter: {
    card: "summary",
    title,
    description,
  },
};
export default function ServicesRoute() {
  const filters = { pageSize: 12, sort: "display-asc" as const };
  return (
    <ServicesPage
      categories={[]}
      filters={filters}
      services={{
        data: marketingServices.map((service) => ({ ...service, cover: null })),
        count: marketingServices.length,
        page: 1,
        pageSize: 12,
        totalPages: 1,
      }}
      siteUrl={company.url}
    />
  );
}
