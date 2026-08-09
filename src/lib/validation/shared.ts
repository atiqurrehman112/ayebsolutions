import { z } from "zod";

export const contentStatusSchema = z.enum([
  "draft",
  "review",
  "published",
  "archived",
]);

export const slugSchema = z
  .string()
  .trim()
  .min(1)
  .max(160)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase URL-safe slug.");

export const titleSchema = z.string().trim().min(2).max(180);
export const summarySchema = z.string().trim().min(10).max(600);
export const optionalTextSchema = z
  .string()
  .trim()
  .max(10_000)
  .nullable()
  .optional();
export const identifierSchema = z.uuid();

export function requireAtLeastOneField<Schema extends z.ZodRawShape>(
  schema: z.ZodObject<Schema>,
) {
  return schema
    .partial()
    .refine(
      (value) => Object.keys(value).length > 0,
      "Provide at least one field to update.",
    );
}
