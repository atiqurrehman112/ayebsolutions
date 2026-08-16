import type { Metadata } from "next";

import { CrmAnalyticsDashboard } from "@/features/admin/components/crm-analytics-dashboard";
import { requireAdmin } from "@/lib/auth/auth";
import { createDatabaseClient } from "@/lib/database";
import { ContactLeadsRepository } from "@/lib/database/repositories/contact-leads-repository";

export const metadata: Metadata = {
  title: "CRM Analytics",
  description: "Contact lead performance and communication analytics.",
  robots: { follow: false, index: false },
};

interface Props {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}
const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;
export default async function CrmAnalyticsRoute({ searchParams }: Props) {
  const [user, params, client] = await Promise.all([
    requireAdmin(),
    searchParams,
    createDatabaseClient(),
  ]);
  const period = first(params.period) ?? "30";
  const to = new Date();
  const customFrom = first(params.from);
  const customTo = first(params.to);
  const days =
    period === "today"
      ? 1
      : ["7", "30", "90"].includes(period)
        ? Number(period)
        : 30;
  const from =
    period === "custom" && customFrom
      ? new Date(`${customFrom}T00:00:00.000Z`)
      : new Date(to.getTime() - days * 86_400_000);
  const rangeTo =
    period === "custom" && customTo
      ? new Date(`${customTo}T23:59:59.999Z`)
      : to;
  const analytics = await new ContactLeadsRepository(
    client,
  ).getDashboardAnalytics(from.toISOString(), rangeTo.toISOString());
  return (
    <CrmAnalyticsDashboard
      analytics={analytics}
      canUpdate={user.role !== "viewer"}
      from={from.toISOString()}
      period={period}
      to={rangeTo.toISOString()}
    />
  );
}
