import { z } from "zod";
import { identifierSchema } from "./shared";

const optionalText = (maximum: number) =>
  z.string().trim().max(maximum).nullable().optional();
const optionalUrl = z.url().max(500).nullable().optional();
const optionalEmail = z.email().max(320).nullable().optional();
const media = identifierSchema.nullable().optional();

export const siteSettingsSchema = z.strictObject({
  site_name: z.string().trim().min(2).max(160),
  tagline: z.string().trim().min(2).max(240),
  short_description: optionalText(500),
  long_description: optionalText(5_000),
  site_url: z.url().max(500),
  canonical_base_url: z.url().max(500),
  default_language: z
    .string()
    .trim()
    .regex(/^[a-z]{2}(?:-[A-Z]{2})?$/),
  timezone: z.string().trim().min(1).max(100),
  logo_media_id: media,
  white_logo_media_id: media,
  favicon_media_id: media,
  default_share_media_id: media,
  contact_email: optionalEmail,
  secondary_email: optionalEmail,
  contact_phone: optionalText(50),
  whatsapp: optionalText(50),
  address: optionalText(500),
  google_maps_url: optionalUrl,
  business_hours: optionalText(500),
  linkedin_url: optionalUrl,
  github_url: optionalUrl,
  facebook_url: optionalUrl,
  instagram_url: optionalUrl,
  x_url: optionalUrl,
  youtube_url: optionalUrl,
  default_meta_title: z.string().trim().min(2).max(100),
  default_meta_description: z.string().trim().min(10).max(320),
  default_keywords: z.array(z.string().trim().min(1).max(80)).max(30),
  open_graph_media_id: media,
  twitter_media_id: media,
  google_analytics_id: optionalText(80),
  google_tag_manager_id: optionalText(80),
  meta_pixel_id: optionalText(80),
  microsoft_clarity_id: optionalText(80),
  footer_copyright: z.string().trim().min(2).max(300),
  footer_description: optionalText(500),
  footer_cta: optionalText(300),
  footer_button_text: optionalText(80),
  footer_button_link: optionalText(500),
  announcement_enabled: z.boolean(),
  announcement_text: optionalText(300),
  announcement_button_text: optionalText(80),
  announcement_button_url: optionalText(500),
  maintenance_mode: z.boolean(),
  maintenance_message: z.string().trim().min(2).max(500),
  status: z.enum(["draft", "published"]),
});
