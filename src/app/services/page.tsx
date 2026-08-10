import type { Metadata } from "next";
import { ServicesPage } from "@/features/services";
import type { PublicServiceSort } from "@/lib/database/repositories/services-repository";
import {
  getPublishedServiceFilters,
  getPublishedServicesPage,
} from "@/lib/services/public-services";
import { getPublicSiteSettings } from "@/lib/settings/site-settings";
import { mediaSeoUrl } from "@/lib/media/media";

export const revalidate = 300;
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicSiteSettings();
  const title = "Digital Services";
  const description =
    "Explore published web development, automation, software, design, integration, and support services from Ayeb Solutions.";
  const image = mediaSeoUrl(settings.openGraphImage);
  return {
    title,
    description,
    alternates: { canonical: "/services" },
    openGraph: {
      type: "website",
      url: "/services",
      title,
      description,
      siteName: settings.site_name,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
interface Props {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}
const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;
const sorts: readonly PublicServiceSort[] = [
  "display-asc",
  "display-desc",
  "title-asc",
  "title-desc",
];
export default async function ServicesRoute({ searchParams }: Props) {
  const [params, categories, settings] = await Promise.all([
    searchParams,
    getPublishedServiceFilters(),
    getPublicSiteSettings(),
  ]);
  const requestedSize = Number(first(params.pageSize));
  const pageSize = requestedSize === 24 ? 24 : requestedSize === 48 ? 48 : 12;
  const requestedSort = first(params.sort) as PublicServiceSort;
  const featuredValue = first(params.featured);
  const filters = {
    category: first(params.category) || undefined,
    featured:
      featuredValue === "true"
        ? true
        : featuredValue === "false"
          ? false
          : undefined,
    pageSize,
    query: first(params.q)?.trim() || undefined,
    sort: sorts.includes(requestedSort)
      ? requestedSort
      : ("display-asc" as const),
  };
  const services = await getPublishedServicesPage({
    categoryId: filters.category,
    featured: filters.featured,
    page: Math.max(1, Number(first(params.page)) || 1),
    pageSize,
    query: filters.query,
    sort: filters.sort,
  });
  return (
    <ServicesPage
      categories={categories}
      filters={filters}
      services={services}
      siteUrl={settings.site_url}
    />
  );
}
