import { z } from "zod";

export const mediaIdSchema = z.uuid();
export const mediaMetadataSchema = z.strictObject({
  alt: z.string().trim().max(300).nullable().optional(),
  file_name: z.string().trim().min(1).max(255),
  folder: z
    .string()
    .trim()
    .min(1)
    .max(180)
    .regex(/^[a-zA-Z0-9/_-]+$/),
  tags: z.array(z.string().trim().min(1).max(80)).max(30).default([]),
});
export const mediaRenameSchema = z.strictObject({
  id: mediaIdSchema,
  file_name: z.string().trim().min(1).max(255),
  public_id: z
    .string()
    .trim()
    .min(1)
    .max(500)
    .regex(/^[a-zA-Z0-9/_-]+$/),
});

export type MediaMetadataInput = z.infer<typeof mediaMetadataSchema>;
