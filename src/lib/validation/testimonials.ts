import { z } from "zod";

import {
  contentStatusSchema,
  identifierSchema,
  requireAtLeastOneField,
} from "./shared";

export const testimonialSchema = z.strictObject({
  reviewer_name: z.string().trim().min(2).max(160),
  company_name: z.string().trim().max(160).nullable().optional(),
  reviewer_role: z.string().trim().max(160).nullable().optional(),
  quote: z.string().trim().min(10).max(3_000),
  rating: z.number().int().min(1).max(5).nullable().optional(),
  related_service_id: identifierSchema.nullable().optional(),
  consent_verified: z.boolean().default(false),
  is_featured: z.boolean().default(false),
  status: contentStatusSchema.default("draft"),
});

export const testimonialUpdateSchema =
  requireAtLeastOneField(testimonialSchema);

export type TestimonialInput = z.input<typeof testimonialSchema>;
export type TestimonialUpdateInput = z.input<typeof testimonialUpdateSchema>;
