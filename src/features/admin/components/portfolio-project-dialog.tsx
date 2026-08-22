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
  createPortfolioProject,
  updatePortfolioProject,
} from "@/lib/actions/portfolio";
import { initialPortfolioActionState } from "@/lib/actions/action-states";
import type { CategoryRow, PortfolioProjectRow } from "@/types/database";
import styles from "./admin-portfolio.module.css";

interface Props {
  readonly categories: readonly Pick<CategoryRow, "id" | "name" | "slug">[];
  readonly mode: "create" | "edit";
  readonly project?: PortfolioProjectRow;
}

function contentText(project?: PortfolioProjectRow) {
  const content = project?.content;
  if (!content || typeof content !== "object" || !("body" in content))
    return "";
  return typeof content.body === "string" ? content.body : "";
}

export function PortfolioProjectDialog({ categories, mode, project }: Props) {
  const [open, setOpen] = useState(false);
  const action =
    mode === "create" ? createPortfolioProject : updatePortfolioProject;
  const [state, formAction, pending] = useActionState(
    action,
    initialPortfolioActionState,
  );
  useEffect(() => {
    if (state.status === "success") setOpen(false);
  }, [state.status]);
  const fieldError = (name: string) => state.fieldErrors?.[name]?.[0];

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
          {mode === "create" ? "Create project" : "Edit"}
        </Button>
      </DialogTrigger>
      <DialogContent className={styles.dialog}>
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Create portfolio project"
              : `Edit ${project?.title}`}
          </DialogTitle>
          <DialogDescription>
            Use concise, truthful project content. Required fields are marked.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className={styles.projectForm}>
          {project ? (
            <input name="id" type="hidden" value={project.id} />
          ) : null}
          <div className={styles.formGrid}>
            <Field
              error={fieldError("title")}
              label="Title"
              name="title"
              required
              defaultValue={project?.title}
            />
            <Field
              error={fieldError("slug")}
              label="Slug"
              name="slug"
              required
              defaultValue={project?.slug}
            />
            <Field
              error={fieldError("project_type")}
              label="Project type"
              name="project_type"
              required
              defaultValue={project?.project_type}
            />
            <label>
              <span>Category</span>
              <select
                defaultValue={project?.category_id ?? ""}
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
              <select defaultValue={project?.status ?? "draft"} name="status">
                <option value="draft">Draft</option>
                <option value="review">In review</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </label>
            <Field
              error={fieldError("technologies")}
              label="Technologies (comma separated)"
              name="technologies"
              defaultValue={project?.technologies.join(", ")}
            />
          </div>
          <TextField
            error={fieldError("summary")}
            label="Summary"
            name="summary"
            required
            defaultValue={project?.summary}
          />
          <TextField
            error={fieldError("content")}
            label="Content"
            name="content"
            defaultValue={contentText(project)}
          />
          <div className={styles.formGrid}>
            <Field
              error={fieldError("meta_title")}
              label="SEO title"
              name="meta_title"
              defaultValue={project?.meta_title ?? ""}
            />
            <Field
              error={fieldError("meta_description")}
              label="SEO description"
              name="meta_description"
              defaultValue={project?.meta_description ?? ""}
            />
          </div>
          <label className={styles.checkbox}>
            <input
              defaultChecked={project?.is_featured}
              name="is_featured"
              type="checkbox"
            />
            <span>Feature this project</span>
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
                  ? "Create project"
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
}: {
  readonly defaultValue?: string;
  readonly error?: string;
  readonly label: string;
  readonly name: string;
  readonly required?: boolean;
}) {
  const errorId = `${name}-error`;
  return (
    <label>
      <span>
        {label}
        {required ? " *" : ""}
      </span>
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        defaultValue={defaultValue}
        name={name}
        required={required}
      />
      {error ? <small id={errorId}>{error}</small> : null}
    </label>
  );
}
function TextField({
  defaultValue,
  error,
  label,
  name,
  required = false,
}: {
  readonly defaultValue?: string;
  readonly error?: string;
  readonly label: string;
  readonly name: string;
  readonly required?: boolean;
}) {
  const errorId = `${name}-error`;
  return (
    <label>
      <span>
        {label}
        {required ? " *" : ""}
      </span>
      <textarea
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        defaultValue={defaultValue}
        name={name}
        required={required}
        rows={4}
      />
      {error ? <small id={errorId}>{error}</small> : null}
    </label>
  );
}
