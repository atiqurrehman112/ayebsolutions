"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

import { requireAdmin } from "@/lib/auth/auth";
import { getPermissions } from "@/lib/auth/permissions";
import { createDatabaseClient } from "@/lib/database";
import {
  ContactLeadsRepository,
  type LeadPriority,
} from "@/lib/database/repositories/contact-leads-repository";
import { sendLeadEmail } from "@/lib/email/leads";
import { interpolateEmail, richTextToHtml } from "@/lib/email/content";
import {
  emailTemplateSchema,
  followUpSchema,
  leadReplySchema,
  leadStatusSchema,
} from "@/lib/validation/contact";

export interface LeadActionState {
  readonly message: string;
  readonly status: "error" | "success";
}
class LeadPermissionError extends Error {}
async function access(adminOnly = false) {
  const user = await requireAdmin();
  if (!getPermissions(user.role).canManageContent)
    throw new LeadPermissionError("Your viewer role has read-only access.");
  if (adminOnly && user.role !== "admin")
    throw new LeadPermissionError(
      "Only administrators can permanently delete leads.",
    );
  return user;
}
function failure(error: unknown): LeadActionState {
  return {
    message:
      error instanceof LeadPermissionError
        ? error.message
        : error instanceof Error &&
            error.message === "Email delivery is not configured."
          ? error.message
          : "The lead change could not be completed. Please try again.",
    status: "error",
  };
}
function refresh() {
  revalidatePath("/admin/contact-leads");
}
async function repository() {
  return new ContactLeadsRepository(await createDatabaseClient());
}
async function assertSameOrigin() {
  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin");
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  if (origin && host && new URL(origin).host !== host)
    throw new LeadPermissionError("The request origin could not be verified.");
}

export async function assignLead(
  id: string,
  assignedTo: string | null,
): Promise<LeadActionState> {
  try {
    await access();
    const parsed = z
      .object({ id: z.uuid(), assignedTo: z.uuid().nullable() })
      .parse({ id, assignedTo });
    await (
      await repository()
    ).update(parsed.id, { assigned_to: parsed.assignedTo });
    refresh();
    return { message: "Lead assignment updated.", status: "success" };
  } catch (error) {
    return failure(error);
  }
}
export async function changeLeadPriority(
  id: string,
  priority: LeadPriority,
): Promise<LeadActionState> {
  try {
    await access();
    const parsed = z
      .object({
        id: z.uuid(),
        priority: z.enum(["low", "medium", "high", "urgent"]),
      })
      .parse({ id, priority });
    await (await repository()).update(parsed.id, { priority: parsed.priority });
    refresh();
    return { message: "Lead priority updated.", status: "success" };
  } catch (error) {
    return failure(error);
  }
}
export async function changeLeadStatus(
  id: string,
  status: z.infer<typeof leadStatusSchema>,
): Promise<LeadActionState> {
  try {
    const user = await access();
    const parsed = z
      .object({ id: z.uuid(), status: leadStatusSchema })
      .parse({ id, status });
    const repo = await repository();
    const lead = await repo.findById(parsed.id);
    if (!lead) return { message: "The lead was not found.", status: "error" };
    if (lead.status !== parsed.status) {
      const timestamp = new Date().toISOString();
      await repo.update(parsed.id, {
        status: parsed.status,
        status_changed_at: timestamp,
        read_at: parsed.status === "new" ? null : (lead.read_at ?? timestamp),
        replied_at: parsed.status === "replied" ? timestamp : lead.replied_at,
      });
      await repo.recordStatus(parsed.id, lead.status, parsed.status, user.id);
    }
    refresh();
    return { message: "Lead status updated.", status: "success" };
  } catch (error) {
    return failure(error);
  }
}
export async function addLeadNote(
  id: string,
  notes: string,
): Promise<LeadActionState> {
  try {
    const user = await access(true);
    const parsed = z
      .object({ id: z.uuid(), notes: z.string().trim().min(2).max(10_000) })
      .parse({ id, notes });
    const repo = await repository();
    await repo.update(parsed.id, { notes: parsed.notes, updated_by: user.id });
    await repo.recordNote(parsed.id, parsed.notes, user.id);
    refresh();
    return { message: "Internal notes saved.", status: "success" };
  } catch (error) {
    return failure(error);
  }
}
export async function restoreLead(id: string) {
  return changeLeadStatus(id, "new");
}
export async function setLeadImportant(
  id: string,
  important: boolean,
): Promise<LeadActionState> {
  try {
    await access(true);
    const parsed = z
      .object({ id: z.uuid(), important: z.boolean() })
      .parse({ id, important });
    await (
      await repository()
    ).update(parsed.id, { is_important: parsed.important });
    refresh();
    return {
      message: parsed.important
        ? "Lead marked important."
        : "Important mark removed.",
      status: "success",
    };
  } catch (error) {
    return failure(error);
  }
}

const bulkIntentSchema = z.enum([
  "archive",
  "restore",
  "read",
  "unread",
  "replied",
  "star",
  "unstar",
  "delete",
]);
export async function bulkLeadAction(formData: FormData): Promise<void> {
  const intent = bulkIntentSchema.parse(formData.get("intent"));
  const parsedIds = z
    .array(z.uuid())
    .min(1)
    .max(100)
    .safeParse(formData.getAll("leadId"));
  if (!parsedIds.success) return;
  const ids = parsedIds.data;
  const user = await access(intent === "delete");
  const repo = await repository();
  if (intent === "delete") await repo.deleteMany(ids);
  else if (intent === "star" || intent === "unstar")
    await repo.updateMany(ids, { is_important: intent === "star" });
  else {
    const status: z.infer<typeof leadStatusSchema> =
      intent === "archive"
        ? "archived"
        : intent === "restore" || intent === "unread"
          ? "new"
          : intent === "read"
            ? "read"
            : "replied";
    const leads = await repo.findByIds(ids);
    const timestamp = new Date().toISOString();
    await repo.updateMany(ids, {
      status,
      status_changed_at: timestamp,
      read_at: status === "new" ? null : timestamp,
      replied_at: status === "replied" ? timestamp : undefined,
    });
    await repo.recordStatuses(
      leads
        .filter((lead) => lead.status !== status)
        .map((lead) => ({
          leadId: lead.id,
          fromStatus: lead.status,
          toStatus: status,
        })),
      user.id,
    );
  }
  refresh();
}
export async function deleteLead(id: string): Promise<LeadActionState> {
  try {
    await access(true);
    const parsed = z.uuid().parse(id);
    await (await repository()).delete(parsed);
    refresh();
    return { message: "Lead permanently deleted.", status: "success" };
  } catch (error) {
    return failure(error);
  }
}
export async function sendLeadMessage(
  input: z.input<typeof leadReplySchema>,
): Promise<LeadActionState> {
  try {
    await assertSameOrigin();
    const user = await access(true);
    const parsed = leadReplySchema.parse(input);
    const repo = await repository();
    const lead = await repo.findById(parsed.id);
    if (!lead) return { message: "The lead was not found.", status: "error" };
    const recent = await repo.countRecentOutgoing(
      user.id,
      new Date(Date.now() - 5 * 60_000).toISOString(),
    );
    if (recent >= 10)
      return {
        message:
          "Email limit reached. Wait a few minutes before sending again.",
        status: "error",
      };
    if (lead.email.toLowerCase() !== parsed.recipient.toLowerCase())
      return {
        message: "Recipient does not match this lead.",
        status: "error",
      };
    const variables = {
      budget: lead.budget_range ?? "",
      company: lead.company ?? "",
      name: lead.name,
      service: lead.project_type,
    };
    const subject = interpolateEmail(parsed.subject, variables);
    const body = interpolateEmail(parsed.body, variables);
    const html = richTextToHtml(body);
    const providerId = await sendLeadEmail({
      bcc: parsed.bcc,
      body,
      cc: parsed.cc,
      html,
      recipient: parsed.recipient,
      replyTo: parsed.reply_to || undefined,
      subject,
    });
    await repo.recordEmail({
      bcc: parsed.bcc,
      body,
      cc: parsed.cc,
      emailType: parsed.email_type,
      leadId: parsed.id,
      providerId,
      htmlBody: html,
      replyTo: parsed.reply_to || null,
      recipient: parsed.recipient,
      sentBy: user.id,
      subject,
    });
    const timestamp = new Date().toISOString();
    await repo.update(parsed.id, {
      last_contacted_at: timestamp,
      read_at: lead.read_at ?? timestamp,
      replied_at: timestamp,
      status: "replied",
      status_changed_at: timestamp,
    });
    if (lead.status !== "replied")
      await repo.recordStatus(parsed.id, lead.status, "replied", user.id);
    refresh();
    return { message: "Email sent and recorded.", status: "success" };
  } catch (error) {
    return failure(error);
  }
}

export async function saveEmailTemplate(
  input: z.input<typeof emailTemplateSchema>,
): Promise<LeadActionState> {
  try {
    await assertSameOrigin();
    const user = await access(true);
    const parsed = emailTemplateSchema.parse(input);
    await (
      await repository()
    ).saveTemplate({
      id: parsed.id ?? undefined,
      name: parsed.name,
      category: parsed.category,
      subject: parsed.subject,
      body_text: parsed.body,
      body_html: richTextToHtml(parsed.body),
      created_by: user.id,
      updated_by: user.id,
      variables: ["name", "company", "service", "budget"],
    });
    refresh();
    return { message: "Email template saved.", status: "success" };
  } catch (error) {
    return failure(error);
  }
}

export async function deleteEmailTemplate(
  id: string,
): Promise<LeadActionState> {
  try {
    await assertSameOrigin();
    await access(true);
    await (await repository()).deleteTemplate(z.uuid().parse(id));
    refresh();
    return { message: "Custom template deleted.", status: "success" };
  } catch (error) {
    return failure(error);
  }
}

export async function scheduleLeadFollowUp(
  input: z.input<typeof followUpSchema>,
): Promise<LeadActionState> {
  try {
    await assertSameOrigin();
    const user = await access(true);
    const parsed = followUpSchema.parse(input);
    await (
      await repository()
    ).scheduleFollowUp({
      leadId: parsed.lead_id,
      note: parsed.note || null,
      scheduledFor: parsed.scheduled_for,
      userId: user.id,
    });
    refresh();
    return { message: "Follow-up scheduled.", status: "success" };
  } catch (error) {
    return failure(error);
  }
}

export async function completeLeadFollowUp(
  id: string,
  leadId: string,
): Promise<LeadActionState> {
  try {
    await assertSameOrigin();
    const user = await access(true);
    const parsed = z
      .object({ id: z.uuid(), leadId: z.uuid() })
      .parse({ id, leadId });
    await (
      await repository()
    ).completeFollowUp(parsed.id, parsed.leadId, user.id);
    refresh();
    return { message: "Follow-up completed.", status: "success" };
  } catch (error) {
    return failure(error);
  }
}
