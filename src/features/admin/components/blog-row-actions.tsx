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
  archiveBlogArticle,
  deleteBlogArticle,
  moveBlogArticleToReview,
  publishBlogArticle,
  restoreBlogArticle,
  unpublishBlogArticle,
  type BlogActionState,
} from "@/lib/actions/blog";
import type {
  BlogArticleRow,
  CategoryRow,
  ContentStatus,
} from "@/types/database";
import { BlogArticleDialog } from "./blog-article-dialog";
import styles from "./admin-blog.module.css";

interface Props {
  readonly article: BlogArticleRow;
  readonly canDelete: boolean;
  readonly canEdit: boolean;
  readonly categories: readonly Pick<CategoryRow, "id" | "name" | "slug">[];
}
export function BlogRowActions({
  article,
  canDelete,
  canEdit,
  categories,
}: Props) {
  const [status, setStatus] = useOptimistic(article.status);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  if (!canEdit) return <span className={styles.muted}>Read only</span>;
  const run = (next: ContentStatus, action: () => Promise<BlogActionState>) =>
    startTransition(async () => {
      setStatus(next);
      const result = await action();
      setMessage(result.message);
    });
  return (
    <div className={styles.rowActions}>
      <BlogArticleDialog
        article={article}
        categories={categories}
        mode="edit"
      />
      {status === "draft" ? (
        <Button
          disabled={pending}
          onClick={() =>
            run("review", () => moveBlogArticleToReview(article.id))
          }
          size="sm"
          variant="outline"
        >
          Review
        </Button>
      ) : null}
      {status === "review" ? (
        <Button
          disabled={pending}
          onClick={() => run("published", () => publishBlogArticle(article.id))}
          size="sm"
        >
          Publish
        </Button>
      ) : null}
      {status === "published" ? (
        <Button
          disabled={pending}
          onClick={() => run("draft", () => unpublishBlogArticle(article.id))}
          size="sm"
          variant="outline"
        >
          Unpublish
        </Button>
      ) : null}
      {status === "archived" ? (
        <Button
          disabled={pending}
          onClick={() => run("draft", () => restoreBlogArticle(article.id))}
          size="sm"
          variant="outline"
        >
          <RotateCcw aria-hidden="true" />
          Restore
        </Button>
      ) : (
        <Button
          aria-label={`Archive ${article.title}`}
          disabled={pending}
          onClick={() => run("archived", () => archiveBlogArticle(article.id))}
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
              aria-label={`Delete ${article.title}`}
              disabled={pending}
              size="icon"
              variant="ghost"
            >
              <Trash2 aria-hidden="true" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Article</DialogTitle>
              <DialogDescription>
                This action cannot be undone. “{article.title}” will be
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
                    const result = await deleteBlogArticle(article.id);
                    setMessage(result.message);
                    if (result.status === "success") setDeleteOpen(false);
                  })
                }
                variant="destructive"
              >
                {pending ? "Deleting…" : "Delete Article"}
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
