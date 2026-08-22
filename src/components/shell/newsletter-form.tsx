"use client";

import { ArrowRight } from "lucide-react";
import { useId, useState } from "react";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form-controls";

function NewsletterForm() {
  const inputId = useId();
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p
        role="status"
        className="rounded-lg border border-success/30 bg-success/10 p-3 text-sm"
      >
        Thank you for your interest in our updates.
      </p>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-2 sm:flex-row"
      aria-label="Newsletter signup"
    >
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>
      <Input
        id={inputId}
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@company.com"
        className="h-11 bg-background/90"
      />
      <Button type="submit" className="h-11 shrink-0">
        Subscribe
        <ArrowRight className="size-4" aria-hidden="true" />
      </Button>
    </form>
  );
}

export { NewsletterForm };
