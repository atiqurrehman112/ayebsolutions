import "server-only";

import { Resend } from "resend";

import { env } from "@/lib/env";

export async function sendLeadEmail(input: {
  readonly bcc?: readonly string[];
  readonly body: string;
  readonly cc?: readonly string[];
  readonly html?: string;
  readonly recipient: string;
  readonly replyTo?: string;
  readonly subject: string;
}) {
  const apiKey = env.RESEND_API_KEY;
  const from = env.EMAIL_FROM;
  if (!apiKey || !from) throw new Error("Email delivery is not configured.");
  const { data, error } = await new Resend(apiKey).emails.send({
    from,
    to: input.recipient,
    replyTo: input.replyTo,
    subject: input.subject,
    text: input.body,
    html: input.html,
    cc: input.cc ? [...input.cc] : undefined,
    bcc: input.bcc ? [...input.bcc] : undefined,
  });
  if (error) throw new Error("Email delivery failed.");
  return data?.id ?? null;
}
