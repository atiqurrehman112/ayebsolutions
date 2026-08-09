"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireAdmin } from "@/lib/auth/auth";
import { getPermissions } from "@/lib/auth/permissions";
import { createDatabaseClient } from "@/lib/database";
import { BlogRepository } from "@/lib/database/repositories/blog-repository";
import {
  blogArticleSchema,
  blogArticleUpdateSchema,
} from "@/lib/validation/blog";
import type { Json } from "@/types/database";

export interface BlogActionState {
  readonly fieldErrors?: Readonly<Record<string, readonly string[]>>;
  readonly message: string;
  readonly status: "idle" | "error" | "success";
}

export const initialBlogActionState: BlogActionState = {
  message: "",
  status: "idle",
};
class BlogPermissionError extends Error {}

async function requireBlogPermission(operation: "delete" | "write") {
  const user = await requireAdmin();
  if (!getPermissions(user.role).canManageContent) {
    throw new BlogPermissionError(
      "Your viewer role has read-only article access.",
    );
  }
  if (operation === "delete" && user.role !== "admin") {
    throw new BlogPermissionError(
      "Only administrators can permanently delete articles.",
    );
  }
}

function commaList(value: FormDataEntryValue | null) {
  return [
    ...new Set(
      String(value ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ];
}

function formValues(formData: FormData) {
  const excerpt = String(formData.get("excerpt") ?? "");
  const readingTime = String(formData.get("reading_time_minutes") ?? "").trim();
  const status = formData.get("status");
  return {
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: excerpt,
    excerpt,
    content: { body: String(formData.get("content") ?? "") } satisfies Json,
    category_id: formData.get("category_id") || null,
    reading_time_minutes: readingTime ? Number(readingTime) : null,
    difficulty: null,
    keywords: commaList(formData.get("tags")),
    is_featured: formData.get("is_featured") === "on",
    status,
    published_at: status === "published" ? new Date().toISOString() : null,
    meta_title: formData.get("meta_title") || null,
    meta_description: formData.get("meta_description") || null,
  };
}

function validationFailure(
  errors: Record<string, string[] | undefined>,
): BlogActionState {
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
function actionFailure(error: unknown): BlogActionState {
  return {
    message:
      error instanceof BlogPermissionError
        ? error.message
        : "The article change could not be completed. Please try again.",
    status: "error",
  };
}
function revalidateBlog(...slugs: readonly (string | null | undefined)[]) {
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  for (const slug of new Set(
    slugs.filter((value): value is string => Boolean(value)),
  ))
    revalidatePath(`/blog/${slug}`);
}

export async function createBlogArticle(
  _state: BlogActionState,
  formData: FormData,
): Promise<BlogActionState> {
  const parsed = blogArticleSchema.safeParse(formValues(formData));
  if (!parsed.success)
    return validationFailure(parsed.error.flatten().fieldErrors);
  try {
    await requireBlogPermission("write");
    const article = await new BlogRepository(
      await createDatabaseClient(),
    ).create(parsed.data);
    revalidateBlog(article.slug);
    return { message: "Article created successfully.", status: "success" };
  } catch (error) {
    return actionFailure(error);
  }
}

export async function updateBlogArticle(
  _state: BlogActionState,
  formData: FormData,
): Promise<BlogActionState> {
  const id = String(formData.get("id") ?? "");
  const parsed = blogArticleUpdateSchema.safeParse(formValues(formData));
  if (!z.uuid().safeParse(id).success)
    return { message: "A valid article ID is required.", status: "error" };
  if (!parsed.success)
    return validationFailure(parsed.error.flatten().fieldErrors);
  try {
    await requireBlogPermission("write");
    const repository = new BlogRepository(await createDatabaseClient());
    const previous = await repository.findById(id);
    const article = await repository.update(id, parsed.data);
    revalidateBlog(previous?.slug, article.slug);
    return { message: "Article updated successfully.", status: "success" };
  } catch (error) {
    return actionFailure(error);
  }
}

async function lifecycle(
  id: string,
  operation:
    "archive" | "delete" | "publish" | "restore" | "review" | "unpublish",
): Promise<BlogActionState> {
  if (!z.uuid().safeParse(id).success)
    return { message: "A valid article ID is required.", status: "error" };
  try {
    await requireBlogPermission(operation === "delete" ? "delete" : "write");
    const repository = new BlogRepository(await createDatabaseClient());
    const article = await repository.findById(id);
    if (!article)
      return {
        message: "The requested article was not found.",
        status: "error",
      };
    if (operation === "delete") await repository.delete(id);
    else if (operation === "archive") await repository.archive(id);
    else if (operation === "publish") await repository.publish(id);
    else if (operation === "restore") await repository.restore(id);
    else if (operation === "unpublish") await repository.unpublish(id);
    else await repository.setStatus(id, "review");
    revalidateBlog(article.slug);
    const messages = {
      archive: "Article archived successfully.",
      delete: "Article deleted successfully.",
      publish: "Article published successfully.",
      restore: "Article restored to draft.",
      review: "Article moved to review.",
      unpublish: "Article returned to draft.",
    } as const;
    return { message: messages[operation], status: "success" };
  } catch (error) {
    return actionFailure(error);
  }
}

export async function deleteBlogArticle(id: string) {
  return lifecycle(id, "delete");
}
export async function publishBlogArticle(id: string) {
  return lifecycle(id, "publish");
}
export async function unpublishBlogArticle(id: string) {
  return lifecycle(id, "unpublish");
}
export async function archiveBlogArticle(id: string) {
  return lifecycle(id, "archive");
}
export async function restoreBlogArticle(id: string) {
  return lifecycle(id, "restore");
}
export async function moveBlogArticleToReview(id: string) {
  return lifecycle(id, "review");
}
