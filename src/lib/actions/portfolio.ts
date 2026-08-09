"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth/auth";
import { getPermissions } from "@/lib/auth/permissions";
import { createDatabaseClient } from "@/lib/database";
import { PortfolioRepository } from "@/lib/database/repositories/portfolio-repository";
import {
  portfolioProjectSchema,
  portfolioProjectUpdateSchema,
} from "@/lib/validation/portfolio";
import type { Json } from "@/types/database";
import { z } from "zod";

export interface PortfolioActionState {
  readonly fieldErrors?: Readonly<Record<string, readonly string[]>>;
  readonly message: string;
  readonly status: "idle" | "error" | "success";
}

export const initialPortfolioActionState: PortfolioActionState = {
  message: "",
  status: "idle",
};

class PortfolioPermissionError extends Error {}

async function requirePortfolioPermission(operation: "delete" | "write") {
  const user = await requireAdmin();
  const permissions = getPermissions(user.role);

  if (!permissions.canManageContent) {
    throw new PortfolioPermissionError(
      "Your viewer role has read-only portfolio access.",
    );
  }
  if (operation === "delete" && user.role !== "admin") {
    throw new PortfolioPermissionError(
      "Only administrators can permanently delete projects.",
    );
  }

  return user;
}

function parseTechnologies(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((technology) => technology.trim())
    .filter(Boolean);
}

function projectFormValues(formData: FormData) {
  return {
    title: formData.get("title"),
    slug: formData.get("slug"),
    summary: formData.get("summary"),
    category_id: formData.get("category_id") || null,
    project_type: formData.get("project_type"),
    technologies: parseTechnologies(formData.get("technologies")),
    content: { body: String(formData.get("content") ?? "") } satisfies Json,
    status: formData.get("status"),
    is_featured: formData.get("is_featured") === "on",
    meta_title: formData.get("meta_title") || null,
    meta_description: formData.get("meta_description") || null,
  };
}

function validationFailure(
  errors: Record<string, string[] | undefined>,
): PortfolioActionState {
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

function actionFailure(error: unknown): PortfolioActionState {
  return {
    message:
      error instanceof PortfolioPermissionError
        ? error.message
        : "The portfolio change could not be completed. Please try again.",
    status: "error",
  };
}

function revalidatePortfolio() {
  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
}

export async function createPortfolioProject(
  _previousState: PortfolioActionState,
  formData: FormData,
): Promise<PortfolioActionState> {
  const parsed = portfolioProjectSchema.safeParse({
    ...projectFormValues(formData),
    features: [],
  });
  if (!parsed.success)
    return validationFailure(parsed.error.flatten().fieldErrors);

  try {
    await requirePortfolioPermission("write");
    const repository = new PortfolioRepository(await createDatabaseClient());
    await repository.create(parsed.data);
    revalidatePortfolio();
    return { message: "Project created successfully.", status: "success" };
  } catch (error) {
    return actionFailure(error);
  }
}

export async function updatePortfolioProject(
  _previousState: PortfolioActionState,
  formData: FormData,
): Promise<PortfolioActionState> {
  const id = String(formData.get("id") ?? "");
  const parsed = portfolioProjectUpdateSchema.safeParse(
    projectFormValues(formData),
  );
  if (!z.uuid().safeParse(id).success) {
    return { message: "A valid project ID is required.", status: "error" };
  }
  if (!parsed.success)
    return validationFailure(parsed.error.flatten().fieldErrors);

  try {
    await requirePortfolioPermission("write");
    const repository = new PortfolioRepository(await createDatabaseClient());
    await repository.update(id, parsed.data);
    revalidatePortfolio();
    return { message: "Project updated successfully.", status: "success" };
  } catch (error) {
    return actionFailure(error);
  }
}

async function runLifecycleAction(
  id: string,
  operation: "archive" | "delete" | "publish" | "restore" | "unpublish",
): Promise<PortfolioActionState> {
  try {
    await requirePortfolioPermission(
      operation === "delete" ? "delete" : "write",
    );
    const repository = new PortfolioRepository(await createDatabaseClient());

    if (operation === "delete") await repository.delete(id);
    if (operation === "archive") await repository.archive(id);
    if (operation === "publish") await repository.publish(id);
    if (operation === "restore") await repository.restore(id);
    if (operation === "unpublish") await repository.setStatus(id, "draft");

    revalidatePortfolio();
    const messages = {
      archive: "Project archived successfully.",
      delete: "Project deleted successfully.",
      publish: "Project published successfully.",
      restore: "Project restored to draft.",
      unpublish: "Project returned to draft.",
    } as const;
    return {
      message: messages[operation],
      status: "success",
    };
  } catch (error) {
    return actionFailure(error);
  }
}

export async function deletePortfolioProject(id: string) {
  return runLifecycleAction(id, "delete");
}

export async function publishPortfolioProject(id: string) {
  return runLifecycleAction(id, "publish");
}

export async function unpublishPortfolioProject(id: string) {
  return runLifecycleAction(id, "unpublish");
}

export async function archivePortfolioProject(id: string) {
  return runLifecycleAction(id, "archive");
}

export async function restorePortfolioProject(id: string) {
  return runLifecycleAction(id, "restore");
}

export async function movePortfolioProjectToReview(id: string) {
  try {
    await requirePortfolioPermission("write");
    const repository = new PortfolioRepository(await createDatabaseClient());
    await repository.setStatus(id, "review");
    revalidatePortfolio();
    return {
      message: "Project moved to review.",
      status: "success",
    } satisfies PortfolioActionState;
  } catch (error) {
    return actionFailure(error);
  }
}
