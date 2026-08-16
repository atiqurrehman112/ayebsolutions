"use client";

import { useRef, useState } from "react";
import {
  Bold,
  Code2,
  Heading2,
  ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  MessageSquareQuote,
  MousePointerClick,
  Sparkles,
  Table2,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MediaLibraryRow } from "@/types/database";
import styles from "./admin-blog.module.css";

export function BlogRichEditor({
  defaultValue,
  error,
  media,
}: {
  readonly defaultValue: string;
  readonly error?: string;
  readonly media: readonly MediaLibraryRow[];
}) {
  const [value, setValue] = useState(defaultValue);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const insert = (before: string, after = "") => {
    const node = textarea.current;
    if (!node) return;
    const start = node.selectionStart;
    const end = node.selectionEnd;
    const selected = value.slice(start, end) || "text";
    const next = `${value.slice(0, start)}${before}${selected}${after}${value.slice(end)}`;
    setValue(next);
    requestAnimationFrame(() => {
      node.focus();
      node.setSelectionRange(
        start + before.length,
        start + before.length + selected.length,
      );
    });
  };
  const insertMedia = (id: string, kind: "image" | "video") => {
    const item = media.find((entry) => entry.id === id);
    if (item)
      insert(`\n[${kind}:${item.id}:${item.alt || item.file_name}]\n`, "");
  };
  return (
    <div className={styles.richEditor}>
      <div
        aria-label="Rich content formatting"
        className={styles.editorToolbar}
        role="toolbar"
      >
        <Tool label="Heading" icon={Heading2} onClick={() => insert("\n## ")} />
        <Tool label="Bold" icon={Bold} onClick={() => insert("**", "**")} />
        <Tool label="Italic" icon={Italic} onClick={() => insert("_", "_")} />
        <Tool
          label="Bulleted list"
          icon={List}
          onClick={() => insert("\n- ")}
        />
        <Tool
          label="Numbered list"
          icon={ListOrdered}
          onClick={() => insert("\n1. ")}
        />
        <Tool
          label="Quote"
          icon={MessageSquareQuote}
          onClick={() => insert("\n> ")}
        />
        <Tool
          label="Callout"
          icon={Sparkles}
          onClick={() => insert("\n[!NOTE] ")}
        />
        <Tool
          label="Code block"
          icon={Code2}
          onClick={() => insert("\n```\n", "\n```\n")}
        />
        <Tool
          label="Table"
          icon={Table2}
          onClick={() =>
            insert("\n| Column | Column |\n| --- | --- |\n| Value | Value |\n")
          }
        />
        <Tool
          label="Link"
          icon={Link2}
          onClick={() => insert("[Link text](/internal-path)")}
        />
        <Tool
          label="Button"
          icon={MousePointerClick}
          onClick={() => insert("[button:Button text](/contact)")}
        />
        <label className={styles.toolSelect}>
          <ImageIcon aria-hidden="true" />
          <span className="sr-only">Insert image</span>
          <select
            aria-label="Insert Media Library image"
            defaultValue=""
            onChange={(event) => {
              insertMedia(event.target.value, "image");
              event.target.value = "";
            }}
          >
            <option value="">Image</option>
            {media
              .filter((item) => item.resource_type === "image")
              .map((item) => (
                <option key={item.id} value={item.id}>
                  {item.file_name}
                </option>
              ))}
          </select>
        </label>
        <label className={styles.toolSelect}>
          <Video aria-hidden="true" />
          <span className="sr-only">Insert video</span>
          <select
            aria-label="Insert Media Library video"
            defaultValue=""
            onChange={(event) => {
              insertMedia(event.target.value, "video");
              event.target.value = "";
            }}
          >
            <option value="">Video</option>
            {media
              .filter((item) => item.resource_type === "video")
              .map((item) => (
                <option key={item.id} value={item.id}>
                  {item.file_name}
                </option>
              ))}
          </select>
        </label>
      </div>
      <label>
        <span>Rich content *</span>
        <textarea
          aria-invalid={Boolean(error)}
          name="content"
          onChange={(event) => setValue(event.target.value)}
          ref={textarea}
          required
          rows={18}
          value={value}
        />
        {error ? <small>{error}</small> : null}
      </label>
      <aside aria-label="Live content preview" className={styles.livePreview}>
        <strong>Live preview</strong>
        <p>{value.slice(0, 500) || "Begin writing to preview the article."}</p>
      </aside>
    </div>
  );
}
function Tool({
  icon: Icon,
  label,
  onClick,
}: {
  readonly icon: typeof Bold;
  readonly label: string;
  readonly onClick: () => void;
}) {
  return (
    <Button
      aria-label={label}
      onClick={onClick}
      size="icon"
      type="button"
      variant="ghost"
    >
      <Icon aria-hidden="true" />
    </Button>
  );
}
