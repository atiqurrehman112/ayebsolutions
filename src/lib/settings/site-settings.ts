import { cache } from "react";
import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { company } from "@/config/company";
import { footerNavigation } from "@/config/footer";
import { primaryNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { env } from "@/lib/env";
import { SettingsRepository } from "@/lib/database/repositories/settings-repository";
import type { PublicSiteSettings } from "@/types/settings";
import type { Database } from "@/types/database";

export const fallbackSiteSettings: PublicSiteSettings = {
  id: "00000000-0000-4000-8000-000000000001",
  site_name: company.name,
  tagline: company.tagline,
  site_url: siteConfig.url,
  default_language: "en",
  timezone: "UTC",
  logo_media_id: null,
  favicon_media_id: null,
  open_graph_media_id: null,
  default_meta_title: siteConfig.name,
  default_meta_description: siteConfig.description,
  default_keywords: siteConfig.keywords,
  robots: "index,follow",
  canonical_base_url: siteConfig.url,
  contact_email: company.email,
  contact_phone: null,
  whatsapp: null,
  address: company.location,
  google_maps_url: null,
  facebook_url: null,
  instagram_url: null,
  linkedin_url: null,
  github_url: null,
  x_url: null,
  youtube_url: null,
  header_navigation: primaryNavigation.map(({ label, href }) => ({
    label,
    href,
  })),
  footer_navigation: footerNavigation.map(({ title, links }) => ({
    title,
    links: links.map(({ label, href }) => ({ label, href })),
  })),
  footer_copyright: "All rights reserved.",
  working_hours: null,
  emergency_contact: null,
  business_registration_number: null,
  google_analytics_id: null,
  google_tag_manager_id: null,
  microsoft_clarity_id: null,
  enable_blog: true,
  enable_testimonials: true,
  enable_contact_form: true,
  enable_newsletter: false,
  enable_ai_features: true,
  maintenance_mode: false,
  maintenance_message:
    "The website is temporarily unavailable while maintenance is completed.",
  status: "published",
  logo: null,
  favicon: null,
  openGraphImage: null,
  homepage_heading: null,
  homepage_subheading: null,
  homepage_badge: null,
  homepage_primary_cta_label: null,
  homepage_primary_cta_href: null,
  homepage_secondary_cta_label: null,
  homepage_secondary_cta_href: null,
  homepage_hero_media_id: null,
  homepage_background_media_id: null,
  homepage_statistics: [],
  homepage_trust_indicators: [],
  homepage_services_limit: 6,
  homepage_portfolio_limit: 6,
  homepage_blog_limit: 3,
  homepage_testimonials_limit: 6,
  homepage_cta_heading: null,
  homepage_cta_description: null,
  homepage_cta_primary_label: null,
  homepage_cta_primary_href: null,
  homepage_cta_secondary_label: null,
  homepage_cta_secondary_href: null,
  homepageHeroMedia: null,
  homepageBackgroundMedia: null,
};
const loadPublishedSettings = unstable_cache(
  async () => {
    try {
      if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
        return fallbackSiteSettings;
      const client = createClient<Database>(
        env.NEXT_PUBLIC_SUPABASE_URL,
        env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        { auth: { autoRefreshToken: false, persistSession: false } },
      );
      return (
        (await new SettingsRepository(client).findPublic()) ??
        fallbackSiteSettings
      );
    } catch {
      return fallbackSiteSettings;
    }
  },
  ["published-site-settings"],
  {
    revalidate: 300,
    tags: ["site-settings", "settings", "homepage", "media"],
  },
);
export const getPublicSiteSettings = cache(loadPublishedSettings);
