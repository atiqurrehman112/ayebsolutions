"use server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/auth";
import { getPermissions } from "@/lib/auth/permissions";
import {
  ALLOWED_MEDIA_TYPES,
  destroyMedia,
  MAX_MEDIA_BYTES,
  renameCloudinaryMedia,
  uploadMedia,
} from "@/lib/cloudinary/media";
import { createDatabaseClient } from "@/lib/database";
import { MediaRepository } from "@/lib/database/repositories/media-repository";
import {
  mediaIdSchema,
  mediaMetadataSchema,
  mediaRenameSchema,
} from "@/lib/validation/media";

export interface MediaActionState {
  readonly fieldErrors?: Readonly<Record<string, readonly string[]>>;
  readonly message: string;
  readonly status: "idle" | "error" | "success";
}
export const initialMediaActionState: MediaActionState = {
  message: "",
  status: "idle",
};
class MediaPermissionError extends Error {}
async function requireWrite() {
  const user = await requireAdmin();
  if (!getPermissions(user.role).canManageContent)
    throw new MediaPermissionError(
      "Your viewer role has read-only media access.",
    );
  return user;
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
function failure(error: unknown): MediaActionState {
  return {
    message:
      error instanceof MediaPermissionError
        ? error.message
        : error instanceof Error
          ? error.message
          : "The media operation could not be completed.",
    status: "error",
  };
}
function revalidateMedia() {
  revalidatePath("/admin/media");
  revalidatePath("/", "layout");
}
function fileFrom(formData: FormData) {
  const value = formData.get("file");
  return value instanceof File ? value : null;
}
function validateFile(file: File | null): MediaActionState | null {
  if (!file || file.size === 0)
    return { message: "Choose a file to upload.", status: "error" };
  if (file.size > MAX_MEDIA_BYTES)
    return { message: "Files must be 25 MB or smaller.", status: "error" };
  if (
    !ALLOWED_MEDIA_TYPES.includes(
      file.type as (typeof ALLOWED_MEDIA_TYPES)[number],
    )
  )
    return { message: "This file type is not supported.", status: "error" };
  return null;
}
function responseRecord(
  result: Awaited<ReturnType<typeof uploadMedia>>,
  file: File,
  metadata: {
    alt?: string | null;
    file_name: string;
    folder: string;
    tags: readonly string[];
  },
) {
  return {
    alt: metadata.alt ?? null,
    bytes: result.bytes,
    duration: result.duration ?? null,
    file_name: metadata.file_name,
    folder: result.folder ?? metadata.folder,
    format: result.format ?? file.name.split(".").pop()?.toLowerCase() ?? "",
    height: result.height ?? null,
    metadata: {},
    mime_type: file.type,
    public_id: result.public_id,
    resource_type: result.resource_type as "image" | "video" | "raw",
    secure_url: result.secure_url,
    status: "published" as const,
    tags: [...metadata.tags],
    usage_locations: [],
    visibility: "public" as const,
    width: result.width ?? null,
  };
}
export async function uploadMediaAction(
  _state: MediaActionState,
  formData: FormData,
): Promise<MediaActionState> {
  const file = fileFrom(formData);
  const fileError = validateFile(file);
  if (fileError || !file)
    return fileError ?? { message: "Choose a file.", status: "error" };
  const parsed = mediaMetadataSchema.safeParse({
    alt: formData.get("alt") || null,
    file_name: formData.get("file_name") || file.name,
    folder: formData.get("folder") || "ayeb-solutions",
    tags: list(formData.get("tags")),
  });
  if (!parsed.success)
    return { message: "Review the media metadata.", status: "error" };
  let uploaded: Awaited<ReturnType<typeof uploadMedia>> | null = null;
  try {
    await requireWrite();
    uploaded = await uploadMedia(file, {
      folder: parsed.data.folder,
      tags: parsed.data.tags,
    });
    await new MediaRepository(await createDatabaseClient()).create(
      responseRecord(uploaded, file, parsed.data),
    );
    revalidateMedia();
    return { message: "Media uploaded successfully.", status: "success" };
  } catch (error) {
    if (uploaded)
      await destroyMedia(
        uploaded.public_id,
        uploaded.resource_type as "image" | "video" | "raw",
      ).catch(() => undefined);
    return failure(error);
  }
}
export async function replaceMediaAction(
  _state: MediaActionState,
  formData: FormData,
): Promise<MediaActionState> {
  const id = String(formData.get("id") ?? "");
  const file = fileFrom(formData);
  const fileError = validateFile(file);
  if (!mediaIdSchema.safeParse(id).success)
    return { message: "A valid media ID is required.", status: "error" };
  if (fileError || !file)
    return fileError ?? { message: "Choose a file.", status: "error" };
  let uploaded: Awaited<ReturnType<typeof uploadMedia>> | null = null;
  let persisted = false;
  try {
    await requireWrite();
    const repository = new MediaRepository(await createDatabaseClient());
    const current = await repository.findById(id);
    if (!current)
      return { message: "The media record was not found.", status: "error" };
    uploaded = await uploadMedia(file, {
      folder: current.folder,
      tags: [...current.tags],
    });
    await repository.update(
      id,
      responseRecord(uploaded, file, {
        alt: current.alt,
        file_name: file.name,
        folder: current.folder,
        tags: current.tags,
      }),
    );
    persisted = true;
    await destroyMedia(current.public_id, current.resource_type).catch(
      () => undefined,
    );
    revalidateMedia();
    return { message: "Media replaced successfully.", status: "success" };
  } catch (error) {
    if (uploaded && !persisted)
      await destroyMedia(
        uploaded.public_id,
        uploaded.resource_type as "image" | "video" | "raw",
      ).catch(() => undefined);
    return failure(error);
  }
}
export async function renameMediaAction(
  _state: MediaActionState,
  formData: FormData,
): Promise<MediaActionState> {
  const parsed = mediaRenameSchema.safeParse({
    id: formData.get("id"),
    file_name: formData.get("file_name"),
    public_id: formData.get("public_id"),
  });
  if (!parsed.success)
    return { message: "Review the filename and public ID.", status: "error" };
  try {
    await requireWrite();
    const repository = new MediaRepository(await createDatabaseClient());
    const current = await repository.findById(parsed.data.id);
    if (!current)
      return { message: "The media record was not found.", status: "error" };
    const renamed = await renameCloudinaryMedia(
      current.public_id,
      parsed.data.public_id,
      current.resource_type,
    );
    try {
      await repository.update(current.id, {
        file_name: parsed.data.file_name,
        public_id: parsed.data.public_id,
        secure_url: renamed.secure_url,
      });
    } catch (error) {
      await renameCloudinaryMedia(
        parsed.data.public_id,
        current.public_id,
        current.resource_type,
      ).catch(() => undefined);
      throw error;
    }
    revalidateMedia();
    return { message: "Media renamed successfully.", status: "success" };
  } catch (error) {
    return failure(error);
  }
}
export async function deleteMediaAction(id: string): Promise<MediaActionState> {
  if (!mediaIdSchema.safeParse(id).success)
    return { message: "A valid media ID is required.", status: "error" };
  try {
    await requireWrite();
    const repository = new MediaRepository(await createDatabaseClient());
    const current = await repository.findById(id);
    if (!current)
      return { message: "The media record was not found.", status: "error" };
    await destroyMedia(current.public_id, current.resource_type);
    await repository.delete(id);
    revalidateMedia();
    return { message: "Media deleted successfully.", status: "success" };
  } catch (error) {
    return failure(error);
  }
}
