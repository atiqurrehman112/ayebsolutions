"use client";

import {
  Bot,
  ChevronDown,
  Code2,
  LifeBuoy,
  Network,
  Palette,
  PanelsTopLeft,
  Sparkles,
} from "lucide-react";
import { useActionState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { initialContactFormState } from "@/lib/actions/action-states";
import { submitContactForm } from "@/lib/actions/contact";
import { cn } from "@/lib/utils";
import styles from "./contact-page.module.css";

const controlClass =
  "focus-ring w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-xs placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50";
const choices = [
  ["web-development", "Web Development", Code2],
  ["custom-saas", "Custom SaaS", PanelsTopLeft],
  ["ai-automation", "AI Automation", Bot],
  ["ui-ux-design", "UI/UX Design", Palette],
  ["api-integration", "API Integration", Network],
  ["maintenance", "Maintenance", LifeBuoy],
  ["other", "Other", Sparkles],
] as const;

function ErrorText({
  errors,
  id,
}: {
  readonly errors?: readonly string[];
  readonly id: string;
}) {
  if (!errors?.length) return null;
  return (
    <p id={id} className="text-xs font-medium text-destructive">
      {errors[0]}
    </p>
  );
}

function Field({
  autoComplete,
  description,
  errors,
  id,
  label,
  required,
  type = "text",
}: {
  readonly autoComplete?: string;
  readonly description: string;
  readonly errors?: readonly string[];
  readonly id: string;
  readonly label: string;
  readonly required?: boolean;
  readonly type?: "email" | "tel" | "text";
}) {
  const errorId = `${id}-error`;
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium leading-none">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        maxLength={id === "phone" ? 25 : id === "email" ? 320 : 160}
        autoComplete={autoComplete}
        aria-invalid={errors?.length ? true : undefined}
        aria-describedby={`${id}-description${errors?.length ? ` ${errorId}` : ""}`}
        className={cn("h-11", controlClass)}
      />
      <p
        id={`${id}-description`}
        className="text-xs leading-5 text-muted-foreground"
      >
        {description}
      </p>
      <ErrorText errors={errors} id={errorId} />
    </div>
  );
}

function SelectField({
  description,
  errors,
  id,
  label,
  options,
  required,
}: {
  readonly description: string;
  readonly errors?: readonly string[];
  readonly id: string;
  readonly label: string;
  readonly options: readonly string[];
  readonly required?: boolean;
}) {
  const errorId = `${id}-error`;
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium leading-none">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          required={required}
          defaultValue=""
          aria-invalid={errors?.length ? true : undefined}
          aria-describedby={`${id}-description${errors?.length ? ` ${errorId}` : ""}`}
          className={cn("h-11 appearance-none pr-10", controlClass)}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
      <p
        id={`${id}-description`}
        className="text-xs leading-5 text-muted-foreground"
      >
        {description}
      </p>
      <ErrorText errors={errors} id={errorId} />
    </div>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(
    submitContactForm,
    initialContactFormState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "idle") return;
    if (state.status === "success") formRef.current?.reset();
    statusRef.current?.focus();
  }, [state]);

  return (
    <form
      ref={formRef}
      action={action}
      className={cn(
        "rounded-2xl border bg-card p-5 sm:p-7 lg:p-9",
        styles.formPanel,
      )}
      noValidate
    >
      <div
        ref={statusRef}
        role={state.status === "error" ? "alert" : "status"}
        tabIndex={-1}
        className={cn(
          "mb-7 rounded-xl border p-4 text-sm leading-6 outline-none focus-visible:ring-2 focus-visible:ring-ring",
          state.status === "idle" && "bg-muted/30 text-muted-foreground",
          state.status === "success" &&
            "border-emerald-600/30 bg-emerald-500/10 text-foreground",
          state.status === "error" &&
            "border-destructive/35 bg-destructive/10 text-foreground",
        )}
      >
        {state.status === "idle"
          ? "Required fields are marked with an asterisk. Your details are used only to review and respond to this inquiry."
          : state.message}
      </div>

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <fieldset disabled={pending}>
        <legend className="text-xl font-semibold">Project details</legend>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Share enough context for a useful review. Do not include passwords,
          credentials, or regulated personal data.
        </p>
        <div className="mt-7 grid gap-6 sm:grid-cols-2">
          <Field
            id="name"
            label="Name"
            description="The person we should contact."
            autoComplete="name"
            required
            errors={state.fieldErrors?.name}
          />
          <Field
            id="email"
            label="Email"
            description="Where we can respond to the inquiry."
            type="email"
            autoComplete="email"
            required
            errors={state.fieldErrors?.email}
          />
          <Field
            id="company"
            label="Company"
            description="Optional business or product context."
            autoComplete="organization"
            errors={state.fieldErrors?.company}
          />
          <Field
            id="phone"
            label="Phone"
            description="Optional; include country code when relevant."
            type="tel"
            autoComplete="tel"
            errors={state.fieldErrors?.phone}
          />
          <SelectField
            id="service"
            label="Service"
            description="Choose the closest area; scope can change after discovery."
            required
            errors={state.fieldErrors?.service}
            options={choices.map(([, label]) => label)}
          />
          <SelectField
            id="budget"
            label="Budget"
            description="Optional context that helps shape appropriate options."
            errors={state.fieldErrors?.budget}
            options={[
              "Need scope guidance",
              "Budget range is defined",
              "Exploring feasibility",
              "Internal approval pending",
            ]}
          />
          <SelectField
            id="timeline"
            label="Timeline"
            description="A target date does not create a delivery commitment."
            errors={state.fieldErrors?.timeline}
            options={[
              "No target yet",
              "Target date in mind",
              "Flexible timing",
              "Time constraint to discuss",
            ]}
          />
        </div>
        <div className="mt-6 grid gap-2">
          <label htmlFor="message" className="text-sm font-medium leading-none">
            Message <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={7}
            required
            minLength={20}
            maxLength={5000}
            aria-invalid={state.fieldErrors?.message?.length ? true : undefined}
            aria-describedby={`message-description${state.fieldErrors?.message?.length ? " message-error" : ""}`}
            className={cn("min-h-32 resize-y py-3", controlClass)}
          />
          <p
            id="message-description"
            className="text-xs leading-5 text-muted-foreground"
          >
            Describe the problem, users, current workflow, constraints, and
            desired change.
          </p>
          <ErrorText errors={state.fieldErrors?.message} id="message-error" />
        </div>

        <fieldset className="mt-9 border-t pt-8">
          <legend className="text-xl font-semibold">
            Services Interested In
          </legend>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            These optional selections add context without fixing project scope.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {choices.map(([id, label, Icon]) => (
              <div key={id}>
                <input
                  id={`interest-${id}`}
                  name="interests"
                  value={label}
                  type="checkbox"
                  className="peer sr-only"
                />
                <label
                  htmlFor={`interest-${id}`}
                  className={cn(
                    "flex min-h-20 cursor-pointer items-center gap-3 rounded-xl border bg-background p-4 transition-colors hover:border-foreground/25 peer-checked:border-primary peer-checked:bg-primary/5 peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
                    styles.serviceChoice,
                  )}
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold">{label}</span>
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        <div className="mt-8 rounded-xl border bg-muted/25 p-4">
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-6">
            <input
              name="consent"
              type="checkbox"
              required
              className="focus-ring mt-1 size-4 shrink-0 rounded border-input"
              aria-describedby="consent-description consent-error"
            />
            <span id="consent-description">
              I consent to Ayeb Solutions storing and using these details to
              review and respond to my inquiry.{" "}
              <span aria-hidden="true">*</span>
            </span>
          </label>
          <ErrorText errors={state.fieldErrors?.consent} id="consent-error" />
        </div>

        <div className="mt-8 border-t pt-7">
          <Button
            type="submit"
            size="lg"
            className="h-12 w-full sm:w-auto"
            disabled={pending}
          >
            {pending ? "Sending securely…" : "Send Project Inquiry"}
          </Button>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            Protected by server-side validation, submission throttling,
            duplicate detection, and a hidden spam trap.
          </p>
        </div>
      </fieldset>
    </form>
  );
}
