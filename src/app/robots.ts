import type { MetadataRoute } from "next";

import { getPublicSiteSettings } from "@/lib/settings/site-settings";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getPublicSiteSettings();
  const allow = settings.robots === "index,follow";
  return {
    rules: allow
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: [
      `${settings.canonical_base_url}/sitemap.xml`,
      `${settings.canonical_base_url}/sitemap-index.xml`,
    ],
    host: settings.canonical_base_url,
  };
}
