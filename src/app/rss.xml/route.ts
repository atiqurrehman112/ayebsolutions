import { getPublishedBlogPage } from "@/lib/blog/public-blog";
import { getPublicSiteSettings } from "@/lib/settings/site-settings";
import { escapeXml, xmlResponse } from "@/lib/seo/xml";
export const revalidate = 300;
export async function GET() {
  const [settings, articles] = await Promise.all([
    getPublicSiteSettings(),
    getPublishedBlogPage({ pageSize: 48, sort: "newest" }).catch(() => ({
      data: [],
    })),
  ]);
  const items = settings.enable_blog ? articles.data : [];
  return xmlResponse(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escapeXml(`${settings.site_name} Insights`)}</title><link>${escapeXml(`${settings.canonical_base_url}/blog`)}</link><description>${escapeXml(settings.default_meta_description)}</description><language>${escapeXml(settings.default_language)}</language>${items.map((item) => `<item><title>${escapeXml(item.title)}</title><link>${escapeXml(`${settings.canonical_base_url}/blog/${item.slug}`)}</link><guid isPermaLink="true">${escapeXml(`${settings.canonical_base_url}/blog/${item.slug}`)}</guid><description>${escapeXml(item.excerpt)}</description>${item.published_at ? `<pubDate>${new Date(item.published_at).toUTCString()}</pubDate>` : ""}</item>`).join("")}</channel></rss>`,
  );
}
