"use client";
import { useOptimistic, useState, useTransition } from "react";
import { Star, Trash2 } from "lucide-react";
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
  deleteTeamMember,
  draftTeamMember,
  publishTeamMember,
  toggleFeaturedTeamMember,
} from "@/lib/actions/team";
import type { TeamActionState } from "@/lib/actions/action-states";
import type { MediaLibraryRow, TeamMemberRow } from "@/types/database";
import { TeamMemberDialog } from "./team-member-dialog";
import styles from "./admin-team.module.css";

export function TeamRowActions({
  canDelete,
  canEdit,
  media,
  member,
}: {
  readonly canDelete: boolean;
  readonly canEdit: boolean;
  readonly media: readonly MediaLibraryRow[];
  readonly member: TeamMemberRow;
}) {
  const [state, setState] = useOptimistic({
    featured: member.featured,
    status: member.status,
  });
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  if (!canEdit) return <span className={styles.muted}>Read only</span>;
  const run = (
    next: Partial<typeof state>,
    action: () => Promise<TeamActionState>,
  ) =>
    startTransition(async () => {
      setState({ ...state, ...next });
      const result = await action();
      setMessage(result.message);
    });
  return (
    <div className={styles.rowActions}>
      <TeamMemberDialog media={media} member={member} mode="edit" />
      {state.status === "published" ? (
        <Button
          disabled={pending}
          onClick={() =>
            run({ status: "draft" }, () => draftTeamMember(member.id))
          }
          size="sm"
          variant="outline"
        >
          Draft
        </Button>
      ) : (
        <Button
          disabled={pending}
          onClick={() =>
            run({ status: "published" }, () => publishTeamMember(member.id))
          }
          size="sm"
        >
          Publish
        </Button>
      )}
      <Button
        aria-label={`${state.featured ? "Remove" : "Add"} ${member.name} ${state.featured ? "from" : "to"} featured placement`}
        disabled={pending}
        onClick={() =>
          run({ featured: !state.featured }, () =>
            toggleFeaturedTeamMember(member.id),
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
              aria-label={`Delete ${member.name}`}
              disabled={pending}
              size="icon"
              variant="ghost"
            >
              <Trash2 aria-hidden="true" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Team Member</DialogTitle>
              <DialogDescription>
                This cannot be undone. “{member.name}” will be permanently
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
                    const result = await deleteTeamMember(member.id);
                    setMessage(result.message);
                    if (result.status === "success") setDeleteOpen(false);
                  })
                }
                variant="destructive"
              >
                {pending ? "Deleting…" : "Delete member"}
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
