import { marketingServices } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import { escapeXml, xmlResponse } from "@/lib/seo/xml";
export const revalidate = 300;
export function GET() {
  const urls = [
    { slug: "", updated_at: new Date().toISOString() },
    ...marketingServices,
  ];
  return xmlResponse(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((item) => `<url><loc>${escapeXml(`${siteConfig.url}/services${item.slug ? `/${item.slug}` : ""}`)}</loc><lastmod>${escapeXml(item.updated_at)}</lastmod></url>`).join("")}</urlset>`,
  );
}
