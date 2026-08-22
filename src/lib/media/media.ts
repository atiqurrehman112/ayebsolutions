import type { MediaLibraryRow } from "@/types/database";

export interface MediaTransform {
  readonly height?: number;
  readonly quality?: "auto" | "eco" | "good";
  readonly width?: number;
}

export function isImageMedia(media: MediaLibraryRow) {
  return media.resource_type === "image";
}

export function isVideoMedia(media: MediaLibraryRow) {
  return media.resource_type === "video";
}

export function cloudinaryMediaUrl(
  media: MediaLibraryRow,
  transform: MediaTransform = {},
) {
  if (!isImageMedia(media) || !media.secure_url.includes("/upload/"))
    return media.secure_url;
  const operations = [
    media.format === "svg" ? null : "f_auto",
    `q_auto:${transform.quality ?? "good"}`,
    transform.width ? `w_${Math.round(transform.width)}` : null,
    transform.height ? `h_${Math.round(transform.height)}` : null,
    transform.width || transform.height ? "c_limit" : null,
  ].filter((item): item is string => Boolean(item));
  return media.secure_url.replace(
    "/upload/",
    `/upload/${operations.join(",")}/`,
  );
}

export function mediaBlurUrl(media: MediaLibraryRow) {
  if (
    !isImageMedia(media) ||
    media.format === "svg" ||
    !media.secure_url.includes("/upload/")
  )
    return undefined;
  return media.secure_url.replace(
    "/upload/",
    "/upload/f_auto,q_10,w_48,e_blur:1000,c_limit/",
  );
}

export function mediaSeoUrl(media: MediaLibraryRow | null | undefined) {
  return media && isImageMedia(media)
    ? cloudinaryMediaUrl(media, { width: 1200, height: 630, quality: "good" })
    : undefined;
}
