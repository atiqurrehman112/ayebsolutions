import type { Metadata } from "next";
import { PortfolioPage } from "@/features/portfolio";
import {
  getPublishedPortfolioFilters,
  getPublishedPortfolioPage,
} from "@/lib/portfolio/public-portfolio";
import type { PublicPortfolioSort } from "@/lib/database/repositories/portfolio-repository";
import { getPublicSiteSettings } from "@/lib/settings/site-settings";

export const revalidate = 300;
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicSiteSettings();
  const title = "Portfolio — Published digital work";
  const description =
    "Explore published web, SaaS, automation, integration, and product design work from Ayeb Solutions.";
  return {
    title,
    description,
    alternates: { canonical: "/portfolio" },
    openGraph: {
      type: "website",
      url: "/portfolio",
      title,
      description,
      siteName: settings.site_name,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
interface Props {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}
const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;
const sorts: readonly PublicPortfolioSort[] = [
  "newest",
  "oldest",
  "featured",
  "alphabetical",
];
export default async function PortfolioRoute({ searchParams }: Props) {
  const [params, filterOptions, settings] = await Promise.all([
    searchParams,
    getPublishedPortfolioFilters(),
    getPublicSiteSettings(),
  ]);
  const requestedSize = Number(first(params.pageSize));
  const pageSize = requestedSize === 24 ? 24 : requestedSize === 48 ? 48 : 12;
  const sortValue = first(params.sort) as PublicPortfolioSort;
  const filters = {
    category: first(params.category) || undefined,
    pageSize,
    query: first(params.q)?.trim() || undefined,
    sort: sorts.includes(sortValue) ? sortValue : ("newest" as const),
    tag: first(params.tag) || undefined,
  };
  const projects = await getPublishedPortfolioPage({
    categoryId: filters.category,
    page: Math.max(1, Number(first(params.page)) || 1),
    pageSize,
    query: filters.query,
    sort: filters.sort,
    tagId: filters.tag,
  });
  return (
    <PortfolioPage
      categories={filterOptions.categories}
      filters={filters}
      projects={projects}
      siteUrl={settings.site_url}
      tags={filterOptions.tags}
    />
  );
}
