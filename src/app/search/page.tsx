import type { Metadata } from "next";
import { SearchPage } from "@/features/search/components/search-page";
import { searchPublishedContent } from "@/lib/search/public-search";
export const metadata: Metadata = {
  title: "Search",
  description:
    "Search Ayeb Solutions services, portfolio projects, and insights.",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
};
export default async function SearchRoute({
  searchParams,
}: {
  readonly searchParams: Promise<{ readonly q?: string | string[] }>;
}) {
  const params = await searchParams;
  const query = (
    Array.isArray(params.q) ? (params.q[0] ?? "") : (params.q ?? "")
  )
    .trim()
    .slice(0, 100);
  const groups = await searchPublishedContent(query).catch(() => []);
  return <SearchPage groups={groups} query={query} />;
}
