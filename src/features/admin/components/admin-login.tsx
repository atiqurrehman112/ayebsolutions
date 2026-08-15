import {
  ArrowLeft,
  KeyRound,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import { signIn } from "@/lib/auth/auth";
import { AuthFeedback } from "./auth-feedback";
import styles from "./admin-login.module.css";

const controlClass =
  "focus-ring h-12 w-full rounded-md border border-input bg-background px-11 pr-3 text-sm text-foreground shadow-xs placeholder:text-muted-foreground";

interface AdminLoginProps {
  readonly error?: string;
}

function AdminLogin({ error }: AdminLoginProps) {
  return (
    <div className={styles.page}>
      <section
        aria-labelledby="admin-login-title"
        className={styles.loginPanel}
      >
        <div className="max-w-xl">
          <Badge variant="outline">Protected administration</Badge>
          <h1
            id="admin-login-title"
            className="mt-6 text-balance text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.98] tracking-tight"
          >
            Secure access to the Ayeb workspace.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Sign in with an authorized Supabase account. Sessions are managed
            with secure cookies and every administration route is protected.
          </p>
          <div className={styles.notice} role="note">
            <ShieldCheck className="size-5 shrink-0" aria-hidden="true" />
            <div>
              <strong>Authentication is active.</strong>
              <p>
                Access is limited to provisioned accounts. Registration is not
                available from this website.
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
                Sign in
              </h2>
            </div>
            <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground">
              <KeyRound className="size-5" aria-hidden="true" />
            </span>
          </div>

          <form action={signIn} className="mt-7">
            {error ? (
              <AuthFeedback
                variant="error"
                title={
                  error === "configuration"
                    ? "Authentication is not configured"
                    : error === "access"
                      ? "Admin access is not active"
                      : "Sign in was unsuccessful"
                }
              >
                {error === "configuration"
                  ? "Add the required Supabase environment variables before signing in."
                  : error === "access"
                    ? "Ask an administrator to activate your CMS profile before signing in."
                    : "Check your email and password, then try again."}
              </AuthFeedback>
            ) : null}
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
                    required
                    autoComplete="username"
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
                    required
                    autoComplete="current-password"
                    className={controlClass}
                  />
                </div>
              </div>
            </div>
            <Button type="submit" size="lg" className="mt-7 h-12 w-full">
              Sign In
            </Button>
            <button type="button" disabled className={styles.forgotPassword}>
              Forgot Password <span>Coming later</span>
            </button>
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
