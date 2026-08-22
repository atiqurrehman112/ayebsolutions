"use server";

import { createHmac } from "node:crypto";

import { revalidatePath, revalidateTag } from "next/cache";
import { headers } from "next/headers";

import { getPublicSiteSettings } from "@/lib/site-settings/public-site-settings";
import { createServiceRoleDatabaseClient } from "@/lib/database/client";
import {
  ContactLeadsRepository,
  PublicLeadSubmissionError,
} from "@/lib/database/repositories/contact-leads-repository";
import { sendLeadEmail } from "@/lib/email/leads";
import { publicContactSchema } from "@/lib/validation/contact";

export interface ContactFormState {
  readonly fieldErrors?: Readonly<Record<string, readonly string[]>>;
  readonly message: string;
  readonly status: "error" | "idle" | "success";
  readonly submissionId?: string;
}

export const initialContactFormState: ContactFormState = {
  message: "",
  status: "idle",
};

function stringValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "");
}

async function requestIdentity() {
  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin");
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  if (origin && host && new URL(origin).host !== host) {
    throw new Error("invalid_origin");
  }
  const forwarded = requestHeaders.get("x-forwarded-for")?.split(",")[0];
  const bounded = (value: string | null, maximum: number) =>
    value?.trim().slice(0, maximum) || null;
  return {
    country: bounded(requestHeaders.get("cf-ipcountry"), 100),
    ip:
      requestHeaders.get("cf-connecting-ip") ?? forwarded?.trim() ?? "unknown",
    referrer: bounded(requestHeaders.get("referer"), 1_000),
    userAgent: bounded(requestHeaders.get("user-agent"), 1_000),
  };
}

function digest(value: string) {
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) throw new Error("missing_server_configuration");
  return createHmac("sha256", secret).update(value).digest("hex");
}

function emailCopy(
  input: {
    readonly budget: string | null;
    readonly company: string | null;
    readonly email: string;
    readonly message: string;
    readonly name: string;
    readonly phone: string | null;
    readonly service: string;
    readonly timeline: string | null;
  },
  brandName: string,
) {
  const acknowledgement = [
    `Hello ${input.name},`,
    "",
    `Thank you for contacting ${brandName}. Your project inquiry has been received and added to our review queue.`,
    "",
    `Service: ${input.service}`,
    "",
    "We will review the context you shared before recommending an appropriate next step. Response timing depends on availability and inquiry complexity.",
    "",
    brandName,
  ].join("\n");
  const notification = [
    "A new website inquiry was received.",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Company: ${input.company ?? "Not provided"}`,
    `Phone: ${input.phone ?? "Not provided"}`,
    `Service: ${input.service}`,
    `Budget: ${input.budget ?? "Not provided"}`,
    `Timeline: ${input.timeline ?? "Not provided"}`,
    "",
    "Message:",
    input.message,
  ].join("\n");
  return { acknowledgement, notification } as const;
}

export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = publicContactSchema.safeParse({
    name: stringValue(formData, "name"),
    company: stringValue(formData, "company"),
    email: stringValue(formData, "email"),
    phone: stringValue(formData, "phone"),
    service: stringValue(formData, "service"),
    interests: formData.getAll("interests").map(String),
    budget: stringValue(formData, "budget"),
    timeline: stringValue(formData, "timeline"),
    message: stringValue(formData, "message"),
    consent: stringValue(formData, "consent"),
    website: stringValue(formData, "website"),
  });
  if (!parsed.success) {
    return {
      fieldErrors: parsed.error.flatten().fieldErrors,
      message: "Review the highlighted fields and try again.",
      status: "error",
    };
  }

  try {
    const request = await requestIdentity();
    const input = parsed.data;
    const repository = new ContactLeadsRepository(
      createServiceRoleDatabaseClient(),
    );
    const payloadHash = digest(
      [input.email, input.service, input.message.toLowerCase()].join("|"),
    );
    const leadId = await repository.createPublicSubmission({
      ...input,
      country: request.country,
      ipHash: digest(request.ip),
      payloadHash,
      referrer: request.referrer,
      userAgent: request.userAgent,
    });

    const settings = await getPublicSiteSettings();
    const brandName = settings?.configuration.site_name ?? "the team";
    const copy = emailCopy(input, brandName);
    const notificationRecipient = settings?.configuration.contact_email;
    const messages = [
      {
        body: copy.acknowledgement,
        emailType: "acknowledgement",
        recipient: input.email,
        subject: `We received your ${brandName} inquiry`,
      },
      ...(notificationRecipient
        ? [
            {
              body: copy.notification,
              emailType: "internal_notification",
              recipient: notificationRecipient,
              replyTo: input.email,
              subject: `New project inquiry: ${input.service}`,
            },
          ]
        : []),
    ] as const;
    const deliveries = await Promise.allSettled(
      messages.map((message) => sendLeadEmail(message)),
    );
    await Promise.allSettled(
      deliveries.map((delivery, index) =>
        repository.recordEmail({
          ...messages[index]!,
          leadId,
          providerId: delivery.status === "fulfilled" ? delivery.value : null,
          sentBy: null,
        }),
      ),
    );

    revalidatePath("/admin/contact-leads");
    revalidateTag("contact-leads");
    return {
      message: deliveries.some((delivery) => delivery.status === "rejected")
        ? "Your inquiry was saved. Email confirmation is temporarily unavailable, but no resubmission is needed."
        : "Thank you. Your inquiry has been received and a confirmation email is on its way.",
      status: "success",
      submissionId: leadId,
    };
  } catch (error) {
    if (error instanceof PublicLeadSubmissionError) {
      return {
        message:
          error.reason === "rate_limit"
            ? "Too many inquiries were submitted recently. Please wait 15 minutes before trying again."
            : "This inquiry was already received. You do not need to submit it again.",
        status: "error",
      };
    }
    return {
      message:
        "We could not save your inquiry. Please try again or email us directly if the problem continues.",
      status: "error",
    };
  }
}
