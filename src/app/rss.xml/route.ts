import { getPublishedBlogPage } from "@/lib/blog/public-blog";
import { company } from "@/config/company";
import { siteConfig } from "@/config/site";
import { escapeXml, xmlResponse } from "@/lib/seo/xml";
export const revalidate = 300;
export async function GET() {
  const articles = await getPublishedBlogPage({
    pageSize: 48,
    sort: "newest",
  }).catch(() => ({ data: [] }));
  const items = articles.data;
  return xmlResponse(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escapeXml(`${company.name} Insights`)}</title><link>${escapeXml(`${siteConfig.url}/blog`)}</link><description>${escapeXml(siteConfig.description)}</description><language>en</language>${items.map((item) => `<item><title>${escapeXml(item.title)}</title><link>${escapeXml(`${siteConfig.url}/blog/${item.slug}`)}</link><guid isPermaLink="true">${escapeXml(`${siteConfig.url}/blog/${item.slug}`)}</guid><description>${escapeXml(item.excerpt)}</description>${item.published_at ? `<pubDate>${new Date(item.published_at).toUTCString()}</pubDate>` : ""}</item>`).join("")}</channel></rss>`,
  );
}
