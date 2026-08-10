import type { ContentStatus, MediaLibraryRow } from "./database";

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
  readonly x_url: string | null;
  readonly youtube_url: string | null;
}
export interface PublicSiteSettings extends SiteConfiguration {
  readonly favicon: MediaLibraryRow | null;
  readonly logo: MediaLibraryRow | null;
  readonly openGraphImage: MediaLibraryRow | null;
}
