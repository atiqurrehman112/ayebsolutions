"use client";
import { useOptimistic, useState, useTransition } from "react";
import { Archive, RotateCcw, Trash2 } from "lucide-react";
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
  archiveService,
  deleteService,
  moveServiceToReview,
  publishService,
  restoreService,
  unpublishService,
  type ServiceActionState,
} from "@/lib/actions/services";
import type { CategoryRow, ContentStatus, ServiceRow } from "@/types/database";
import { ServiceDialog } from "./service-dialog";
import styles from "./admin-services.module.css";
interface Props {
  readonly canDelete: boolean;
  readonly canEdit: boolean;
  readonly categories: readonly Pick<CategoryRow, "id" | "name" | "slug">[];
  readonly service: ServiceRow;
}
export function ServiceRowActions({
  canDelete,
  canEdit,
  categories,
  service,
}: Props) {
  const [status, setStatus] = useOptimistic(service.status);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  if (!canEdit) return <span className={styles.muted}>Read only</span>;
  const run = (
    next: ContentStatus,
    action: () => Promise<ServiceActionState>,
  ) =>
    startTransition(async () => {
      setStatus(next);
      const result = await action();
      setMessage(result.message);
    });
  return (
    <div className={styles.rowActions}>
      <ServiceDialog categories={categories} mode="edit" service={service} />
      {status === "draft" ? (
        <Button
          disabled={pending}
          onClick={() => run("review", () => moveServiceToReview(service.id))}
          size="sm"
          variant="outline"
        >
          Review
        </Button>
      ) : null}
      {status === "review" ? (
        <Button
          disabled={pending}
          onClick={() => run("published", () => publishService(service.id))}
          size="sm"
        >
          Publish
        </Button>
      ) : null}
      {status === "published" ? (
        <Button
          disabled={pending}
          onClick={() => run("draft", () => unpublishService(service.id))}
          size="sm"
          variant="outline"
        >
          Unpublish
        </Button>
      ) : null}
      {status === "archived" ? (
        <Button
          disabled={pending}
          onClick={() => run("draft", () => restoreService(service.id))}
          size="sm"
          variant="outline"
        >
          <RotateCcw aria-hidden="true" />
          Restore
        </Button>
      ) : (
        <Button
          aria-label={`Archive ${service.title}`}
          disabled={pending}
          onClick={() => run("archived", () => archiveService(service.id))}
          size="icon"
          variant="ghost"
        >
          <Archive aria-hidden="true" />
        </Button>
      )}
      {canDelete ? (
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogTrigger asChild>
            <Button
              aria-label={`Delete ${service.title}`}
              disabled={pending}
              size="icon"
              variant="ghost"
            >
              <Trash2 aria-hidden="true" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Service</DialogTitle>
              <DialogDescription>
                This action cannot be undone. “{service.title}” will be
                permanently removed.
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
                    const result = await deleteService(service.id);
                    setMessage(result.message);
                    if (result.status === "success") setDeleteOpen(false);
                  })
                }
                variant="destructive"
              >
                {pending ? "Deleting…" : "Delete Service"}
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
