import { z } from "zod";

import {
  contentStatusSchema,
  identifierSchema,
  optionalTextSchema,
  requireAtLeastOneField,
  slugSchema,
  summarySchema,
  titleSchema,
} from "./shared";

export const portfolioProjectSchema = z.strictObject({
  title: titleSchema,
  slug: slugSchema,
  summary: summarySchema,
  challenge: optionalTextSchema,
  solution: optionalTextSchema,
  category_id: identifierSchema.nullable().optional(),
  project_type: z.string().trim().min(2).max(100),
  technologies: z.array(z.string().trim().min(1).max(80)).max(30).default([]),
  features: z.json().default([]),
  content: z.json().default({}),
  status: contentStatusSchema.default("draft"),
  is_featured: z.boolean().default(false),
  published_at: z.iso.datetime().nullable().optional(),
  meta_title: z.string().trim().max(70).nullable().optional(),
  meta_description: z.string().trim().max(180).nullable().optional(),
});

export const portfolioProjectUpdateSchema = requireAtLeastOneField(
  portfolioProjectSchema,
);
