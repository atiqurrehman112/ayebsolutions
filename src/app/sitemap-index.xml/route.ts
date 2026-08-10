import { getPublicSiteSettings } from "@/lib/settings/site-settings";
import { escapeXml, xmlResponse } from "@/lib/seo/xml";
export const revalidate = 300;
export async function GET() {
  const { canonical_base_url: base } = await getPublicSiteSettings();
  const maps = [
    "sitemap.xml",
    "sitemaps/services.xml",
    "sitemaps/portfolio.xml",
    "sitemaps/blog.xml",
    "sitemaps/images.xml",
  ];
  return xmlResponse(
    `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${maps.map((path) => `<sitemap><loc>${escapeXml(`${base}/${path}`)}</loc></sitemap>`).join("")}</sitemapindex>`,
  );
}
