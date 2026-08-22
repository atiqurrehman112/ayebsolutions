"use client";

import { useActionState, useEffect, useRef, useState } from "react";

import { CmsMedia } from "@/components/media/cms-media";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import { initialFounderActionState } from "@/lib/actions/action-states";
import { saveFounderProfile } from "@/lib/actions/founder";
import type { FounderProfileRow, MediaLibraryRow } from "@/types/database";
import styles from "./admin-founder.module.css";

interface FounderProfileEditorProps {
  readonly canEdit: boolean;
  readonly media: readonly MediaLibraryRow[];
  readonly profile: FounderProfileRow | null;
}

interface PreviewState {
  readonly availability: string;
  readonly biography: string;
  readonly badge: string;
  readonly introduction: string;
  readonly name: string;
  readonly photoId: string;
  readonly title: string;
}

function initialPreview(profile: FounderProfileRow | null): PreviewState {
  return {
    availability: profile?.availability_status ?? "",
    biography: profile?.biography ?? "",
    badge: profile?.featured_badge ?? "",
    introduction: profile?.short_introduction ?? "",
    name: profile?.full_name ?? "Founder name",
    photoId: profile?.profile_photo ?? "",
    title: profile?.role_title ?? "Professional title",
  };
}

export function FounderProfileEditor({
  canEdit,
  media,
  profile,
}: FounderProfileEditorProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(
    saveFounderProfile,
    initialFounderActionState,
  );
  const [dirty, setDirty] = useState(false);
  const [preview, setPreview] = useState(() => initialPreview(profile));
  const error = (name: string) => state.fieldErrors?.[name]?.[0];

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  useEffect(() => {
    if (state.status === "success") setDirty(false);
  }, [state.status]);

  const updatePreview = () => {
    const form = formRef.current;
    if (!form) return;
    const data = new FormData(form);
    setDirty(true);
    setPreview({
      availability: String(data.get("availability_status") ?? ""),
      biography: String(data.get("biography") ?? ""),
      badge: String(data.get("featured_badge") ?? ""),
      introduction: String(data.get("short_introduction") ?? ""),
      name: String(data.get("full_name") ?? "") || "Founder name",
      photoId: String(data.get("profile_photo") ?? ""),
      title: String(data.get("role_title") ?? "") || "Professional title",
    });
  };

  const field = (
    name: Extract<keyof FounderProfileRow, string>,
    label: string,
    type = "text",
  ) => (
    <Field
      defaultValue={String(profile?.[name] ?? "")}
      error={error(name)}
      label={label}
      name={name}
      type={type}
      disabled={!canEdit}
    />
  );

  return (
    <div className={styles.editorLayout}>
      <form
        action={action}
        className={styles.form}
        onChange={updatePreview}
        ref={formRef}
      >
        <input type="hidden" name="status" value={profile?.status ?? "draft"} />
        <fieldset disabled={!canEdit}>
          <legend>Identity</legend>
          <div className={styles.grid}>
            {field("full_name", "Full name")}
            {field("role_title", "Professional title")}
            {field("professional_headline", "Professional headline")}
            {field("featured_badge", "Featured badge label")}
            {field("email", "Email", "email")}
            {field("phone", "Phone", "tel")}
            {field("location", "Location")}
            {field("display_order", "Display order", "number")}
          </div>
          <TextArea
            defaultValue={profile?.short_introduction ?? ""}
            error={error("short_introduction")}
            label="Short introduction"
            name="short_introduction"
            rows={4}
            disabled={!canEdit}
          />
          <TextArea
            defaultValue={profile?.biography ?? ""}
            error={error("biography")}
            hint="Use blank lines for paragraphs, ## for subheadings, > for quotes, and - for lists. Formatting is rendered safely without raw HTML."
            label="Long biography (rich text)"
            name="biography"
            rows={12}
            disabled={!canEdit}
          />
        </fieldset>

        <fieldset disabled={!canEdit}>
          <legend>Media Library</legend>
          <div className={styles.grid}>
            <MediaSelect
              label="Profile image"
              name="profile_photo"
              value={profile?.profile_photo}
              media={media}
            />
            <MediaSelect
              label="Cover image"
              name="cover_image"
              value={profile?.cover_image}
              media={media}
            />
            <MediaSelect
              label="OpenGraph image"
              name="open_graph_image"
              value={profile?.open_graph_image}
              media={media}
            />
          </div>
        </fieldset>

        <fieldset disabled={!canEdit}>
          <legend>Professional links</legend>
          <div className={styles.grid}>
            {field("linkedin_url", "LinkedIn", "url")}
            {field("github_url", "GitHub", "url")}
            {field("twitter_url", "X / Twitter", "url")}
            {field("facebook_url", "Facebook", "url")}
            {field("instagram_url", "Instagram", "url")}
            {field("portfolio_url", "Personal website", "url")}
            {field("resume_url", "Resume URL", "url")}
          </div>
        </fieldset>

        <fieldset disabled={!canEdit}>
          <legend>Experience and expertise</legend>
          <div className={styles.grid}>
            {field("years_experience", "Years of experience", "number")}
            {field("projects_completed", "Projects completed", "number")}
            {field("happy_clients", "Happy clients", "number")}
          </div>
          <div className={styles.grid}>
            {field("technologies", "Technologies, comma separated")}
            {field("certifications", "Certifications, comma separated")}
            {field("skills", "Skills, comma separated")}
          </div>
        </fieldset>

        <fieldset disabled={!canEdit}>
          <legend>Direction and availability</legend>
          <TextArea
            defaultValue={profile?.vision_statement ?? ""}
            error={error("vision_statement")}
            label="Vision statement"
            name="vision_statement"
            rows={4}
            disabled={!canEdit}
          />
          <TextArea
            defaultValue={profile?.mission_statement ?? ""}
            error={error("mission_statement")}
            label="Mission statement"
            name="mission_statement"
            rows={4}
            disabled={!canEdit}
          />
          <TextArea
            defaultValue={profile?.personal_quote ?? ""}
            error={error("personal_quote")}
            label="Personal quote"
            name="personal_quote"
            rows={3}
            disabled={!canEdit}
          />
          <label>
            <span>Availability status</span>
            <select
              name="availability_status"
              defaultValue={profile?.availability_status ?? ""}
            >
              <option value="">Not specified</option>
              <option value="available">Available</option>
              <option value="busy">Busy</option>
              <option value="not_accepting">Not accepting projects</option>
            </select>
          </label>
        </fieldset>

        <fieldset disabled={!canEdit}>
          <legend>Search and sharing</legend>
          <div className={styles.grid}>
            {field("seo_title", "SEO title")}
            {field("seo_description", "SEO description")}
          </div>
        </fieldset>

        <div
          aria-live="polite"
          className={state.status === "error" ? styles.error : styles.message}
        >
          {pending
            ? "Saving Founder profile…"
            : dirty
              ? "Unsaved changes"
              : state.message || "All changes saved"}
        </div>

        {canEdit ? (
          <div className={styles.actions}>
            <Button
              disabled={pending}
              name="intent"
              size="lg"
              type="submit"
              value="draft"
              variant="outline"
            >
              Save draft
            </Button>
            <Button
              disabled={pending}
              name="intent"
              size="lg"
              type="submit"
              value="publish"
            >
              Publish
            </Button>
            {profile?.status === "published" ? (
              <Button
                disabled={pending}
                name="intent"
                type="submit"
                value="unpublish"
                variant="ghost"
              >
                Unpublish
              </Button>
            ) : null}
          </div>
        ) : (
          <p className={styles.message}>
            Your viewer role has read-only access.
          </p>
        )}
      </form>

      <FounderLivePreview media={media} preview={preview} />
    </div>
  );
}

function FounderLivePreview({
  media,
  preview,
}: {
  readonly media: readonly MediaLibraryRow[];
  readonly preview: PreviewState;
}) {
  const photo = media.find((item) => item.id === preview.photoId) ?? null;
  return (
    <aside className={styles.preview} aria-labelledby="founder-preview-title">
      <div className={styles.previewHeading}>
        <span>Live preview</span>
        <Badge variant="outline">Editor only</Badge>
      </div>
      <div className={styles.previewPortrait}>
        <CmsMedia
          media={photo}
          alt={photo?.alt ?? `Portrait preview for ${preview.name}`}
          sizes="(min-width: 1200px) 22rem, 90vw"
          className={styles.previewImage}
        />
      </div>
      <div className={styles.previewContent}>
        <span className={styles.previewBadge}>
          {preview.badge ||
            preview.availability.replaceAll("_", " ") ||
            "Founder"}
        </span>
        <h3 id="founder-preview-title">{preview.name}</h3>
        <p className={styles.previewTitle}>{preview.title}</p>
        {preview.introduction ? <p>{preview.introduction}</p> : null}
        {preview.biography ? (
          <p className={styles.previewBiography}>{preview.biography}</p>
        ) : null}
      </div>
    </aside>
  );
}

function Field({
  defaultValue,
  disabled,
  error,
  label,
  name,
  type,
}: {
  readonly defaultValue: string;
  readonly disabled: boolean;
  readonly error?: string;
  readonly label: string;
  readonly name: string;
  readonly type: string;
}) {
  const id = `${name}-error`;
  return (
    <label>
      <span>{label}</span>
      <input
        aria-describedby={error ? id : undefined}
        aria-invalid={Boolean(error)}
        defaultValue={defaultValue}
        disabled={disabled}
        min={type === "number" ? 0 : undefined}
        name={name}
        type={type}
      />
      {error ? <small id={id}>{error}</small> : null}
    </label>
  );
}

function TextArea({
  defaultValue,
  disabled,
  error,
  hint,
  label,
  name,
  rows,
}: {
  readonly defaultValue: string;
  readonly disabled: boolean;
  readonly error?: string;
  readonly hint?: string;
  readonly label: string;
  readonly name: string;
  readonly rows: number;
}) {
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;
  return (
    <label>
      <span>{label}</span>
      <textarea
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        aria-invalid={Boolean(error)}
        defaultValue={defaultValue}
        disabled={disabled}
        name={name}
        rows={rows}
      />
      {hint ? <small id={hintId}>{hint}</small> : null}
      {error ? <small id={errorId}>{error}</small> : null}
    </label>
  );
}

function MediaSelect({
  label,
  media,
  name,
  value,
}: {
  readonly label: string;
  readonly media: readonly MediaLibraryRow[];
  readonly name: string;
  readonly value?: string | null;
}) {
  return (
    <label>
      <span>{label}</span>
      <select defaultValue={value ?? ""} name={name}>
        <option value="">No image selected</option>
        {media.map((item) => (
          <option key={item.id} value={item.id}>
            {item.file_name}
          </option>
        ))}
      </select>
      <small>Published Cloudinary images from the Media Library only.</small>
    </label>
  );
}
