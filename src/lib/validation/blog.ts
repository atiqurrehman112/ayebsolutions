import { z } from "zod";

import {
  contentStatusSchema,
  identifierSchema,
  requireAtLeastOneField,
  slugSchema,
  summarySchema,
  titleSchema,
} from "./shared";

export const blogArticleSchema = z.strictObject({
  title: titleSchema,
  slug: slugSchema,
  description: summarySchema,
  excerpt: z.string().trim().min(10).max(1_000),
  content: z.json(),
  category_id: identifierSchema.nullable().optional(),
  reading_time_minutes: z
    .number()
    .int()
    .positive()
    .max(1_440)
    .nullable()
    .optional(),
  difficulty: z.string().trim().min(2).max(80).nullable().optional(),
  keywords: z.array(z.string().trim().min(1).max(80)).max(30).default([]),
  is_featured: z.boolean().default(false),
  search_text: z.string().optional(),
  status: contentStatusSchema.default("draft"),
  published_at: z.iso.datetime().nullable().optional(),
  meta_title: z.string().trim().max(70).nullable().optional(),
  meta_description: z.string().trim().max(180).nullable().optional(),
});

export const blogArticleUpdateSchema =
  requireAtLeastOneField(blogArticleSchema);

export type BlogArticleInput = z.input<typeof blogArticleSchema>;
export type BlogArticleUpdateInput = z.input<typeof blogArticleUpdateSchema>;
