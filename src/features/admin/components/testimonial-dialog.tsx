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
  createTestimonial,
  initialTestimonialActionState,
  updateTestimonial,
} from "@/lib/actions/testimonials";
import type { TestimonialRow } from "@/types/database";
import styles from "./admin-testimonials.module.css";
interface Props {
  readonly mode: "create" | "edit";
  readonly testimonial?: TestimonialRow;
}
export function TestimonialDialog({ mode, testimonial }: Props) {
  const [open, setOpen] = useState(false);
  const action = mode === "create" ? createTestimonial : updateTestimonial;
  const [state, formAction, pending] = useActionState(
    action,
    initialTestimonialActionState,
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
          {mode === "create" ? "Create testimonial" : "Edit"}
        </Button>
      </DialogTrigger>
      <DialogContent className={styles.dialog}>
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Create testimonial"
              : `Edit ${testimonial?.reviewer_name}`}
          </DialogTitle>
          <DialogDescription>
            Record only feedback with accurate attribution and documented
            consent. Required fields are marked.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className={styles.testimonialForm}>
          {testimonial ? (
            <input name="id" type="hidden" value={testimonial.id} />
          ) : null}
          <div className={styles.formGrid}>
            <Field
              defaultValue={testimonial?.reviewer_name}
              error={error("reviewer_name")}
              label="Name"
              name="reviewer_name"
              required
            />
            <Field
              defaultValue={testimonial?.company_name ?? ""}
              error={error("company_name")}
              label="Company"
              name="company_name"
            />
            <Field
              defaultValue={testimonial?.reviewer_role ?? ""}
              error={error("reviewer_role")}
              label="Position"
              name="reviewer_role"
            />
            <Field
              defaultValue={testimonial?.rating?.toString() ?? ""}
              error={error("rating")}
              label="Rating"
              max={5}
              min={1}
              name="rating"
              type="number"
            />
            <label>
              <span>Approval status</span>
              <select
                aria-describedby={
                  error("approval_status") ? "approval-status-error" : undefined
                }
                aria-invalid={Boolean(error("approval_status"))}
                defaultValue={testimonial?.approval_status ?? "pending"}
                name="approval_status"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              {error("approval_status") ? (
                <small id="approval-status-error">
                  {error("approval_status")}
                </small>
              ) : null}
            </label>
            <label>
              <span>Publish status</span>
              <select
                defaultValue={testimonial?.status ?? "draft"}
                name="status"
              >
                <option value="draft">Draft</option>
                <option value="review">In review</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </label>
            <Field
              defaultValue={String(testimonial?.display_order ?? 0)}
              error={error("display_order")}
              label="Display order"
              min={0}
              name="display_order"
              type="number"
            />
          </div>
          <TextField
            defaultValue={testimonial?.quote}
            error={error("quote")}
            label="Quote"
            name="quote"
            required
          />
          <div className={styles.formGrid}>
            <Field
              defaultValue={testimonial?.meta_title ?? ""}
              error={error("meta_title")}
              label="SEO title"
              name="meta_title"
            />
            <Field
              defaultValue={testimonial?.meta_description ?? ""}
              error={error("meta_description")}
              label="SEO description"
              name="meta_description"
            />
          </div>
          <div className={styles.checks}>
            <label>
              <input
                aria-describedby={
                  error("consent_verified") ? "consent-error" : undefined
                }
                aria-invalid={Boolean(error("consent_verified"))}
                defaultChecked={testimonial?.consent_verified}
                name="consent_verified"
                type="checkbox"
              />
              <span>Consent has been verified</span>
              {error("consent_verified") ? (
                <small id="consent-error">{error("consent_verified")}</small>
              ) : null}
            </label>
            <label>
              <input
                defaultChecked={testimonial?.is_featured}
                name="is_featured"
                type="checkbox"
              />
              <span>Feature this testimonial</span>
            </label>
          </div>
          <p className={styles.guidance}>
            Publishing requires both approval and verified consent.
          </p>
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
                  ? "Create testimonial"
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
  max,
  min,
  name,
  required = false,
  type = "text",
}: {
  readonly defaultValue?: string;
  readonly error?: string;
  readonly label: string;
  readonly max?: number;
  readonly min?: number;
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
        max={max}
        min={min}
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
}: {
  readonly defaultValue?: string;
  readonly error?: string;
  readonly label: string;
  readonly name: string;
  readonly required?: boolean;
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
        rows={6}
      />
      {error ? <small id={id}>{error}</small> : null}
    </label>
  );
}
