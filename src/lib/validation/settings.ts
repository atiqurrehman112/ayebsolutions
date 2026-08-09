import { z } from "zod";

import { contentStatusSchema, requireAtLeastOneField } from "./shared";

export const siteSettingSchema = z.strictObject({
  key: z
    .string()
    .trim()
    .min(2)
    .max(160)
    .regex(/^[a-z0-9]+(?:[._-][a-z0-9]+)*$/),
  group_name: z.string().trim().min(2).max(120),
  value: z.json(),
  description: z.string().trim().max(1_000).nullable().optional(),
  is_public: z.boolean().default(false),
  status: contentStatusSchema.default("draft"),
});

export const siteSettingUpdateSchema =
  requireAtLeastOneField(siteSettingSchema);

export type SiteSettingInput = z.input<typeof siteSettingSchema>;
export type SiteSettingUpdateInput = z.input<typeof siteSettingUpdateSchema>;
