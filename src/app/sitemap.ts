import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getPublishedPortfolioSlugs } from "@/lib/portfolio/public-portfolio";
import { getPublishedBlogSlugs } from "@/lib/blog/public-blog";
import { marketingServices } from "@/config/marketing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [portfolioProjects, blogArticles] = await Promise.all([
    getPublishedPortfolioSlugs().catch(() => []),
    getPublishedBlogSlugs().catch(() => []),
  ]);
  const siteUrl = siteConfig.url;
  const entries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...marketingServices.map((service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: new Date(service.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${siteUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...portfolioProjects.map((project) => ({
      url: `${siteUrl}/portfolio/${project.slug}`,
      lastModified: new Date(project.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...["solutions", "faq", "privacy", "terms", "cookies", "accessibility"].map(
      (path) => ({
        url: `${siteUrl}/${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: path === "solutions" ? 0.8 : 0.4,
      }),
    ),
    {
      url: `${siteUrl}/rss.xml`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.3,
    },
    ...blogArticles.map((article) => ({
      url: `${siteUrl}/blog/${article.slug}`,
      lastModified: new Date(article.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
  return entries;
}
