import type { MetadataRoute } from "next";

import { getPublicSiteSettings } from "@/lib/settings/site-settings";
import { getPublishedPortfolioSlugs } from "@/lib/portfolio/public-portfolio";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, portfolioProjects] = await Promise.all([
    getPublicSiteSettings(),
    getPublishedPortfolioSlugs().catch(() => []),
  ]);
  const siteUrl = settings.canonical_base_url;
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
    {
      url: `${siteUrl}/services/web-development`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/services/ai-automation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/services/custom-saas`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/services/ui-ux-design`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/services/api-integration`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/services/maintenance-support`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
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
    ...[
      "why-custom-software-beats-off-the-shelf-tools",
      "how-ai-automation-saves-business-hours",
      "designing-accessible-web-applications",
      "api-integration-best-practices",
      "choosing-the-right-tech-stack",
      "building-scalable-saas-products",
      "improving-website-performance",
      "planning-a-successful-digital-project",
    ].map((slug) => ({
      url: `${siteUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
  return entries.filter((entry) => {
    if (!settings.enable_blog && entry.url.startsWith(`${siteUrl}/blog`))
      return false;
    if (!settings.enable_contact_form && entry.url === `${siteUrl}/contact`)
      return false;
    return true;
  });
}
