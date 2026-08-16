"use client";

import { useState, useTransition } from "react";
import { Bold, CalendarClock, Italic, Mail, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  completeLeadFollowUp,
  saveEmailTemplate,
  scheduleLeadFollowUp,
  sendLeadMessage,
} from "@/lib/actions/contact-leads";
import type {
  ContactLeadRow,
  EmailTemplateRow,
  LeadFollowUpRow,
} from "@/types/database";
import styles from "./admin-contact-leads.module.css";

interface Props {
  readonly followUps: readonly LeadFollowUpRow[];
  readonly lead: ContactLeadRow;
  readonly templates: readonly EmailTemplateRow[];
}
const splitAddresses = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
export function LeadEmailCenter({ followUps, lead, templates }: Props) {
  const [subject, setSubject] = useState(
    `Re: ${lead.subject || lead.project_type}`,
  );
  const [body, setBody] = useState("");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();
  const run = (action: () => Promise<{ readonly message: string }>) =>
    startTransition(async () => setMessage((await action()).message));
  const applyTemplate = (id: string) => {
    const template = templates.find((item) => item.id === id);
    if (template) {
      setSubject(template.subject);
      setBody(template.body_text);
    }
  };
  const addMarkup = (marker: "**" | "_") =>
    setBody((value) => `${value}${marker}text${marker}`);
  const schedule = (days: number) => {
    const date = new Date(Date.now() + days * 86_400_000);
    run(() =>
      scheduleLeadFollowUp({
        lead_id: lead.id,
        scheduled_for: date.toISOString(),
        note: `Follow up with ${lead.name}`,
      }),
    );
  };
  return (
    <div className={styles.emailCenter}>
      <section aria-labelledby={`compose-${lead.id}`}>
        <h3 id={`compose-${lead.id}`}>Email composer</h3>
        <label>
          Template
          <select
            defaultValue=""
            onChange={(event) => applyTemplate(event.target.value)}
          >
            <option value="">Start from scratch</option>
            {templates.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Reply to
          <input defaultValue={lead.email} readOnly type="email" />
        </label>
        <div className={styles.twoColumns}>
          <label>
            CC
            <input
              onChange={(event) => setCc(event.target.value)}
              placeholder="email@example.com"
              type="text"
              value={cc}
            />
          </label>
          <label>
            BCC
            <input
              onChange={(event) => setBcc(event.target.value)}
              placeholder="email@example.com"
              type="text"
              value={bcc}
            />
          </label>
        </div>
        <label>
          Subject
          <input
            onChange={(event) => setSubject(event.target.value)}
            required
            value={subject}
          />
        </label>
        <div
          aria-label="Formatting controls"
          className={styles.editorToolbar}
          role="toolbar"
        >
          <Button
            aria-label="Insert bold text"
            onClick={() => addMarkup("**")}
            size="sm"
            type="button"
            variant="ghost"
          >
            <Bold aria-hidden="true" />
          </Button>
          <Button
            aria-label="Insert italic text"
            onClick={() => addMarkup("_")}
            size="sm"
            type="button"
            variant="ghost"
          >
            <Italic aria-hidden="true" />
          </Button>
          {["name", "company", "service", "budget"].map((variable) => (
            <Button
              key={variable}
              onClick={() => setBody((value) => `${value}{{${variable}}}`)}
              size="sm"
              type="button"
              variant="ghost"
            >{`{{${variable}}}`}</Button>
          ))}
        </div>
        <label>
          Message
          <textarea
            aria-describedby={`format-help-${lead.id}`}
            onChange={(event) => setBody(event.target.value)}
            required
            rows={10}
            value={body}
          />
        </label>
        <p className={styles.help} id={`format-help-${lead.id}`}>
          Use the toolbar for emphasis and variables. Content is safely rendered
          as rich text before delivery.
        </p>
        <Button
          disabled={pending || body.trim().length < 2}
          onClick={() =>
            run(() =>
              sendLeadMessage({
                id: lead.id,
                recipient: lead.email,
                subject,
                body,
                email_type: "reply",
                cc: splitAddresses(cc),
                bcc: splitAddresses(bcc),
                reply_to: null,
              }),
            )
          }
          type="button"
        >
          <Mail aria-hidden="true" />
          Send with Resend
        </Button>
        <Button
          disabled={pending || body.trim().length < 2}
          onClick={() =>
            run(() =>
              saveEmailTemplate({
                name: `Custom — ${subject}`,
                category: "custom",
                subject,
                body,
              }),
            )
          }
          type="button"
          variant="outline"
        >
          <Plus aria-hidden="true" />
          Save as template
        </Button>
      </section>
      <section aria-labelledby={`follow-up-${lead.id}`}>
        <h3 id={`follow-up-${lead.id}`}>Scheduled follow-ups</h3>
        <div className={styles.quickActions}>
          {[
            [1, "Tomorrow"],
            [3, "3 days"],
            [7, "1 week"],
          ].map(([days, label]) => (
            <Button
              disabled={pending}
              key={label}
              onClick={() => schedule(Number(days))}
              size="sm"
              type="button"
              variant="outline"
            >
              <CalendarClock aria-hidden="true" />
              {label}
            </Button>
          ))}
        </div>
        <label>
          Custom date
          <input
            min={new Date().toISOString().slice(0, 16)}
            onChange={(event) =>
              event.target.value &&
              run(() =>
                scheduleLeadFollowUp({
                  lead_id: lead.id,
                  scheduled_for: new Date(event.target.value).toISOString(),
                  note: `Follow up with ${lead.name}`,
                }),
              )
            }
            type="datetime-local"
          />
        </label>
        <ol className={styles.timeline}>
          {followUps.length ? (
            followUps.map((item) => (
              <li key={item.id}>
                <strong>{item.note || "Lead follow-up"}</strong>
                <span>
                  {new Date(item.scheduled_for).toLocaleString()} ·{" "}
                  {item.status}
                </span>
                {item.status === "scheduled" ? (
                  <Button
                    disabled={pending}
                    onClick={() =>
                      run(() => completeLeadFollowUp(item.id, lead.id))
                    }
                    size="sm"
                    type="button"
                    variant="ghost"
                  >
                    Mark completed
                  </Button>
                ) : null}
              </li>
            ))
          ) : (
            <li>No follow-ups scheduled.</li>
          )}
        </ol>
      </section>
      {message ? (
        <p aria-live="polite" className={styles.feedback}>
          {message}
        </p>
      ) : null}
    </div>
  );
}
