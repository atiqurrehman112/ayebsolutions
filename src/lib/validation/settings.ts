import { z } from "zod";

const nullableText = (maximum = 500) =>
  z.string().trim().max(maximum).nullable();
const nullableUrl = z
  .union([z.url(), z.literal("")])
  .transform((value) => value || null);
const linkSchema = z.strictObject({
  label: z.string().trim().min(1).max(80),
  href: z.string().trim().min(1).max(500),
});
const footerGroupSchema = z.strictObject({
  title: z.string().trim().min(1).max(80),
  links: z.array(linkSchema).max(20),
});

export const siteConfigurationSchema = z.strictObject({
  site_name: z.string().trim().min(2).max(120),
  tagline: z.string().trim().min(2).max(240),
  site_url: z.url(),
  default_language: z.string().regex(/^[a-z]{2}(-[A-Z]{2})?$/),
  timezone: z.string().trim().min(1).max(80),
  logo_media_id: z.uuid().nullable(),
  favicon_media_id: z.uuid().nullable(),
  open_graph_media_id: z.uuid().nullable(),
  default_meta_title: z.string().trim().min(2).max(120),
  default_meta_description: z.string().trim().min(20).max(320),
  default_keywords: z.array(z.string().trim().min(1).max(80)).max(30),
  robots: z.enum(["index,follow", "noindex,nofollow"]),
  canonical_base_url: z.url(),
  contact_email: z
    .union([z.email(), z.literal("")])
    .transform((value) => value || null),
  contact_phone: nullableText(60),
  whatsapp: nullableText(60),
  address: nullableText(500),
  google_maps_url: nullableUrl,
  facebook_url: nullableUrl,
  instagram_url: nullableUrl,
  linkedin_url: nullableUrl,
  github_url: nullableUrl,
  x_url: nullableUrl,
  youtube_url: nullableUrl,
  header_navigation: z.array(linkSchema).min(1).max(20),
  footer_navigation: z.array(footerGroupSchema).min(1).max(12),
  footer_copyright: z.string().trim().min(2).max(240),
  working_hours: nullableText(500),
  emergency_contact: nullableText(120),
  business_registration_number: nullableText(120),
  google_analytics_id: nullableText(80),
  google_search_console_verification: nullableText(200),
  google_tag_manager_id: nullableText(80),
  microsoft_clarity_id: nullableText(80),
  plausible_domain: nullableText(253),
  vercel_analytics_enabled: z.boolean(),
  enable_blog: z.boolean(),
  enable_testimonials: z.boolean(),
  enable_contact_form: z.boolean(),
  enable_newsletter: z.boolean(),
  enable_ai_features: z.boolean(),
  maintenance_mode: z.boolean(),
  maintenance_message: z.string().trim().min(10).max(500),
  status: z.literal("published"),
});
export type SiteConfigurationInput = z.input<typeof siteConfigurationSchema>;
