"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

import { requireAdmin } from "@/lib/auth/auth";
import { company } from "@/config/company";
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
  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin");
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  if (origin && host && new URL(origin).host !== host)
    throw new BlogPermissionError("The request origin could not be verified.");
  return user;
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
  const contentText = String(formData.get("content") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug =
    slugInput ||
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  const readingTime = Math.max(
    1,
    Math.ceil(contentText.trim().split(/\s+/).filter(Boolean).length / 220),
  );
  const status = formData.get("status");
  const scheduledAt = String(formData.get("scheduled_at") ?? "").trim();
  return {
    title,
    slug,
    description: excerpt,
    excerpt,
    content: { body: contentText } satisfies Json,
    category_id: formData.get("category_id") || null,
    reading_time_minutes: readingTime,
    difficulty: null,
    keywords: commaList(formData.get("tags")),
    is_featured: formData.get("is_featured") === "on",
    status,
    published_at:
      status === "published"
        ? new Date().toISOString()
        : status === "scheduled" && scheduledAt
          ? new Date(scheduledAt).toISOString()
          : null,
    meta_title: formData.get("meta_title") || null,
    meta_description: formData.get("meta_description") || null,
    canonical_url:
      formData.get("canonical_url") ||
      new URL(`/blog/${slug}`, company.url).toString(),
    featured_media_id: formData.get("featured_media_id") || null,
    open_graph_media_id: formData.get("open_graph_media_id") || null,
    author_name: formData.get("author_name") || null,
    allow_comments: formData.get("allow_comments") === "on",
    scheduled_at:
      status === "scheduled" && scheduledAt
        ? new Date(scheduledAt).toISOString()
        : null,
  };
}
function galleryIds(formData: FormData) {
  const content = String(formData.get("content") ?? "");
  const inlineIds = [
    ...content.matchAll(/\[(?:image|video):([0-9a-f-]{36}):/gi),
  ]
    .map((match) => match[1])
    .filter((value): value is string => Boolean(value));
  return [
    ...new Set([
      ...formData.getAll("gallery_media_ids").map(String),
      ...inlineIds,
    ]),
  ].filter((value) => z.uuid().safeParse(value).success);
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
  revalidateTag("blog");
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
    const repository = new BlogRepository(await createDatabaseClient());
    const article = await repository.create(parsed.data);
    await repository.syncGallery(article.id, galleryIds(formData));
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
    const autosave = formData.get("intent") === "autosave";
    if (autosave && previous?.status !== "draft")
      return {
        message: "Autosave is available for drafts only.",
        status: "error",
      };
    const article = await repository.update(id, parsed.data);
    await repository.syncGallery(id, galleryIds(formData));
    revalidateBlog(previous?.slug, article.slug);
    return {
      message: autosave ? "Draft autosaved." : "Article updated successfully.",
      status: "success",
    };
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
export async function duplicateBlogArticle(
  id: string,
): Promise<BlogActionState> {
  try {
    const user = await requireBlogPermission("write");
    const article = await new BlogRepository(
      await createDatabaseClient(),
    ).duplicate(z.uuid().parse(id), user.id);
    if (!article)
      return {
        message: "The requested article was not found.",
        status: "error",
      };
    revalidateBlog(article.slug);
    return { message: "Article duplicated as a draft.", status: "success" };
  } catch (error) {
    return actionFailure(error);
  }
}
