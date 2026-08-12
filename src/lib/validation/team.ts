import { z } from "zod";
import { identifierSchema, requireAtLeastOneField } from "./shared";

const optionalText = (max: number) =>
  z.string().trim().max(max).nullable().optional();
const optionalUrl = z.url().max(500).nullable().optional();

export const teamMemberSchema = z.strictObject({
  name: z.string().trim().min(2).max(160),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  profile_image: identifierSchema.nullable().optional(),
  role: z.string().trim().min(2).max(160),
  department: optionalText(120),
  short_bio: z.string().trim().min(10).max(320),
  full_bio: optionalText(5_000),
  skills: z.array(z.string().trim().min(1).max(80)).max(30).default([]),
  years_experience: z.number().int().min(0).max(80).nullable().optional(),
  email: z.email().max(320).nullable().optional(),
  linkedin_url: optionalUrl,
  github_url: optionalUrl,
  twitter_url: optionalUrl,
  portfolio_url: optionalUrl,
  featured: z.boolean().default(false),
  display_order: z.number().int().nonnegative().max(10_000).default(0),
  status: z.enum(["draft", "published"]).default("draft"),
});

export const teamMemberUpdateSchema = requireAtLeastOneField(teamMemberSchema);
