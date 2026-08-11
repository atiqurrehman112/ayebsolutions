import type { Metadata } from "next";
import { company } from "@/config/company";
import { BlogPage } from "@/features/blog";
import type { PublicBlogSort } from "@/lib/database/repositories/blog-repository";
import {
  getPublishedBlogFilters,
  getPublishedBlogPage,
} from "@/lib/blog/public-blog";

export const revalidate = 300;
export function generateMetadata(): Metadata {
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
      siteName: company.name,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
interface Props {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}
const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;
const sorts: readonly PublicBlogSort[] = ["newest", "oldest", "featured"];
export default async function BlogRoute({ searchParams }: Props) {
  const [params, filterOptions] = await Promise.all([
    searchParams,
    getPublishedBlogFilters(),
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
      siteUrl={company.url}
      tags={filterOptions.tags}
    />
  );
}
