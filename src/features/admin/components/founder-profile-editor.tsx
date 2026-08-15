"use client";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  initialFounderActionState,
  saveFounderProfile,
} from "@/lib/actions/founder";
import type { FounderProfileRow, MediaLibraryRow } from "@/types/database";
import styles from "./admin-founder.module.css";

export function FounderProfileEditor({
  canEdit,
  media,
  profile,
}: {
  readonly canEdit: boolean;
  readonly media: readonly MediaLibraryRow[];
  readonly profile: FounderProfileRow | null;
}) {
  const [state, action, pending] = useActionState(
    saveFounderProfile,
    initialFounderActionState,
  );
  const error = (name: string) => state.fieldErrors?.[name]?.[0];
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
    <form action={action} className={styles.form}>
      <fieldset disabled={!canEdit}>
        <legend>Identity</legend>
        <div className={styles.grid}>
          {field("full_name", "Full name")}
          {field("role_title", "Role / title")}
          {field("professional_headline", "Professional headline")}
          {field("email", "Email", "email")}
          {field("phone", "Phone", "tel")}
        </div>
        <TextArea
          defaultValue={profile?.biography ?? ""}
          error={error("biography")}
          label="Biography (rich text source)"
          name="biography"
          rows={10}
          disabled={!canEdit}
        />
      </fieldset>
      <fieldset disabled={!canEdit}>
        <legend>Media Library</legend>
        <div className={styles.grid}>
          <MediaSelect
            label="Profile photo"
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
        </div>
      </fieldset>
      <fieldset disabled={!canEdit}>
        <legend>Professional links</legend>
        <div className={styles.grid}>
          {field("linkedin_url", "LinkedIn", "url")}
          {field("github_url", "GitHub", "url")}
          {field("twitter_url", "X", "url")}
          {field("facebook_url", "Facebook", "url")}
          {field("instagram_url", "Instagram", "url")}
          {field("portfolio_url", "Portfolio website", "url")}
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
        <div className={styles.grid}>
          <label>
            <span>Availability</span>
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
          <label>
            <span>Status</span>
            <select name="status" defaultValue={profile?.status ?? "draft"}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
        </div>
      </fieldset>
      <div
        aria-live="polite"
        className={state.status === "error" ? styles.error : styles.message}
      >
        {state.message}
      </div>
      {canEdit ? (
        <Button size="lg" disabled={pending} type="submit">
          {pending
            ? "Saving…"
            : profile
              ? "Save Founder Profile"
              : "Create Founder Profile"}
        </Button>
      ) : (
        <p className={styles.message}>Your viewer role has read-only access.</p>
      )}
    </form>
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
  label,
  name,
  rows,
}: {
  readonly defaultValue: string;
  readonly disabled: boolean;
  readonly error?: string;
  readonly label: string;
  readonly name: string;
  readonly rows: number;
}) {
  const id = `${name}-error`;
  return (
    <label>
      <span>{label}</span>
      <textarea
        aria-describedby={error ? id : undefined}
        aria-invalid={Boolean(error)}
        defaultValue={defaultValue}
        disabled={disabled}
        name={name}
        rows={rows}
      />
      {error ? <small id={id}>{error}</small> : null}
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
      <small>Published Media Library images only.</small>
    </label>
  );
}
