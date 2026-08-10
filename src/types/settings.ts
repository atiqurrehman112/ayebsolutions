import type { ContentStatus, Json, MediaLibraryRow } from "./database";

export interface SettingsLink {
  readonly href: string;
  readonly label: string;
}
export interface SettingsFooterGroup {
  readonly links: readonly SettingsLink[];
  readonly title: string;
}
export interface SiteConfiguration {
  readonly address: string | null;
  readonly business_registration_number: string | null;
  readonly canonical_base_url: string;
  readonly contact_email: string | null;
  readonly contact_phone: string | null;
  readonly default_keywords: readonly string[];
  readonly default_language: string;
  readonly default_meta_description: string;
  readonly default_meta_title: string;
  readonly emergency_contact: string | null;
  readonly enable_ai_features: boolean;
  readonly enable_blog: boolean;
  readonly enable_contact_form: boolean;
  readonly enable_newsletter: boolean;
  readonly enable_testimonials: boolean;
  readonly facebook_url: string | null;
  readonly favicon_media_id: string | null;
  readonly footer_copyright: string;
  readonly footer_navigation: readonly SettingsFooterGroup[];
  readonly github_url: string | null;
  readonly google_analytics_id: string | null;
  readonly google_maps_url: string | null;
  readonly google_tag_manager_id: string | null;
  readonly header_navigation: readonly SettingsLink[];
  readonly id: string;
  readonly instagram_url: string | null;
  readonly linkedin_url: string | null;
  readonly logo_media_id: string | null;
  readonly maintenance_message: string;
  readonly maintenance_mode: boolean;
  readonly microsoft_clarity_id: string | null;
  readonly open_graph_media_id: string | null;
  readonly robots: string;
  readonly site_name: string;
  readonly site_url: string;
  readonly status: ContentStatus;
  readonly tagline: string;
  readonly timezone: string;
  readonly whatsapp: string | null;
  readonly working_hours: string | null;
  readonly homepage_heading: string | null;
  readonly homepage_subheading: string | null;
  readonly homepage_badge: string | null;
  readonly homepage_primary_cta_label: string | null;
  readonly homepage_primary_cta_href: string | null;
  readonly homepage_secondary_cta_label: string | null;
  readonly homepage_secondary_cta_href: string | null;
  readonly homepage_hero_media_id: string | null;
  readonly homepage_background_media_id: string | null;
  readonly homepage_statistics: Json;
  readonly homepage_trust_indicators: readonly string[];
  readonly homepage_services_limit: number;
  readonly homepage_portfolio_limit: number;
  readonly homepage_blog_limit: number;
  readonly homepage_testimonials_limit: number;
  readonly homepage_cta_heading: string | null;
  readonly homepage_cta_description: string | null;
  readonly homepage_cta_primary_label: string | null;
  readonly homepage_cta_primary_href: string | null;
  readonly homepage_cta_secondary_label: string | null;
  readonly homepage_cta_secondary_href: string | null;
  readonly x_url: string | null;
  readonly youtube_url: string | null;
}
export interface PublicSiteSettings extends SiteConfiguration {
  readonly favicon: MediaLibraryRow | null;
  readonly logo: MediaLibraryRow | null;
  readonly openGraphImage: MediaLibraryRow | null;
  readonly homepageHeroMedia: MediaLibraryRow | null;
  readonly homepageBackgroundMedia: MediaLibraryRow | null;
}
