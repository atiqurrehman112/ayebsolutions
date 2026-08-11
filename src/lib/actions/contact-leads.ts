"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireAdmin } from "@/lib/auth/auth";
import { getPermissions } from "@/lib/auth/permissions";
import { createDatabaseClient } from "@/lib/database";
import {
  ContactLeadsRepository,
  type LeadPriority,
} from "@/lib/database/repositories/contact-leads-repository";
import { sendLeadEmail } from "@/lib/email/leads";
import { leadReplySchema, leadStatusSchema } from "@/lib/validation/contact";

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
      await repo.setStatus(parsed.id, parsed.status);
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
    await access();
    const parsed = z
      .object({ id: z.uuid(), notes: z.string().trim().min(2).max(10_000) })
      .parse({ id, notes });
    await (await repository()).update(parsed.id, { notes: parsed.notes });
    refresh();
    return { message: "Internal notes saved.", status: "success" };
  } catch (error) {
    return failure(error);
  }
}
export async function restoreLead(id: string) {
  return changeLeadStatus(id, "new");
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
    const user = await access();
    const parsed = leadReplySchema.parse(input);
    const repo = await repository();
    const providerId = await sendLeadEmail({
      body: parsed.body,
      recipient: parsed.recipient,
      subject: parsed.subject,
    });
    await repo.recordEmail({
      body: parsed.body,
      emailType: parsed.email_type,
      leadId: parsed.id,
      providerId,
      recipient: parsed.recipient,
      sentBy: user.id,
      subject: parsed.subject,
    });
    await repo.update(parsed.id, {
      last_contacted_at: new Date().toISOString(),
    });
    refresh();
    return { message: "Email sent and recorded.", status: "success" };
  } catch (error) {
    return failure(error);
  }
}
