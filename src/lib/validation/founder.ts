import { z } from "zod";
import { identifierSchema } from "./shared";

const optionalText = (max: number) =>
  z.string().trim().max(max).nullable().optional();
const optionalUrl = z.url().max(500).nullable().optional();
const stringList = z
  .array(z.string().trim().min(1).max(120))
  .max(40)
  .default([]);
const optionalCount = z
  .number()
  .int()
  .nonnegative()
  .max(1_000_000)
  .nullable()
  .optional();

export const founderProfileSchema = z.strictObject({
  full_name: z.string().trim().min(2).max(160),
  role_title: z.string().trim().min(2).max(180),
  professional_headline: z.string().trim().min(10).max(320),
  short_introduction: z.string().trim().min(10).max(500),
  biography: z.string().trim().min(20).max(10_000),
  profile_photo: identifierSchema.nullable().optional(),
  cover_image: identifierSchema.nullable().optional(),
  email: z.email().max(320).nullable().optional(),
  phone: optionalText(50),
  location: optionalText(180),
  linkedin_url: optionalUrl,
  github_url: optionalUrl,
  twitter_url: optionalUrl,
  facebook_url: optionalUrl,
  instagram_url: optionalUrl,
  portfolio_url: optionalUrl,
  resume_url: optionalUrl,
  years_experience: z.number().int().min(0).max(80).nullable().optional(),
  projects_completed: optionalCount,
  happy_clients: optionalCount,
  technologies: stringList,
  certifications: stringList,
  skills: stringList,
  vision_statement: optionalText(2_000),
  mission_statement: optionalText(2_000),
  personal_quote: optionalText(1_000),
  availability_status: z
    .enum(["available", "busy", "not_accepting"])
    .nullable()
    .optional(),
  featured_badge: optionalText(100),
  display_order: z.number().int().min(0).max(10_000).default(0),
  seo_title: optionalText(70),
  seo_description: optionalText(180),
  open_graph_image: identifierSchema.nullable().optional(),
  status: z.enum(["draft", "published"]).default("draft"),
});
