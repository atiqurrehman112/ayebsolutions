"use client";

import { useState, useTransition } from "react";
import {
  Archive,
  Eye,
  Mail,
  MailOpen,
  RotateCcw,
  Star,
  Trash2,
} from "lucide-react";

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
  addLeadNote,
  assignLead,
  changeLeadPriority,
  changeLeadStatus,
  deleteLead,
  restoreLead,
  setLeadImportant,
} from "@/lib/actions/contact-leads";
import type {
  LeadContext,
  LeadPriority,
} from "@/lib/database/repositories/contact-leads-repository";
import type {
  ContactLeadRow,
  EmailTemplateRow,
  LeadStatus,
  ProfileRow,
} from "@/types/database";
import styles from "./admin-contact-leads.module.css";
import { LeadEmailCenter } from "./lead-email-center";

interface Props {
  readonly assignees: readonly Pick<
    ProfileRow,
    "display_name" | "id" | "role"
  >[];
  readonly canDelete: boolean;
  readonly canEdit: boolean;
  readonly canManageNotes: boolean;
  readonly canCommunicate: boolean;
  readonly context: LeadContext;
  readonly lead: ContactLeadRow;
  readonly templates: readonly EmailTemplateRow[];
}
const statuses: readonly LeadStatus[] = [
  "new",
  "read",
  "in_progress",
  "replied",
  "won",
  "lost",
  "archived",
];
const priorities: readonly LeadPriority[] = ["low", "medium", "high", "urgent"];
export function LeadRowActions({
  assignees,
  canDelete,
  canEdit,
  canManageNotes,
  canCommunicate,
  context,
  lead,
  templates,
}: Props) {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const run = (
    action: () => Promise<{
      readonly message: string;
      readonly status: "error" | "success";
    }>,
  ) =>
    startTransition(async () => {
      const result = await action();
      setMessage(result.message);
    });
  return (
    <div className={styles.rowActions}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button aria-label={`Open ${lead.name}`} size="icon" variant="ghost">
            <Eye aria-hidden="true" />
          </Button>
        </DialogTrigger>
        <DialogContent className={styles.drawer}>
          <DialogHeader>
            <DialogTitle>{lead.subject || lead.project_type}</DialogTitle>
            <DialogDescription>
              {lead.name} · {lead.company || "Independent inquiry"}
            </DialogDescription>
          </DialogHeader>
          <div className={styles.details}>
            <dl>
              <Detail term="Email" value={lead.email} />
              <Detail term="Phone" value={lead.phone || "Not provided"} />
              <Detail term="Company" value={lead.company || "Not provided"} />
              <Detail term="Service requested" value={lead.project_type} />
              <Detail term="Subject" value={lead.subject || "Not provided"} />
              <Detail term="Timeline" value={lead.timeline || "Not provided"} />
              <Detail
                term="Budget"
                value={
                  lead.estimated_budget || lead.budget_range || "Not provided"
                }
              />
              <Detail term="Source" value={lead.source} />
              <Detail term="Country" value={lead.country || "Not available"} />
              <Detail
                term="IP fingerprint"
                value={lead.ip_hash || "Not available"}
              />
              <Detail
                term="Referrer"
                value={lead.referrer || "Not available"}
              />
              <Detail
                term="User agent"
                value={lead.user_agent || "Not available"}
              />
              <Detail
                term="Created"
                value={new Date(lead.created_at).toLocaleString()}
              />
              <Detail term="Status" value={lead.status.replaceAll("_", " ")} />
              <Detail
                term="Last contacted"
                value={
                  lead.last_contacted_at
                    ? new Date(lead.last_contacted_at).toLocaleString()
                    : "Not contacted"
                }
              />
            </dl>
            <section>
              <h3>Requirements</h3>
              <p>{lead.message}</p>
            </section>
            {canEdit ? (
              <div className={styles.controls}>
                <label>
                  Status
                  <select
                    defaultValue={lead.status}
                    disabled={pending}
                    onChange={(event) =>
                      run(() =>
                        changeLeadStatus(
                          lead.id,
                          event.target.value as LeadStatus,
                        ),
                      )
                    }
                  >
                    {statuses.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Priority
                  <select
                    defaultValue={lead.priority}
                    disabled={pending}
                    onChange={(event) =>
                      run(() =>
                        changeLeadPriority(
                          lead.id,
                          event.target.value as LeadPriority,
                        ),
                      )
                    }
                  >
                    {priorities.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Assigned to
                  <select
                    defaultValue={lead.assigned_to ?? ""}
                    disabled={pending}
                    onChange={(event) =>
                      run(() => assignLead(lead.id, event.target.value || null))
                    }
                  >
                    <option value="">Unassigned</option>
                    {assignees.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.display_name ?? item.role}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            ) : null}
            <section>
              <h3>Internal notes</h3>
              {canManageNotes ? (
                <form
                  action={(formData) =>
                    run(() =>
                      addLeadNote(lead.id, String(formData.get("notes") ?? "")),
                    )
                  }
                >
                  <textarea
                    defaultValue={lead.notes ?? ""}
                    name="notes"
                    required
                  />
                  <Button disabled={pending} type="submit">
                    Save notes
                  </Button>
                </form>
              ) : (
                <p>
                  {canManageNotes
                    ? lead.notes || "No notes recorded."
                    : "Internal notes are restricted to administrators."}
                </p>
              )}
            </section>
            <section>
              <h3>Status timeline</h3>
              <ol className={styles.timeline}>
                {context.statuses.length ? (
                  context.statuses.map((item) => (
                    <li key={item.id}>
                      <strong>{item.to_status.replaceAll("_", " ")}</strong>
                      <span>{new Date(item.created_at).toLocaleString()}</span>
                    </li>
                  ))
                ) : (
                  <li>No status changes recorded yet.</li>
                )}
              </ol>
            </section>
            <section>
              <h3>Email history</h3>
              <ol className={styles.timeline}>
                {context.emails.length ? (
                  context.emails.map((item) => (
                    <li key={item.id}>
                      <strong>{item.subject}</strong>
                      <span>
                        {item.email_type.replaceAll("_", " ")} ·{" "}
                        {new Date(item.sent_at).toLocaleString()}
                      </span>
                    </li>
                  ))
                ) : (
                  <li>No email has been sent from the CRM.</li>
                )}
                {context.notes.map((item) => (
                  <li key={item.id}>
                    <strong>Internal note</strong>
                    <span>
                      {item.body} · {new Date(item.created_at).toLocaleString()}
                    </span>
                  </li>
                ))}
                {context.followUps.map((item) => (
                  <li key={item.id}>
                    <strong>Follow-up {item.status}</strong>
                    <span>
                      {item.note || "No note"} ·{" "}
                      {new Date(item.scheduled_for).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
            {canCommunicate ? (
              <LeadEmailCenter
                followUps={context.followUps}
                lead={lead}
                templates={templates}
              />
            ) : null}
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} variant="outline">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {canEdit ? (
        <Button
          aria-label={
            lead.is_important
              ? `Remove important mark from ${lead.name}`
              : `Mark ${lead.name} important`
          }
          disabled={pending}
          onClick={() =>
            run(() => setLeadImportant(lead.id, !lead.is_important))
          }
          size="icon"
          variant="ghost"
        >
          <Star
            aria-hidden="true"
            fill={lead.is_important ? "currentColor" : "none"}
          />
        </Button>
      ) : null}
      {canEdit && lead.status === "new" ? (
        <Button
          aria-label={`Mark ${lead.name} read`}
          disabled={pending}
          onClick={() => run(() => changeLeadStatus(lead.id, "read"))}
          size="icon"
          variant="ghost"
        >
          <MailOpen aria-hidden="true" />
        </Button>
      ) : canEdit && lead.status === "read" ? (
        <Button
          aria-label={`Mark ${lead.name} unread`}
          disabled={pending}
          onClick={() => run(() => changeLeadStatus(lead.id, "new"))}
          size="icon"
          variant="ghost"
        >
          <Mail aria-hidden="true" />
        </Button>
      ) : null}
      {canEdit ? (
        lead.status === "archived" ? (
          <Button
            aria-label={`Restore ${lead.name}`}
            disabled={pending}
            onClick={() => run(() => restoreLead(lead.id))}
            size="icon"
            variant="ghost"
          >
            <RotateCcw aria-hidden="true" />
          </Button>
        ) : (
          <Button
            aria-label={`Archive ${lead.name}`}
            disabled={pending}
            onClick={() => run(() => changeLeadStatus(lead.id, "archived"))}
            size="icon"
            variant="ghost"
          >
            <Archive aria-hidden="true" />
          </Button>
        )
      ) : null}
      {canDelete ? (
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogTrigger asChild>
            <Button
              aria-label={`Permanently delete ${lead.name}`}
              disabled={pending}
              size="icon"
              variant="ghost"
            >
              <Trash2 aria-hidden="true" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete lead permanently?</DialogTitle>
              <DialogDescription>
                This removes {lead.name}&apos;s inquiry and its status and email
                history. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setDeleteOpen(false)} variant="outline">
                Cancel
              </Button>
              <Button
                disabled={pending}
                onClick={() =>
                  run(async () => {
                    const result = await deleteLead(lead.id);
                    if (result.status === "success") setDeleteOpen(false);
                    return result;
                  })
                }
                variant="destructive"
              >
                Delete lead
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
function Detail({
  term,
  value,
}: {
  readonly term: string;
  readonly value: string;
}) {
  return (
    <div>
      <dt>{term}</dt>
      <dd>{value}</dd>
    </div>
  );
}
