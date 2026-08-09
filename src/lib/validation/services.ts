import { z } from "zod";

import {
  contentStatusSchema,
  identifierSchema,
  requireAtLeastOneField,
  slugSchema,
  summarySchema,
  titleSchema,
} from "./shared";

export const serviceSchema = z.strictObject({
  title: titleSchema,
  slug: slugSchema,
  summary: summarySchema,
  description: z.string().trim().min(20).max(20_000),
  category_id: identifierSchema.nullable().optional(),
  features: z.array(z.string().trim().min(1).max(180)).max(50).default([]),
  technologies: z.array(z.string().trim().min(1).max(80)).max(30).default([]),
  status: contentStatusSchema.default("draft"),
  is_featured: z.boolean().default(false),
  sort_order: z.number().int().nonnegative().max(10_000).default(0),
  meta_title: z.string().trim().max(70).nullable().optional(),
  meta_description: z.string().trim().max(180).nullable().optional(),
});

export const serviceUpdateSchema = requireAtLeastOneField(serviceSchema);

export type ServiceInput = z.input<typeof serviceSchema>;
export type ServiceUpdateInput = z.input<typeof serviceUpdateSchema>;
