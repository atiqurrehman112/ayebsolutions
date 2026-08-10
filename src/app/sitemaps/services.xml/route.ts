import { getPublishedServiceSlugs } from "@/lib/services/public-services";
import { getPublicSiteSettings } from "@/lib/settings/site-settings";
import { escapeXml, xmlResponse } from "@/lib/seo/xml";
export const revalidate = 300;
export async function GET() {
  const [settings, items] = await Promise.all([
    getPublicSiteSettings(),
    getPublishedServiceSlugs().catch(() => []),
  ]);
  const urls = [{ slug: "", updated_at: new Date().toISOString() }, ...items];
  return xmlResponse(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((item) => `<url><loc>${escapeXml(`${settings.canonical_base_url}/services${item.slug ? `/${item.slug}` : ""}`)}</loc><lastmod>${escapeXml(item.updated_at)}</lastmod></url>`).join("")}</urlset>`,
  );
}
