"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/auth";
import { getPermissions } from "@/lib/auth/permissions";
import { createDatabaseClient } from "@/lib/database";
import { TestimonialsRepository } from "@/lib/database/repositories/testimonials-repository";
import {
  testimonialSchema,
  testimonialUpdateSchema,
} from "@/lib/validation/testimonials";

export interface TestimonialActionState {
  readonly fieldErrors?: Readonly<Record<string, readonly string[]>>;
  readonly message: string;
  readonly status: "idle" | "error" | "success";
}
export const initialTestimonialActionState: TestimonialActionState = {
  message: "",
  status: "idle",
};
class TestimonialPermissionError extends Error {}
async function requirePermission(operation: "delete" | "write") {
  const user = await requireAdmin();
  if (!getPermissions(user.role).canManageContent)
    throw new TestimonialPermissionError(
      "Your viewer role has read-only testimonial access.",
    );
  if (operation === "delete" && user.role !== "admin")
    throw new TestimonialPermissionError(
      "Only administrators can permanently delete testimonials.",
    );
  return user;
}
function values(formData: FormData) {
  const approval = formData.get("approval_status");
  const status = formData.get("status");
  return {
    reviewer_name: formData.get("reviewer_name"),
    company_name: formData.get("company_name") || null,
    reviewer_role: formData.get("reviewer_role") || null,
    quote: formData.get("quote"),
    rating: formData.get("rating") ? Number(formData.get("rating")) : null,
    related_service_id: null,
    consent_verified: formData.get("consent_verified") === "on",
    is_featured: formData.get("is_featured") === "on",
    approval_status: approval,
    display_order: Number(formData.get("display_order") ?? 0),
    published_at: status === "published" ? new Date().toISOString() : null,
    approved_at: approval === "approved" ? new Date().toISOString() : null,
    approved_by: null,
    meta_title: formData.get("meta_title") || null,
    meta_description: formData.get("meta_description") || null,
    status,
  };
}
function validationFailure(
  errors: Record<string, string[] | undefined>,
): TestimonialActionState {
  const fieldErrors = Object.fromEntries(
    Object.entries(errors).filter((entry): entry is [string, string[]] =>
      Boolean(entry[1]?.length),
    ),
  );
  return {
    fieldErrors,
    message: "Review the highlighted fields and try again.",
    status: "error",
  };
}
function publicationFailure(data: {
  readonly approval_status?: string;
  readonly consent_verified?: boolean;
  readonly status?: string;
}): TestimonialActionState | null {
  if (data.status !== "published") return null;
  if (data.approval_status !== "approved") {
    return {
      fieldErrors: {
        approval_status: ["Approve the testimonial before publishing."],
      },
      message: "Approval and verified consent are required before publishing.",
      status: "error",
    };
  }
  if (!data.consent_verified) {
    return {
      fieldErrors: {
        consent_verified: ["Verify consent before publishing."],
      },
      message: "Approval and verified consent are required before publishing.",
      status: "error",
    };
  }
  return null;
}
function failure(error: unknown): TestimonialActionState {
  return {
    message:
      error instanceof TestimonialPermissionError
        ? error.message
        : "The testimonial change could not be completed. Please try again.",
    status: "error",
  };
}
function revalidateTestimonials() {
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
export async function createTestimonial(
  _state: TestimonialActionState,
  formData: FormData,
): Promise<TestimonialActionState> {
  const parsed = testimonialSchema.safeParse(values(formData));
  if (!parsed.success)
    return validationFailure(parsed.error.flatten().fieldErrors);
  const publicationError = publicationFailure(parsed.data);
  if (publicationError) return publicationError;
  try {
    const user = await requirePermission("write");
    const data = {
      ...parsed.data,
      approved_by: parsed.data.approval_status === "approved" ? user.id : null,
    };
    await new TestimonialsRepository(await createDatabaseClient()).create(data);
    revalidateTestimonials();
    return { message: "Testimonial created successfully.", status: "success" };
  } catch (error) {
    return failure(error);
  }
}
export async function updateTestimonial(
  _state: TestimonialActionState,
  formData: FormData,
): Promise<TestimonialActionState> {
  const id = String(formData.get("id") ?? "");
  const parsed = testimonialUpdateSchema.safeParse(values(formData));
  if (!z.uuid().safeParse(id).success)
    return { message: "A valid testimonial ID is required.", status: "error" };
  if (!parsed.success)
    return validationFailure(parsed.error.flatten().fieldErrors);
  const publicationError = publicationFailure(parsed.data);
  if (publicationError) return publicationError;
  try {
    const user = await requirePermission("write");
    const data = {
      ...parsed.data,
      approved_by: parsed.data.approval_status === "approved" ? user.id : null,
    };
    await new TestimonialsRepository(await createDatabaseClient()).update(
      id,
      data,
    );
    revalidateTestimonials();
    return { message: "Testimonial updated successfully.", status: "success" };
  } catch (error) {
    return failure(error);
  }
}
async function lifecycle(
  id: string,
  operation:
    | "approve"
    | "archive"
    | "delete"
    | "feature"
    | "publish"
    | "reject"
    | "restore"
    | "unpublish",
): Promise<TestimonialActionState> {
  if (!z.uuid().safeParse(id).success)
    return { message: "A valid testimonial ID is required.", status: "error" };
  try {
    const user = await requirePermission(
      operation === "delete" ? "delete" : "write",
    );
    const repository = new TestimonialsRepository(await createDatabaseClient());
    const item = await repository.findById(id);
    if (!item)
      return {
        message: "The requested testimonial was not found.",
        status: "error",
      };
    if (operation === "delete") await repository.delete(id);
    else if (operation === "approve") await repository.approve(id, user.id);
    else if (operation === "reject") await repository.reject(id);
    else if (operation === "publish") {
      if (item.approval_status !== "approved" || !item.consent_verified)
        return {
          message:
            "Approval and verified consent are required before publishing.",
          status: "error",
        };
      await repository.publish(id);
    } else if (operation === "unpublish") await repository.unpublish(id);
    else if (operation === "archive") await repository.archive(id);
    else if (operation === "restore") await repository.restore(id);
    else await repository.update(id, { is_featured: !item.is_featured });
    revalidateTestimonials();
    const messages = {
      approve: "Testimonial approved.",
      archive: "Testimonial archived.",
      delete: "Testimonial deleted permanently.",
      feature: item.is_featured
        ? "Testimonial removed from featured placement."
        : "Testimonial marked as featured.",
      publish: "Testimonial published.",
      reject: "Testimonial rejected and returned to draft.",
      restore: "Testimonial restored to draft.",
      unpublish: "Testimonial unpublished.",
    } as const;
    return { message: messages[operation], status: "success" };
  } catch (error) {
    return failure(error);
  }
}
export async function deleteTestimonial(id: string) {
  return lifecycle(id, "delete");
}
export async function publishTestimonial(id: string) {
  return lifecycle(id, "publish");
}
export async function unpublishTestimonial(id: string) {
  return lifecycle(id, "unpublish");
}
export async function archiveTestimonial(id: string) {
  return lifecycle(id, "archive");
}
export async function restoreTestimonial(id: string) {
  return lifecycle(id, "restore");
}
export async function approveTestimonial(id: string) {
  return lifecycle(id, "approve");
}
export async function rejectTestimonial(id: string) {
  return lifecycle(id, "reject");
}
export async function toggleFeaturedTestimonial(id: string) {
  return lifecycle(id, "feature");
}
