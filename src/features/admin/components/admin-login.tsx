import {
  ArrowLeft,
  KeyRound,
  LockKeyhole,
  Mail,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/status";
import { Button } from "@/components/ui/button";
import styles from "./admin-login.module.css";

const controlClass =
  "focus-ring h-12 w-full rounded-md border border-input bg-background px-11 pr-3 text-sm text-foreground shadow-xs placeholder:text-muted-foreground";

function AdminLogin() {
  return (
    <div className={styles.page}>
      <section
        aria-labelledby="admin-login-title"
        className={styles.loginPanel}
      >
        <div className="max-w-xl">
          <Badge variant="outline">Static authentication preview</Badge>
          <h1
            id="admin-login-title"
            className="mt-6 text-balance text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.98] tracking-tight"
          >
            A deliberate entry point for future administration.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            The interface establishes accessible authentication structure
            without accepting credentials, creating a session, or implying that
            the admin area is protected.
          </p>
          <div className={styles.notice} role="note">
            <ShieldAlert className="size-5 shrink-0" aria-hidden="true" />
            <div>
              <strong>
                Authentication will be implemented in a later sprint.
              </strong>
              <p>
                Do not enter real credentials. This page has no authentication,
                submission, validation, API, storage, cookie, or session
                behavior.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.formCard}>
          <div className="flex items-center justify-between gap-4 border-b pb-5">
            <div>
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
                Admin access
              </span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                Sign in preview
              </h2>
            </div>
            <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground">
              <KeyRound className="size-5" aria-hidden="true" />
            </span>
          </div>

          <form aria-describedby="authentication-notice" className="mt-7">
            <p
              id="authentication-notice"
              className="text-sm leading-6 text-muted-foreground"
            >
              Fields are present for interface review only. Values remain in the
              browser and are not processed by Ayeb Solutions.
            </p>
            <div className="mt-6 grid gap-5">
              <div className="grid gap-2">
                <label htmlFor="admin-email" className="text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <input
                    id="admin-email"
                    name="email"
                    type="email"
                    autoComplete="username"
                    aria-describedby="authentication-notice"
                    className={controlClass}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="admin-password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole
                    className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <input
                    id="admin-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    aria-describedby="authentication-notice"
                    className={controlClass}
                  />
                </div>
              </div>
              <div className="flex items-start gap-3">
                <input
                  id="remember-admin"
                  name="remember"
                  type="checkbox"
                  className="focus-ring mt-0.5 size-4 rounded border-input accent-primary"
                />
                <label htmlFor="remember-admin" className="text-sm leading-6">
                  <span className="font-medium">Remember me</span>
                  <span className="block text-xs text-muted-foreground">
                    Visual preference only; nothing is persisted.
                  </span>
                </label>
              </div>
            </div>
            <Button
              type="button"
              size="lg"
              className="mt-7 h-12 w-full"
              aria-describedby="authentication-notice"
            >
              Login unavailable
            </Button>
            <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
              This control intentionally performs no action in Sprint 7A.
            </p>
          </form>

          <div className="mt-7 border-t pt-6">
            <Button asChild variant="outline" size="lg" className="h-12 w-full">
              <Link href="/">
                <ArrowLeft className="size-4" aria-hidden="true" />
                Back to Website
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export { AdminLogin };
