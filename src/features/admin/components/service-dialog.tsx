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
  createService,
  initialServiceActionState,
  updateService,
} from "@/lib/actions/services";
import type { CategoryRow, ServiceRow } from "@/types/database";
import styles from "./admin-services.module.css";
interface Props {
  readonly categories: readonly Pick<CategoryRow, "id" | "name" | "slug">[];
  readonly mode: "create" | "edit";
  readonly service?: ServiceRow;
}
export function ServiceDialog({ categories, mode, service }: Props) {
  const [open, setOpen] = useState(false);
  const action = mode === "create" ? createService : updateService;
  const [state, formAction, pending] = useActionState(
    action,
    initialServiceActionState,
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
          {mode === "create" ? "Create service" : "Edit"}
        </Button>
      </DialogTrigger>
      <DialogContent className={styles.dialog}>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create service" : `Edit ${service?.title}`}
          </DialogTitle>
          <DialogDescription>
            Define clear, accurate service content. Required fields are marked.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className={styles.serviceForm}>
          {service ? (
            <input name="id" type="hidden" value={service.id} />
          ) : null}
          <input
            name="features"
            type="hidden"
            value={service?.features.join(", ") ?? ""}
          />
          <input
            name="technologies"
            type="hidden"
            value={service?.technologies.join(", ") ?? ""}
          />
          <div className={styles.formGrid}>
            <Field
              defaultValue={service?.title}
              error={error("title")}
              label="Title"
              name="title"
              required
            />
            <Field
              defaultValue={service?.slug}
              error={error("slug")}
              label="Slug"
              name="slug"
              required
            />
            <Field
              defaultValue={service?.icon ?? ""}
              error={error("icon")}
              label="Icon name"
              name="icon"
            />
            <label>
              <span>Category</span>
              <select
                defaultValue={service?.category_id ?? ""}
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
              <select defaultValue={service?.status ?? "draft"} name="status">
                <option value="draft">Draft</option>
                <option value="review">In review</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </label>
            <Field
              defaultValue={String(service?.sort_order ?? 0)}
              error={error("sort_order")}
              label="Display order"
              name="sort_order"
              type="number"
            />
            <Field
              defaultValue={service?.keywords.join(", ")}
              error={error("keywords")}
              label="Keywords (comma separated)"
              name="keywords"
            />
          </div>
          <TextField
            defaultValue={service?.summary}
            error={error("summary")}
            label="Short description"
            name="summary"
            required
            rows={3}
          />
          <TextField
            defaultValue={service?.description}
            error={error("description")}
            label="Full description"
            name="description"
            required
            rows={7}
          />
          <div className={styles.formGrid}>
            <Field
              defaultValue={service?.meta_title ?? ""}
              error={error("meta_title")}
              label="SEO title"
              name="meta_title"
            />
            <Field
              defaultValue={service?.meta_description ?? ""}
              error={error("meta_description")}
              label="SEO description"
              name="meta_description"
            />
          </div>
          <label className={styles.checkbox}>
            <input
              defaultChecked={service?.is_featured}
              name="is_featured"
              type="checkbox"
            />
            <span>Feature this service</span>
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
                  ? "Create service"
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
        min={type === "number" ? 0 : undefined}
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
