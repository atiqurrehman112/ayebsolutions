"use client";
import { useOptimistic, useState, useTransition } from "react";
import { Archive, RotateCcw, Star, Trash2, XCircle } from "lucide-react";
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
  approveTestimonial,
  archiveTestimonial,
  deleteTestimonial,
  publishTestimonial,
  rejectTestimonial,
  restoreTestimonial,
  toggleFeaturedTestimonial,
  unpublishTestimonial,
  type TestimonialActionState,
} from "@/lib/actions/testimonials";
import type {
  ContentStatus,
  TestimonialApprovalStatus,
  TestimonialRow,
} from "@/types/database";
import { TestimonialDialog } from "./testimonial-dialog";
import styles from "./admin-testimonials.module.css";
interface Props {
  readonly canDelete: boolean;
  readonly canEdit: boolean;
  readonly testimonial: TestimonialRow;
}
export function TestimonialRowActions({
  canDelete,
  canEdit,
  testimonial,
}: Props) {
  const [state, setState] = useOptimistic({
    approval: testimonial.approval_status,
    featured: testimonial.is_featured,
    status: testimonial.status,
  });
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  if (!canEdit) return <span className={styles.muted}>Read only</span>;
  const run = (
    next: {
      approval?: TestimonialApprovalStatus;
      featured?: boolean;
      status?: ContentStatus;
    },
    action: () => Promise<TestimonialActionState>,
  ) =>
    startTransition(async () => {
      setState({ ...state, ...next });
      const result = await action();
      setMessage(result.message);
    });
  return (
    <div className={styles.rowActions}>
      <TestimonialDialog mode="edit" testimonial={testimonial} />
      {state.approval !== "approved" ? (
        <Button
          disabled={pending}
          onClick={() =>
            run({ approval: "approved" }, () =>
              approveTestimonial(testimonial.id),
            )
          }
          size="sm"
          variant="outline"
        >
          Approve
        </Button>
      ) : null}
      {state.approval !== "rejected" ? (
        <Button
          aria-label={`Reject ${testimonial.reviewer_name}`}
          disabled={pending}
          onClick={() =>
            run({ approval: "rejected", status: "draft" }, () =>
              rejectTestimonial(testimonial.id),
            )
          }
          size="icon"
          variant="ghost"
        >
          <XCircle aria-hidden="true" />
        </Button>
      ) : null}
      {state.status !== "published" && state.status !== "archived" ? (
        <Button
          disabled={
            pending ||
            state.approval !== "approved" ||
            !testimonial.consent_verified
          }
          onClick={() =>
            run({ status: "published" }, () =>
              publishTestimonial(testimonial.id),
            )
          }
          size="sm"
        >
          Publish
        </Button>
      ) : null}
      {state.status === "published" ? (
        <Button
          disabled={pending}
          onClick={() =>
            run({ status: "draft" }, () => unpublishTestimonial(testimonial.id))
          }
          size="sm"
          variant="outline"
        >
          Unpublish
        </Button>
      ) : null}
      {state.status === "archived" ? (
        <Button
          disabled={pending}
          onClick={() =>
            run({ status: "draft" }, () => restoreTestimonial(testimonial.id))
          }
          size="sm"
          variant="outline"
        >
          <RotateCcw aria-hidden="true" />
          Restore
        </Button>
      ) : (
        <Button
          aria-label={`Archive ${testimonial.reviewer_name}`}
          disabled={pending}
          onClick={() =>
            run({ status: "archived" }, () =>
              archiveTestimonial(testimonial.id),
            )
          }
          size="icon"
          variant="ghost"
        >
          <Archive aria-hidden="true" />
        </Button>
      )}
      <Button
        aria-label={`${state.featured ? "Remove" : "Add"} ${testimonial.reviewer_name} ${state.featured ? "from" : "to"} featured placement`}
        disabled={pending}
        onClick={() =>
          run({ featured: !state.featured }, () =>
            toggleFeaturedTestimonial(testimonial.id),
          )
        }
        size="icon"
        variant={state.featured ? "secondary" : "ghost"}
      >
        <Star aria-hidden="true" />
      </Button>
      {canDelete ? (
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogTrigger asChild>
            <Button
              aria-label={`Delete ${testimonial.reviewer_name}`}
              disabled={pending}
              size="icon"
              variant="ghost"
            >
              <Trash2 aria-hidden="true" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Testimonial</DialogTitle>
              <DialogDescription>
                This action cannot be undone. The testimonial attributed to “
                {testimonial.reviewer_name}” will be permanently removed.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setDeleteOpen(false)} variant="outline">
                Cancel
              </Button>
              <Button
                disabled={pending}
                onClick={() =>
                  startTransition(async () => {
                    const result = await deleteTestimonial(testimonial.id);
                    setMessage(result.message);
                    if (result.status === "success") setDeleteOpen(false);
                  })
                }
                variant="destructive"
              >
                {pending ? "Deleting…" : "Delete Testimonial"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : null}
      <span aria-live="polite" className="sr-only">
        {message}
      </span>
    </div>
  );
}
