import Link from "next/link";
import { File, FileImage, Film, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import type { PaginatedResult } from "@/lib/database/repositories/base-repository";
import type {
  MediaKind,
  MediaSort,
} from "@/lib/database/repositories/media-repository";
import type { MediaLibraryRow } from "@/types/database";
import { MediaItemActions } from "./media-item-actions";
import { MediaUploadDialog } from "./media-upload-dialog";
import styles from "./admin-media.module.css";

export interface MediaFilters {
  readonly kind?: MediaKind;
  readonly pageSize: number;
  readonly query?: string;
  readonly sort: MediaSort;
}
interface Props {
  readonly canEdit: boolean;
  readonly filters: MediaFilters;
  readonly media: PaginatedResult<MediaLibraryRow>;
}
const kinds: readonly (readonly [MediaKind, string])[] = [
  ["image", "Images"],
  ["video", "Videos"],
  ["pdf", "PDFs"],
  ["document", "Documents"],
  ["svg", "SVGs"],
];
const sorts: readonly (readonly [MediaSort, string])[] = [
  ["newest", "Newest"],
  ["oldest", "Oldest"],
  ["alphabetical", "Alphabetical"],
  ["largest", "Largest"],
];
function pageHref(filters: MediaFilters, page: number) {
  const p = new URLSearchParams();
  if (filters.query) p.set("q", filters.query);
  if (filters.kind) p.set("kind", filters.kind);
  p.set("sort", filters.sort);
  p.set("pageSize", String(filters.pageSize));
  p.set("page", String(page));
  return `/admin/media?${p.toString()}`;
}
function fileKind(item: MediaLibraryRow) {
  if (item.format === "svg") return "SVG";
  if (item.format === "pdf") return "PDF";
  if (item.resource_type === "video") return "Video";
  if (item.resource_type === "image") return "Image";
  return "Document";
}
function bytes(value: number) {
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}
export function AdminMedia({ canEdit, filters, media }: Props) {
  const filtered = Boolean(filters.query || filters.kind);
  const formatter = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeZone: "UTC",
  });
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Cloud asset operations</span>
          <h1>Media Library</h1>
          <p>
            Upload, organize, inspect, and maintain production media through
            Cloudinary-backed delivery and Supabase metadata.
          </p>
        </div>
        {canEdit ? <MediaUploadDialog /> : null}
      </header>
      <section aria-label="Media summary" className={styles.summary}>
        <article>
          <span>Matching assets</span>
          <strong>{media.count}</strong>
        </article>
        <article>
          <span>Current page</span>
          <strong>
            {media.totalPages ? `${media.page} / ${media.totalPages}` : "—"}
          </strong>
        </article>
        <article>
          <span>Access</span>
          <strong>{canEdit ? "Media editor" : "Read only"}</strong>
        </article>
      </section>
      <section aria-labelledby="media-library-heading" className={styles.panel}>
        <div className={styles.panelHeading}>
          <div>
            <span className={styles.eyebrow}>Asset index</span>
            <h2 id="media-library-heading">Find and manage assets</h2>
          </div>
          {!canEdit ? <p>Your viewer role has read-only access.</p> : null}
        </div>
        <form className={styles.libraryControls} method="get" role="search">
          <label className={styles.search}>
            <span>Search media</span>
            <div>
              <Search aria-hidden="true" />
              <input
                defaultValue={filters.query}
                name="q"
                placeholder="Filename, public ID, or alt text"
                type="search"
              />
            </div>
          </label>
          <Filter
            label="File type"
            name="kind"
            options={kinds}
            value={filters.kind}
          />
          <Filter
            label="Sort"
            name="sort"
            options={sorts}
            value={filters.sort}
          />
          <label>
            <span>Per page</span>
            <select defaultValue={String(filters.pageSize)} name="pageSize">
              {[25, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
          <div className={styles.filterActions}>
            <Button type="submit">Apply</Button>
            <Button asChild variant="ghost">
              <Link href="/admin/media">Reset</Link>
            </Button>
          </div>
        </form>
        {media.data.length ? (
          <ul className={styles.mediaGrid}>
            {media.data.map((item) => {
              const Icon =
                item.resource_type === "video"
                  ? Film
                  : item.resource_type === "image"
                    ? FileImage
                    : File;
              return (
                <li className={styles.mediaCard} key={item.id}>
                  <div className={styles.mediaPreview}>
                    <Icon aria-hidden="true" />
                    <span>{fileKind(item)}</span>
                    <Badge variant="outline">
                      {item.format.toUpperCase() || "FILE"}
                    </Badge>
                  </div>
                  <div className={styles.mediaBody}>
                    <h3>{item.file_name}</h3>
                    <dl>
                      <div>
                        <dt>Size</dt>
                        <dd>{bytes(item.bytes)}</dd>
                      </div>
                      <div>
                        <dt>Dimensions</dt>
                        <dd>
                          {item.width && item.height
                            ? `${item.width} × ${item.height}`
                            : "—"}
                        </dd>
                      </div>
                      <div>
                        <dt>Folder</dt>
                        <dd>{item.folder}</dd>
                      </div>
                      <div>
                        <dt>Created</dt>
                        <dd>
                          <time dateTime={item.created_at}>
                            {formatter.format(new Date(item.created_at))}
                          </time>
                        </dd>
                      </div>
                      <div>
                        <dt>Public ID</dt>
                        <dd>{item.public_id}</dd>
                      </div>
                    </dl>
                  </div>
                  <MediaItemActions canEdit={canEdit} item={item} />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className={styles.empty}>
            <FileImage aria-hidden="true" />
            <h3>No media yet</h3>
            <p>
              {filtered
                ? "No assets match these filters. Reset them to view the full library."
                : "Upload your first approved asset to begin the media library."}
            </p>
            {canEdit && !filtered ? (
              <MediaUploadDialog />
            ) : (
              <Button asChild variant="outline">
                <Link href="/admin/media">Reset filters</Link>
              </Button>
            )}
          </div>
        )}
        {media.totalPages > 1 ? (
          <nav aria-label="Media pagination" className={styles.pagination}>
            <Button
              asChild={media.page > 1}
              disabled={media.page <= 1}
              variant="outline"
            >
              {media.page > 1 ? (
                <Link href={pageHref(filters, media.page - 1)}>Previous</Link>
              ) : (
                <span>Previous</span>
              )}
            </Button>
            <span>
              Page {media.page} of {media.totalPages}
            </span>
            <Button
              asChild={media.page < media.totalPages}
              disabled={media.page >= media.totalPages}
              variant="outline"
            >
              {media.page < media.totalPages ? (
                <Link href={pageHref(filters, media.page + 1)}>Next</Link>
              ) : (
                <span>Next</span>
              )}
            </Button>
          </nav>
        ) : null}
      </section>
    </main>
  );
}
function Filter({
  label,
  name,
  options,
  value,
}: {
  readonly label: string;
  readonly name: string;
  readonly options: readonly (readonly [string, string])[];
  readonly value?: string;
}) {
  return (
    <label>
      <span>{label}</span>
      <select defaultValue={value ?? ""} name={name}>
        <option value="">All</option>
        {options.map(([key, text]) => (
          <option key={key} value={key}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}
