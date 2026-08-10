"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/auth";
import { getPermissions } from "@/lib/auth/permissions";
import { createDatabaseClient } from "@/lib/database";
import { ServicesRepository } from "@/lib/database/repositories/services-repository";
import { serviceSchema, serviceUpdateSchema } from "@/lib/validation/services";

export interface ServiceActionState {
  readonly fieldErrors?: Readonly<Record<string, readonly string[]>>;
  readonly message: string;
  readonly status: "idle" | "error" | "success";
}
export const initialServiceActionState: ServiceActionState = {
  message: "",
  status: "idle",
};
class ServicePermissionError extends Error {}
async function requireServicePermission(operation: "delete" | "write") {
  const user = await requireAdmin();
  if (!getPermissions(user.role).canManageContent)
    throw new ServicePermissionError(
      "Your viewer role has read-only service access.",
    );
  if (operation === "delete" && user.role !== "admin")
    throw new ServicePermissionError(
      "Only administrators can permanently delete services.",
    );
}
function list(value: FormDataEntryValue | null) {
  return [
    ...new Set(
      String(value ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ];
}
function values(formData: FormData) {
  return {
    title: formData.get("title"),
    slug: formData.get("slug"),
    summary: formData.get("summary"),
    description: formData.get("description"),
    icon: formData.get("icon") || null,
    category_id: formData.get("category_id") || null,
    is_featured: formData.get("is_featured") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0),
    meta_title: formData.get("meta_title") || null,
    meta_description: formData.get("meta_description") || null,
    keywords: list(formData.get("keywords")),
    features: list(formData.get("features")),
    technologies: list(formData.get("technologies")),
    status: formData.get("status"),
  };
}
function validationFailure(
  errors: Record<string, string[] | undefined>,
): ServiceActionState {
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
function actionFailure(error: unknown): ServiceActionState {
  return {
    message:
      error instanceof ServicePermissionError
        ? error.message
        : "The service change could not be completed. Please try again.",
    status: "error",
  };
}
function revalidateServices(...slugs: readonly (string | null | undefined)[]) {
  revalidateTag("services");
  revalidatePath("/admin/services");
  revalidatePath("/services");
  for (const slug of new Set(
    slugs.filter((value): value is string => Boolean(value)),
  ))
    revalidatePath(`/services/${slug}`);
}
export async function createService(
  _state: ServiceActionState,
  formData: FormData,
): Promise<ServiceActionState> {
  const parsed = serviceSchema.safeParse(values(formData));
  if (!parsed.success)
    return validationFailure(parsed.error.flatten().fieldErrors);
  try {
    await requireServicePermission("write");
    const service = await new ServicesRepository(
      await createDatabaseClient(),
    ).create(parsed.data);
    revalidateServices(service.slug);
    return { message: "Service created successfully.", status: "success" };
  } catch (error) {
    return actionFailure(error);
  }
}
export async function updateService(
  _state: ServiceActionState,
  formData: FormData,
): Promise<ServiceActionState> {
  const id = String(formData.get("id") ?? "");
  const parsed = serviceUpdateSchema.safeParse(values(formData));
  if (!z.uuid().safeParse(id).success)
    return { message: "A valid service ID is required.", status: "error" };
  if (!parsed.success)
    return validationFailure(parsed.error.flatten().fieldErrors);
  try {
    await requireServicePermission("write");
    const repository = new ServicesRepository(await createDatabaseClient());
    const previous = await repository.findById(id);
    const service = await repository.update(id, parsed.data);
    revalidateServices(previous?.slug, service.slug);
    return { message: "Service updated successfully.", status: "success" };
  } catch (error) {
    return actionFailure(error);
  }
}
async function lifecycle(
  id: string,
  operation:
    "archive" | "delete" | "publish" | "restore" | "review" | "unpublish",
): Promise<ServiceActionState> {
  if (!z.uuid().safeParse(id).success)
    return { message: "A valid service ID is required.", status: "error" };
  try {
    await requireServicePermission(operation === "delete" ? "delete" : "write");
    const repository = new ServicesRepository(await createDatabaseClient());
    const service = await repository.findById(id);
    if (!service)
      return {
        message: "The requested service was not found.",
        status: "error",
      };
    if (operation === "delete") await repository.delete(id);
    else if (operation === "archive") await repository.archive(id);
    else if (operation === "publish") await repository.publish(id);
    else if (operation === "restore" || operation === "unpublish")
      await repository.setStatus(id, "draft");
    else await repository.setStatus(id, "review");
    revalidateServices(service.slug);
    const messages = {
      archive: "Service archived successfully.",
      delete: "Service deleted successfully.",
      publish: "Service published successfully.",
      restore: "Service restored to draft.",
      review: "Service moved to review.",
      unpublish: "Service returned to draft.",
    } as const;
    return { message: messages[operation], status: "success" };
  } catch (error) {
    return actionFailure(error);
  }
}
export async function deleteService(id: string) {
  return lifecycle(id, "delete");
}
export async function publishService(id: string) {
  return lifecycle(id, "publish");
}
export async function unpublishService(id: string) {
  return lifecycle(id, "unpublish");
}
export async function archiveService(id: string) {
  return lifecycle(id, "archive");
}
export async function restoreService(id: string) {
  return lifecycle(id, "restore");
}
export async function moveServiceToReview(id: string) {
  return lifecycle(id, "review");
}
