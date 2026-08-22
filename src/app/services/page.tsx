import type { Metadata } from "next";
import { ServicesPage } from "@/features/services";
import { getPublicSiteSettings } from "@/lib/site-settings/public-site-settings";
import { marketingServices } from "@/config/marketing";

const title = "Digital Services";
const description =
  "Explore web development, automation, SaaS, design, e-commerce, and custom software services from Ayeb Solutions.";
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicSiteSettings();
  return {
    title,
    description,
    alternates: { canonical: "/services" },
    openGraph: {
      type: "website",
      url: "/services",
      title,
      description,
      siteName: settings?.configuration.site_name,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
export default async function ServicesRoute() {
  const settings = await getPublicSiteSettings();
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
      siteUrl={
        settings?.configuration.canonical_base_url ??
        process.env.NEXT_PUBLIC_SITE_URL ??
        "http://localhost:3000"
      }
    />
  );
}
