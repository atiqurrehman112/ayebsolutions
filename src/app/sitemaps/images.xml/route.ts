import { getPublishedBlogPage } from "@/lib/blog/public-blog";
import { getPublishedPortfolioPage } from "@/lib/portfolio/public-portfolio";
import { getPublishedServicesPage } from "@/lib/services/public-services";
import { getPublicSiteSettings } from "@/lib/settings/site-settings";
import { escapeXml, xmlResponse } from "@/lib/seo/xml";
export const revalidate = 300;
export async function GET() {
  const [settings, services, projects, articles] = await Promise.all([
    getPublicSiteSettings(),
    getPublishedServicesPage({ pageSize: 100 }).catch(() => ({ data: [] })),
    getPublishedPortfolioPage({ pageSize: 100 }).catch(() => ({ data: [] })),
    getPublishedBlogPage({ pageSize: 100 }).catch(() => ({ data: [] })),
  ]);
  const records = [
    ...services.data.map((item) => ({
      href: `/services/${item.slug}`,
      media: item.cover,
      title: item.title,
    })),
    ...projects.data.map((item) => ({
      href: `/portfolio/${item.slug}`,
      media: item.cover,
      title: item.title,
    })),
    ...articles.data.map((item) => ({
      href: `/blog/${item.slug}`,
      media: item.featuredMedia,
      title: item.title,
    })),
  ].filter((item) => item.media);
  return xmlResponse(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${records.map((item) => `<url><loc>${escapeXml(`${settings.canonical_base_url}${item.href}`)}</loc><image:image><image:loc>${escapeXml(item.media?.secure_url ?? "")}</image:loc><image:title>${escapeXml(item.media?.alt || item.title)}</image:title></image:image></url>`).join("")}</urlset>`,
  );
}
