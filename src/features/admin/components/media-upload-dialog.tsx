"use client";
import { useActionState, useEffect, useState } from "react";
import { UploadCloud } from "lucide-react";
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
  initialMediaActionState,
  uploadMediaAction,
} from "@/lib/actions/media";
import styles from "./admin-media.module.css";
export function MediaUploadDialog() {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(
    uploadMediaAction,
    initialMediaActionState,
  );
  useEffect(() => {
    if (state.status === "success") setOpen(false);
  }, [state.status]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">
          <UploadCloud aria-hidden="true" />
          Upload media
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload media</DialogTitle>
          <DialogDescription>
            Images, videos, PDFs, SVGs, and documents up to 25 MB. Files are
            sent through a protected Server Action.
          </DialogDescription>
        </DialogHeader>
        <form action={action} className={styles.mediaForm}>
          <label>
            <span>File *</span>
            <input
              accept="image/*,video/mp4,video/webm,application/pdf,.doc,.docx,.txt"
              name="file"
              required
              type="file"
            />
          </label>
          <label>
            <span>Filename</span>
            <input
              name="file_name"
              placeholder="Uses the uploaded filename when empty"
            />
          </label>
          <label>
            <span>Folder *</span>
            <input defaultValue="ayeb-solutions" name="folder" required />
          </label>
          <label>
            <span>Alt text</span>
            <textarea name="alt" rows={3} />
          </label>
          <label>
            <span>Tags</span>
            <input name="tags" placeholder="brand, homepage, campaign" />
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
              {pending ? "Uploading…" : "Upload media"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
