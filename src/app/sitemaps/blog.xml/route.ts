import { getPublishedBlogSlugs } from "@/lib/blog/public-blog";
import { siteConfig } from "@/config/site";
import { escapeXml, xmlResponse } from "@/lib/seo/xml";
export const revalidate = 300;
export async function GET() {
  const items = await getPublishedBlogSlugs().catch(() => []);
  const urls = [{ slug: "", updated_at: new Date().toISOString() }, ...items];
  return xmlResponse(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((item) => `<url><loc>${escapeXml(`${siteConfig.url}/blog${item.slug ? `/${item.slug}` : ""}`)}</loc><lastmod>${escapeXml(item.updated_at)}</lastmod></url>`).join("")}</urlset>`,
  );
}
