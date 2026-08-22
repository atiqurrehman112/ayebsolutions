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
  archivePortfolioProject,
  deletePortfolioProject,
  movePortfolioProjectToReview,
  publishPortfolioProject,
  restorePortfolioProject,
  unpublishPortfolioProject,
} from "@/lib/actions/portfolio";
import type { PortfolioActionState } from "@/lib/actions/action-states";
import type {
  CategoryRow,
  ContentStatus,
  PortfolioProjectRow,
} from "@/types/database";
import { PortfolioProjectDialog } from "./portfolio-project-dialog";
import styles from "./admin-portfolio.module.css";

interface Props {
  readonly canDelete: boolean;
  readonly canEdit: boolean;
  readonly categories: readonly Pick<CategoryRow, "id" | "name" | "slug">[];
  readonly project: PortfolioProjectRow;
}

export function PortfolioRowActions({
  canDelete,
  canEdit,
  categories,
  project,
}: Props) {
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(project.status);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  if (!canEdit) return <span className={styles.muted}>Read only</span>;

  const run = (
    next: ContentStatus,
    action: () => Promise<PortfolioActionState>,
  ) =>
    startTransition(async () => {
      setOptimisticStatus(next);
      const result = await action();
      setMessage(result.message);
      if (result.status === "success" && next === "archived")
        setDeleteOpen(false);
    });

  return (
    <div className={styles.rowActions}>
      <PortfolioProjectDialog
        categories={categories}
        mode="edit"
        project={project}
      />
      {optimisticStatus === "draft" ? (
        <Button
          disabled={pending}
          onClick={() =>
            run("review", () => movePortfolioProjectToReview(project.id))
          }
          size="sm"
          variant="outline"
        >
          Review
        </Button>
      ) : null}
      {optimisticStatus === "review" ? (
        <Button
          disabled={pending}
          onClick={() =>
            run("published", () => publishPortfolioProject(project.id))
          }
          size="sm"
        >
          Publish
        </Button>
      ) : null}
      {optimisticStatus === "published" ? (
        <Button
          disabled={pending}
          onClick={() =>
            run("draft", () => unpublishPortfolioProject(project.id))
          }
          size="sm"
          variant="outline"
        >
          Unpublish
        </Button>
      ) : null}
      {optimisticStatus === "archived" ? (
        <Button
          disabled={pending}
          onClick={() =>
            run("draft", () => restorePortfolioProject(project.id))
          }
          size="sm"
          variant="outline"
        >
          <RotateCcw aria-hidden="true" />
          Restore
        </Button>
      ) : (
        <Button
          aria-label={`Archive ${project.title}`}
          disabled={pending}
          onClick={() =>
            run("archived", () => archivePortfolioProject(project.id))
          }
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
              aria-label={`Delete ${project.title}`}
              disabled={pending}
              size="icon"
              variant="ghost"
            >
              <Trash2 aria-hidden="true" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Project</DialogTitle>
              <DialogDescription>
                This cannot be undone. “{project.title}” will be permanently
                removed.
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
                    const result = await deletePortfolioProject(project.id);
                    setMessage(result.message);
                    if (result.status === "success") setDeleteOpen(false);
                  })
                }
                variant="destructive"
              >
                {pending ? "Deleting…" : "Delete Project"}
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
