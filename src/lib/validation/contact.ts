import { z } from "zod";

import { requireAtLeastOneField } from "./shared";

export const leadStatusSchema = z.enum([
  "new",
  "reviewed",
  "assigned",
  "proposal",
  "follow_up",
  "closed",
  "archived",
]);

export const contactLeadSchema = z.strictObject({
  name: z.string().trim().min(2).max(160),
  email: z.email().trim().toLowerCase().max(320),
  company: z.string().trim().max(160).nullable().optional(),
  project_type: z.string().trim().min(2).max(120),
  budget_range: z.string().trim().max(120).nullable().optional(),
  timeline: z.string().trim().max(120).nullable().optional(),
  message: z.string().trim().min(20).max(10_000),
  interested_services: z
    .array(z.string().trim().min(1).max(120))
    .max(20)
    .default([]),
  priority: z.enum(["low", "normal", "high"]).default("normal"),
  status: leadStatusSchema.default("new"),
  source: z.string().trim().min(2).max(120).default("website"),
  assigned_to: z.uuid().nullable().optional(),
  internal_notes: z.string().trim().max(10_000).nullable().optional(),
});

export const contactLeadUpdateSchema =
  requireAtLeastOneField(contactLeadSchema);

export type ContactLeadInput = z.input<typeof contactLeadSchema>;
export type ContactLeadUpdateInput = z.input<typeof contactLeadUpdateSchema>;
