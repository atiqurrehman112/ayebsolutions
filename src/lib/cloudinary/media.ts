import {
  v2 as cloudinary,
  type UploadApiOptions,
  type UploadApiResponse,
} from "cloudinary";
import { env } from "@/lib/env";

export const MAX_MEDIA_BYTES = 25 * 1024 * 1024;
export const ALLOWED_MEDIA_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "video/mp4",
  "video/webm",
  "application/pdf",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

function configureCloudinary() {
  if (
    !env.CLOUDINARY_CLOUD_NAME ||
    !env.CLOUDINARY_API_KEY ||
    !env.CLOUDINARY_API_SECRET
  )
    throw new Error("Cloudinary is not configured.");
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export async function uploadMedia(
  file: File,
  options: UploadApiOptions,
): Promise<UploadApiResponse> {
  configureCloudinary();
  const bytes = Buffer.from(await file.arrayBuffer());
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { ...options, resource_type: "auto" },
      (error, result) =>
        error || !result
          ? reject(error ?? new Error("Cloudinary returned no upload result."))
          : resolve(result),
    );
    stream.end(bytes);
  });
}
export async function destroyMedia(
  publicId: string,
  resourceType: "image" | "video" | "raw",
) {
  configureCloudinary();
  return cloudinary.uploader.destroy(publicId, {
    invalidate: true,
    resource_type: resourceType,
  });
}
export async function renameCloudinaryMedia(
  from: string,
  to: string,
  resourceType: "image" | "video" | "raw",
) {
  configureCloudinary();
  return cloudinary.uploader.rename(from, to, {
    invalidate: true,
    resource_type: resourceType,
  });
}
