"use client";

import { useActionState, useEffect, useState } from "react";
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
import {
  createBlogArticle,
  initialBlogActionState,
  updateBlogArticle,
} from "@/lib/actions/blog";
import type { BlogArticleRow, CategoryRow } from "@/types/database";
import styles from "./admin-blog.module.css";

interface Props {
  readonly article?: BlogArticleRow;
  readonly categories: readonly Pick<CategoryRow, "id" | "name" | "slug">[];
  readonly mode: "create" | "edit";
}
function contentText(article?: BlogArticleRow) {
  const value = article?.content;
  if (!value || typeof value !== "object" || !("body" in value)) return "";
  return typeof value.body === "string" ? value.body : "";
}

export function BlogArticleDialog({ article, categories, mode }: Props) {
  const [open, setOpen] = useState(false);
  const action = mode === "create" ? createBlogArticle : updateBlogArticle;
  const [state, formAction, pending] = useActionState(
    action,
    initialBlogActionState,
  );
  useEffect(() => {
    if (state.status === "success") setOpen(false);
  }, [state.status]);
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
            Write clear editorial content. Rich-text and media tools are
            intentionally outside this sprint.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className={styles.articleForm}>
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
              required
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
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </label>
            <Field
              defaultValue={article?.reading_time_minutes?.toString()}
              error={error("reading_time_minutes")}
              label="Reading time (minutes)"
              name="reading_time_minutes"
              type="number"
            />
            <Field
              defaultValue={article?.keywords.join(", ")}
              error={error("keywords")}
              label="Tags (comma separated)"
              name="tags"
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
          <TextField
            defaultValue={contentText(article)}
            error={error("content")}
            label="Content"
            name="content"
            required
            rows={8}
          />
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
  required = false,
  type = "text",
}: {
  readonly defaultValue?: string;
  readonly error?: string;
  readonly label: string;
  readonly name: string;
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
        required={required}
        type={type}
      />
      {error ? <small id={id}>{error}</small> : null}
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
