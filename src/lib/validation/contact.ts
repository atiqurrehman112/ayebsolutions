import { z } from "zod";

import { requireAtLeastOneField } from "./shared";

export const leadStatusSchema = z.enum([
  "new",
  "contacted",
  "qualified",
  "proposal_sent",
  "won",
  "lost",
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
  priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
  status: leadStatusSchema.default("new"),
  source: z.string().trim().min(2).max(120).default("website"),
  assigned_to: z.uuid().nullable().optional(),
  notes: z.string().trim().max(10_000).nullable().optional(),
  subject: z.string().trim().max(240).nullable().optional(),
  estimated_budget: z.string().trim().max(120).nullable().optional(),
  last_contacted_at: z.iso.datetime().nullable().optional(),
  status_changed_at: z.iso.datetime().optional(),
});

export const leadReplySchema = z.strictObject({
  id: z.uuid(),
  subject: z.string().trim().min(2).max(240),
  body: z.string().trim().min(2).max(10_000),
  recipient: z.email(),
  email_type: z.enum(["reply", "acknowledgement", "internal_notification"]),
});

export const contactLeadUpdateSchema =
  requireAtLeastOneField(contactLeadSchema);

const optionalText = (maximum: number) =>
  z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? null : value,
    z.string().trim().max(maximum).nullable(),
  );

export const publicContactSchema = z.strictObject({
  name: z.string().trim().min(2, "Enter your name.").max(160),
  company: optionalText(160),
  email: z.email("Enter a valid email address.").trim().toLowerCase().max(320),
  phone: z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? null : value,
    z
      .string()
      .trim()
      .regex(/^\+?[0-9][0-9 ()-]{6,24}$/, "Enter a valid phone number.")
      .max(25)
      .nullable(),
  ),
  service: z.string().trim().min(2, "Choose a service.").max(120),
  interests: z.array(z.string().trim().min(2).max(120)).max(7).default([]),
  budget: optionalText(120),
  timeline: optionalText(120),
  message: z.string().trim().min(20, "Add at least 20 characters.").max(5_000),
  consent: z.literal("on", { error: "Consent is required." }),
  website: z.string().max(0),
});

export type PublicContactInput = z.infer<typeof publicContactSchema>;

export type ContactLeadInput = z.input<typeof contactLeadSchema>;
export type ContactLeadUpdateInput = z.input<typeof contactLeadUpdateSchema>;
