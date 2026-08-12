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
  createTeamMember,
  initialTeamActionState,
  updateTeamMember,
} from "@/lib/actions/team";
import type { MediaLibraryRow, TeamMemberRow } from "@/types/database";
import styles from "./admin-team.module.css";

export function TeamMemberDialog({
  media,
  member,
  mode,
}: {
  readonly media: readonly MediaLibraryRow[];
  readonly member?: TeamMemberRow;
  readonly mode: "create" | "edit";
}) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(
    mode === "create" ? createTeamMember : updateTeamMember,
    initialTeamActionState,
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
          {mode === "create" ? "Create member" : "Edit"}
        </Button>
      </DialogTrigger>
      <DialogContent className={styles.dialog}>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create team member" : `Edit ${member?.name}`}
          </DialogTitle>
          <DialogDescription>
            Manage the member profile, publishing state, ordering, links, and
            Media Library portrait.
          </DialogDescription>
        </DialogHeader>
        <form action={action} className={styles.memberForm}>
          {member ? <input name="id" type="hidden" value={member.id} /> : null}
          <div className={styles.formGrid}>
            <Field
              defaultValue={member?.name}
              error={error("name")}
              label="Name"
              name="name"
              required
            />
            <Field
              defaultValue={member?.slug}
              error={error("slug")}
              label="Slug"
              name="slug"
              required
            />
            <Field
              defaultValue={member?.role}
              error={error("role")}
              label="Role"
              name="role"
              required
            />
            <Field
              defaultValue={member?.department ?? ""}
              error={error("department")}
              label="Department"
              name="department"
            />
            <label>
              <span>Profile image</span>
              <select
                defaultValue={member?.profile_image ?? ""}
                name="profile_image"
              >
                <option value="">No image selected</option>
                {media.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.file_name}
                  </option>
                ))}
              </select>
              <small className={styles.muted}>
                Published Media Library images only.
              </small>
            </label>
            <Field
              defaultValue={member?.years_experience?.toString() ?? ""}
              error={error("years_experience")}
              label="Years of experience"
              max={80}
              min={0}
              name="years_experience"
              type="number"
            />
            <Field
              defaultValue={member?.email ?? ""}
              error={error("email")}
              label="Email"
              name="email"
              type="email"
            />
            <Field
              defaultValue={String(member?.display_order ?? 0)}
              error={error("display_order")}
              label="Display order"
              min={0}
              name="display_order"
              type="number"
            />
          </div>
          <TextArea
            defaultValue={member?.short_bio}
            error={error("short_bio")}
            label="Short bio"
            name="short_bio"
            required
            rows={3}
          />
          <TextArea
            defaultValue={member?.full_bio ?? ""}
            error={error("full_bio")}
            label="Full bio"
            name="full_bio"
            rows={6}
          />
          <Field
            defaultValue={member?.skills.join(", ")}
            error={error("skills")}
            label="Skills"
            name="skills"
            placeholder="TypeScript, Product strategy, AI automation"
          />
          <div className={styles.formGrid}>
            <Field
              defaultValue={member?.linkedin_url ?? ""}
              error={error("linkedin_url")}
              label="LinkedIn URL"
              name="linkedin_url"
              type="url"
            />
            <Field
              defaultValue={member?.github_url ?? ""}
              error={error("github_url")}
              label="GitHub URL"
              name="github_url"
              type="url"
            />
            <Field
              defaultValue={member?.twitter_url ?? ""}
              error={error("twitter_url")}
              label="X / Twitter URL"
              name="twitter_url"
              type="url"
            />
            <Field
              defaultValue={member?.portfolio_url ?? ""}
              error={error("portfolio_url")}
              label="Portfolio URL"
              name="portfolio_url"
              type="url"
            />
            <label>
              <span>Status</span>
              <select defaultValue={member?.status ?? "draft"} name="status">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </label>
          </div>
          <div className={styles.checks}>
            <label>
              <input
                defaultChecked={member?.featured}
                name="featured"
                type="checkbox"
              />
              <span>Featured member</span>
            </label>
          </div>
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
                  ? "Create member"
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
  placeholder,
  required = false,
  type = "text",
}: {
  readonly defaultValue?: string;
  readonly error?: string;
  readonly label: string;
  readonly max?: number;
  readonly min?: number;
  readonly name: string;
  readonly placeholder?: string;
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
        placeholder={placeholder}
        required={required}
        type={type}
      />
      {error ? <small id={id}>{error}</small> : null}
    </label>
  );
}
function TextArea({
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
