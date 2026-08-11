import { getPublishedPortfolioSlugs } from "@/lib/portfolio/public-portfolio";
import { siteConfig } from "@/config/site";
import { escapeXml, xmlResponse } from "@/lib/seo/xml";
export const revalidate = 300;
export async function GET() {
  const items = await getPublishedPortfolioSlugs().catch(() => []);
  const urls = [{ slug: "", updated_at: new Date().toISOString() }, ...items];
  return xmlResponse(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((item) => `<url><loc>${escapeXml(`${siteConfig.url}/portfolio${item.slug ? `/${item.slug}` : ""}`)}</loc><lastmod>${escapeXml(item.updated_at)}</lastmod></url>`).join("")}</urlset>`,
  );
}
