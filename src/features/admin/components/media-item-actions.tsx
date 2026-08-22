"use client";
import { useActionState, useEffect, useState, useTransition } from "react";
import { Copy, Eye, Pencil, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/overlays";
import {
  deleteMediaAction,
  renameMediaAction,
  replaceMediaAction,
} from "@/lib/actions/media";
import { initialMediaActionState } from "@/lib/actions/action-states";
import type { MediaLibraryRow } from "@/types/database";
import styles from "./admin-media.module.css";
export function MediaItemActions({
  canEdit,
  item,
}: {
  readonly canEdit: boolean;
  readonly item: MediaLibraryRow;
}) {
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();
  const copy = (value: string, label: string) =>
    startTransition(async () => {
      await navigator.clipboard.writeText(value);
      setMessage(`${label} copied.`);
    });
  return (
    <div className={styles.actions}>
      <MetadataDialog item={item} />
      <Button
        aria-label={`Copy URL for ${item.file_name}`}
        onClick={() => copy(item.secure_url, "URL")}
        size="icon"
        variant="ghost"
      >
        <Copy aria-hidden="true" />
      </Button>
      <Button
        aria-label={`Copy public ID for ${item.file_name}`}
        onClick={() => copy(item.public_id, "Public ID")}
        size="icon"
        variant="ghost"
      >
        <span aria-hidden="true">ID</span>
      </Button>
      {canEdit ? (
        <>
          <RenameDialog item={item} />
          <ReplaceDialog item={item} />
          <Dialog>
            <DialogTrigger asChild>
              <Button
                aria-label={`Delete ${item.file_name}`}
                size="icon"
                variant="ghost"
              >
                <Trash2 aria-hidden="true" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete media</DialogTitle>
                <DialogDescription>
                  This permanently removes “{item.file_name}” from Cloudinary
                  and the media library.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  disabled={pending}
                  onClick={() =>
                    startTransition(async () => {
                      const result = await deleteMediaAction(item.id);
                      setMessage(result.message);
                    })
                  }
                  variant="destructive"
                >
                  {pending ? "Deleting…" : "Delete media"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      ) : null}
      <span aria-live="polite" className="sr-only">
        {message}
      </span>
    </div>
  );
}
function MetadataDialog({ item }: { readonly item: MediaLibraryRow }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label={`Preview ${item.file_name}`}
          size="icon"
          variant="ghost"
        >
          <Eye aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className={styles.previewDrawer}>
        <SheetHeader>
          <SheetTitle>{item.file_name}</SheetTitle>
          <SheetDescription>
            Asset preview and delivery metadata.
          </SheetDescription>
        </SheetHeader>
        <div className={styles.assetPreview}>
          <a href={item.secure_url} rel="noreferrer" target="_blank">
            Open delivered asset
          </a>
          <dl>
            <div>
              <dt>Public ID</dt>
              <dd>{item.public_id}</dd>
            </div>
            <div>
              <dt>URL</dt>
              <dd>{item.secure_url}</dd>
            </div>
            <div>
              <dt>Resource</dt>
              <dd>
                {item.resource_type} / {item.format}
              </dd>
            </div>
            <div>
              <dt>Alt text</dt>
              <dd>{item.alt || "Not provided"}</dd>
            </div>
            <div>
              <dt>Tags</dt>
              <dd>{item.tags.join(", ") || "None"}</dd>
            </div>
          </dl>
        </div>
      </SheetContent>
    </Sheet>
  );
}
function RenameDialog({ item }: { readonly item: MediaLibraryRow }) {
  const [state, action, pending] = useActionState(
    renameMediaAction,
    initialMediaActionState,
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label={`Rename ${item.file_name}`}
          size="icon"
          variant="ghost"
        >
          <Pencil aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename media</DialogTitle>
          <DialogDescription>
            Update both the library filename and Cloudinary public ID.
          </DialogDescription>
        </DialogHeader>
        <form action={action} className={styles.mediaForm}>
          <input name="id" type="hidden" value={item.id} />
          <label>
            <span>Filename</span>
            <input defaultValue={item.file_name} name="file_name" required />
          </label>
          <label>
            <span>Public ID</span>
            <input defaultValue={item.public_id} name="public_id" required />
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
              {pending ? "Renaming…" : "Rename media"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
function ReplaceDialog({ item }: { readonly item: MediaLibraryRow }) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(
    replaceMediaAction,
    initialMediaActionState,
  );
  useEffect(() => {
    if (state.status === "success") setOpen(false);
  }, [state.status]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          aria-label={`Replace ${item.file_name}`}
          size="icon"
          variant="ghost"
        >
          <RefreshCw aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Replace media</DialogTitle>
          <DialogDescription>
            Upload a replacement. The database switches first, then the previous
            Cloudinary asset is removed.
          </DialogDescription>
        </DialogHeader>
        <form action={action} className={styles.mediaForm}>
          <input name="id" type="hidden" value={item.id} />
          <label>
            <span>Replacement file</span>
            <input
              accept="image/*,video/mp4,video/webm,application/pdf,.doc,.docx,.txt"
              name="file"
              required
              type="file"
            />
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
              {pending ? "Replacing…" : "Replace media"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
