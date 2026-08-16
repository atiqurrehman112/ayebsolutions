import { z } from "zod";

export const leadStatusSchema = z.enum([
  "new",
  "read",
  "in_progress",
  "replied",
  "won",
  "lost",
  "archived",
]);

export const leadReplySchema = z.strictObject({
  id: z.uuid(),
  subject: z.string().trim().min(2).max(240),
  body: z.string().trim().min(2).max(10_000),
  recipient: z.email(),
  email_type: z.enum(["reply", "acknowledgement", "internal_notification"]),
});

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
