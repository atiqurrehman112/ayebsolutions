"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/overlays";
import { createBlogArticle, updateBlogArticle } from "@/lib/actions/blog";
import { initialBlogActionState } from "@/lib/actions/action-states";
import type {
  AppRole,
  BlogArticleRow,
  CategoryRow,
  MediaLibraryRow,
} from "@/types/database";
import styles from "./admin-blog.module.css";
import { BlogRichEditor } from "./blog-rich-editor";

interface Props {
  readonly article?: BlogArticleRow;
  readonly categories: readonly Pick<CategoryRow, "id" | "name" | "slug">[];
  readonly mode: "create" | "edit";
  readonly authors: readonly {
    readonly id: string;
    readonly display_name: string | null;
    readonly role: AppRole;
  }[];
  readonly media: readonly MediaLibraryRow[];
  readonly galleryIds?: readonly string[];
}
function contentText(article?: BlogArticleRow) {
  const value = article?.content;
  if (!value || typeof value !== "object" || !("body" in value)) return "";
  return typeof value.body === "string" ? value.body : "";
}

export function BlogArticleDialog({
  article,
  authors,
  categories,
  galleryIds = [],
  media,
  mode,
}: Props) {
  const [open, setOpen] = useState(false);
  const action = mode === "create" ? createBlogArticle : updateBlogArticle;
  const [state, formAction, pending] = useActionState(
    action,
    initialBlogActionState,
  );
  const [dirty, setDirty] = useState(false);
  const autosave = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (state.status === "success" && state.message !== "Draft autosaved.") {
      setOpen(false);
      setDirty(false);
    }
  }, [state.message, state.status]);
  useEffect(() => {
    if (!open || mode !== "edit" || article?.status !== "draft") return;
    const warn = (event: BeforeUnloadEvent) => {
      if (dirty) event.preventDefault();
    };
    const timer = window.setInterval(() => {
      if (dirty && !pending) autosave.current?.click();
    }, 30_000);
    window.addEventListener("beforeunload", warn);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("beforeunload", warn);
    };
  }, [article?.status, dirty, mode, open, pending]);
  const error = (name: string) => state.fieldErrors?.[name]?.[0];
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={mode === "create" ? "lg" : "sm"}
          variant={mode === "create" ? "default" : "outline"}
        >
          {mode === "create" ? (
            <Plus aria-hidden="true" />
          ) : (
            <Pencil aria-hidden="true" />
          )}
          {mode === "create" ? "Create article" : "Edit"}
        </Button>
      </DialogTrigger>
      <DialogContent className={styles.dialog}>
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Create blog article"
              : `Edit ${article?.title}`}
          </DialogTitle>
          <DialogDescription>
            Compose structured, accessible content with Media Library assets,
            automatic reading time, preview, autosave, and publication controls.
          </DialogDescription>
        </DialogHeader>
        <form
          action={formAction}
          className={styles.articleForm}
          onChange={() => setDirty(true)}
        >
          {article ? (
            <input name="id" type="hidden" value={article.id} />
          ) : null}
          <div className={styles.formGrid}>
            <Field
              defaultValue={article?.title}
              error={error("title")}
              label="Title"
              name="title"
              required
            />
            <Field
              defaultValue={article?.slug}
              error={error("slug")}
              label="Slug"
              name="slug"
            />
            <label>
              <span>Category</span>
              <select
                defaultValue={article?.category_id ?? ""}
                name="category_id"
              >
                <option value="">Uncategorized</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Status</span>
              <select defaultValue={article?.status ?? "draft"} name="status">
                <option value="draft">Draft</option>
                <option value="review">In review</option>
                <option value="scheduled">Scheduled</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </label>
            <Field
              defaultValue={article?.author_name ?? ""}
              error={error("author_name")}
              label="Author"
              list="blog-authors"
              name="author_name"
            />
            <datalist id="blog-authors">
              {authors.map((author) => (
                <option
                  key={author.id}
                  value={author.display_name ?? author.role}
                />
              ))}
            </datalist>
            <Field
              defaultValue={article?.keywords.join(", ")}
              error={error("keywords")}
              label="Tags (comma separated)"
              name="tags"
            />
          </div>
          <div className={styles.formGrid}>
            <MediaField
              label="Featured image"
              media={media.filter((item) => item.resource_type === "image")}
              name="featured_media_id"
              value={article?.featured_media_id}
            />
            <MediaField
              label="OpenGraph image"
              media={media.filter((item) => item.resource_type === "image")}
              name="open_graph_media_id"
              value={article?.open_graph_media_id}
            />
            <Field
              defaultValue={article?.canonical_url ?? ""}
              error={error("canonical_url")}
              label="Canonical URL"
              name="canonical_url"
              type="url"
            />
            <Field
              defaultValue={article?.scheduled_at?.slice(0, 16) ?? ""}
              error={error("scheduled_at")}
              label="Publish date"
              name="scheduled_at"
              type="datetime-local"
            />
          </div>
          <TextField
            defaultValue={article?.excerpt}
            error={error("excerpt")}
            label="Excerpt"
            name="excerpt"
            required
            rows={3}
          />
          <BlogRichEditor
            defaultValue={contentText(article)}
            error={error("content")}
            media={media}
          />
          <fieldset className={styles.galleryPicker}>
            <legend>Gallery</legend>
            {media
              .filter((item) => item.resource_type === "image")
              .map((item) => (
                <label key={item.id}>
                  <input
                    defaultChecked={galleryIds.includes(item.id)}
                    name="gallery_media_ids"
                    type="checkbox"
                    value={item.id}
                  />
                  <span>{item.file_name}</span>
                </label>
              ))}
          </fieldset>
          <div className={styles.formGrid}>
            <Field
              defaultValue={article?.meta_title ?? ""}
              error={error("meta_title")}
              label="SEO title"
              name="meta_title"
            />
            <Field
              defaultValue={article?.meta_description ?? ""}
              error={error("meta_description")}
              label="SEO description"
              name="meta_description"
            />
          </div>
          <label className={styles.checkbox}>
            <input
              defaultChecked={article?.is_featured}
              name="is_featured"
              type="checkbox"
            />
            <span>Feature this article</span>
          </label>
          <label className={styles.checkbox}>
            <input
              defaultChecked={article?.allow_comments}
              name="allow_comments"
              type="checkbox"
            />
            <span>Allow comments when comment infrastructure is available</span>
          </label>
          <div
            aria-live="polite"
            className={
              state.status === "error" ? styles.formError : styles.formMessage
            }
          >
            {state.message}
          </div>
          <DialogFooter>
            <Button disabled={pending} type="submit">
              {pending
                ? "Saving…"
                : mode === "create"
                  ? "Create article"
                  : "Save changes"}
            </Button>
            {mode === "edit" ? (
              <button
                className="sr-only"
                name="intent"
                ref={autosave}
                type="submit"
                value="autosave"
              >
                Autosave draft
              </button>
            ) : null}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
function Field({
  defaultValue,
  error,
  label,
  name,
  list,
  required = false,
  type = "text",
}: {
  readonly defaultValue?: string;
  readonly error?: string;
  readonly label: string;
  readonly name: string;
  readonly list?: string;
  readonly required?: boolean;
  readonly type?: string;
}) {
  const id = `${name}-error`;
  return (
    <label>
      <span>
        {label}
        {required ? " *" : ""}
      </span>
      <input
        aria-describedby={error ? id : undefined}
        aria-invalid={Boolean(error)}
        defaultValue={defaultValue}
        min={type === "number" ? 1 : undefined}
        name={name}
        list={list}
        required={required}
        type={type}
      />
      {error ? <small id={id}>{error}</small> : null}
    </label>
  );
}
function MediaField({
  label,
  media,
  name,
  value,
}: {
  readonly label: string;
  readonly media: readonly MediaLibraryRow[];
  readonly name: string;
  readonly value?: string | null;
}) {
  return (
    <label>
      <span>{label}</span>
      <select defaultValue={value ?? ""} name={name}>
        <option value="">No media selected</option>
        {media.map((item) => (
          <option key={item.id} value={item.id}>
            {item.file_name}
          </option>
        ))}
      </select>
      <small>Published Media Library assets only.</small>
    </label>
  );
}
function TextField({
  defaultValue,
  error,
  label,
  name,
  required = false,
  rows,
}: {
  readonly defaultValue?: string;
  readonly error?: string;
  readonly label: string;
  readonly name: string;
  readonly required?: boolean;
  readonly rows: number;
}) {
  const id = `${name}-error`;
  return (
    <label>
      <span>
        {label}
        {required ? " *" : ""}
      </span>
      <textarea
        aria-describedby={error ? id : undefined}
        aria-invalid={Boolean(error)}
        defaultValue={defaultValue}
        name={name}
        required={required}
        rows={rows}
      />
      {error ? <small id={id}>{error}</small> : null}
    </label>
  );
}
