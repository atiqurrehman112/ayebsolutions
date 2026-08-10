import type { Metadata } from "next";
import { BlogPage } from "@/features/blog";
import type { PublicBlogSort } from "@/lib/database/repositories/blog-repository";
import {
  getPublishedBlogFilters,
  getPublishedBlogPage,
} from "@/lib/blog/public-blog";
import { getPublicSiteSettings } from "@/lib/settings/site-settings";

export const revalidate = 300;
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicSiteSettings();
  const title = "Insights & Resources";
  const description =
    "Published guidance from Ayeb Solutions on software, AI automation, design, integrations, and sustainable digital growth.";
  return {
    title,
    description,
    alternates: { canonical: "/blog" },
    openGraph: {
      type: "website",
      url: "/blog",
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
const sorts: readonly PublicBlogSort[] = ["newest", "oldest", "featured"];
export default async function BlogRoute({ searchParams }: Props) {
  const [params, filterOptions, settings] = await Promise.all([
    searchParams,
    getPublishedBlogFilters(),
    getPublicSiteSettings(),
  ]);
  const requestedSize = Number(first(params.pageSize));
  const pageSize = requestedSize === 24 ? 24 : requestedSize === 48 ? 48 : 12;
  const requestedSort = first(params.sort) as PublicBlogSort;
  const filters = {
    category: first(params.category) || undefined,
    pageSize,
    query: first(params.q)?.trim() || undefined,
    sort: sorts.includes(requestedSort) ? requestedSort : ("newest" as const),
    tag: first(params.tag) || undefined,
  };
  const articles = await getPublishedBlogPage({
    categoryId: filters.category,
    page: Math.max(1, Number(first(params.page)) || 1),
    pageSize,
    query: filters.query,
    sort: filters.sort,
    tagId: filters.tag,
  });
  return (
    <BlogPage
      articles={articles}
      categories={filterOptions.categories}
      filters={filters}
      siteUrl={settings.site_url}
      tags={filterOptions.tags}
    />
  );
}
