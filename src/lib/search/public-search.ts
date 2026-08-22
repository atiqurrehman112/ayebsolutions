import { getPublishedBlogPage } from "@/lib/blog/public-blog";
import { getPublishedPortfolioPage } from "@/lib/portfolio/public-portfolio";
import { getPublishedServicesPage } from "@/lib/services/public-services";

interface SearchResult {
  readonly description: string;
  readonly href: string;
  readonly title: string;
}
export interface SearchGroup {
  readonly label: string;
  readonly results: readonly SearchResult[];
}
export async function searchPublishedContent(
  query: string,
): Promise<readonly SearchGroup[]> {
  const term = query.trim().slice(0, 100);
  if (term.length < 2) return [];
  const [services, projects, articles] = await Promise.all([
    getPublishedServicesPage({ query: term, page: 1, pageSize: 6 }),
    getPublishedPortfolioPage({ query: term, page: 1, pageSize: 6 }),
    getPublishedBlogPage({ query: term, page: 1, pageSize: 6 }),
  ]);
  return [
    {
      label: "Services",
      results: services.data.map((item) => ({
        title: item.title,
        description: item.summary,
        href: `/services/${item.slug}`,
      })),
    },
    {
      label: "Portfolio",
      results: projects.data.map((item) => ({
        title: item.title,
        description: item.summary,
        href: `/portfolio/${item.slug}`,
      })),
    },
    {
      label: "Insights",
      results: articles.data.map((item) => ({
        title: item.title,
        description: item.excerpt,
        href: `/blog/${item.slug}`,
      })),
    },
  ];
}
