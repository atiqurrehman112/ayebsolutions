import Link from "next/link";
import {
  ArrowLeft,
  CalendarClock,
  CircleDollarSign,
  Mail,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/status";
import { Button } from "@/components/ui/button";
import type { CrmAnalytics } from "@/lib/database/repositories/contact-leads-repository";
import { CrmAnalyticsCharts } from "./crm-analytics-charts";
import { CrmAnalyticsExport } from "./crm-analytics-export";
import styles from "./crm-analytics-dashboard.module.css";

interface Props {
  readonly analytics: CrmAnalytics;
  readonly canUpdate: boolean;
  readonly from: string;
  readonly period: string;
  readonly to: string;
}
const format = (value: number | null, suffix = "") =>
  value === null
    ? "Not tracked"
    : `${value.toFixed(value % 1 ? 1 : 0)}${suffix}`;
export function CrmAnalyticsDashboard({
  analytics,
  canUpdate,
  from,
  period,
  to,
}: Props) {
  const stats = [
    ["Total leads", analytics.statistics.total],
    ["New leads", analytics.statistics.new],
    ["Active leads", analytics.statistics.active],
    ["Won leads", analytics.statistics.won],
    ["Lost leads", analytics.statistics.lost],
    ["Archived", analytics.statistics.archived],
    ["Emails sent", analytics.statistics.emailsSent],
    ["Pending follow-ups", analytics.statistics.pendingFollowUps],
    ["Today's follow-ups", analytics.statistics.todaysFollowUps],
  ] as const;
  const kpis = [
    ["Average response", format(analytics.kpis.averageResponseHours, "h")],
    ["Average close", format(analytics.kpis.averageCloseHours, "h")],
    ["Win rate", format(analytics.kpis.winRate, "%")],
    ["Conversion rate", format(analytics.kpis.conversionRate, "%")],
    ["Reply rate", format(analytics.kpis.replyRate, "%")],
  ] as const;
  const funnel = [
    ["New", analytics.statistics.new],
    [
      "Qualified",
      (analytics.statusDistribution.find((item) => item.label === "read")
        ?.value ?? 0) +
        (analytics.statusDistribution.find(
          (item) => item.label === "in progress",
        )?.value ?? 0),
    ],
    [
      "Proposal",
      analytics.statusDistribution.find((item) => item.label === "replied")
        ?.value ?? 0,
    ],
    ["Won", analytics.statistics.won],
  ] as const;
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div>
          <Badge variant="secondary">CRM intelligence</Badge>
          <h1>Lead Analytics Dashboard</h1>
          <p>
            Track pipeline health, communication performance, follow-up
            readiness, and conversion signals from one accountable view.
          </p>
        </div>
        <div className={styles.actions}>
          <Button asChild variant="outline">
            <Link href="/admin/contact-leads">
              <ArrowLeft aria-hidden="true" />
              Lead inbox
            </Link>
          </Button>
          <CrmAnalyticsExport analytics={analytics} />
        </div>
      </header>
      <form className={styles.filters} method="get">
        <fieldset>
          <legend>Reporting range</legend>
          {[
            ["today", "Today"],
            ["7", "Last 7 days"],
            ["30", "30 days"],
            ["90", "90 days"],
            ["custom", "Custom"],
          ].map(([value, label]) => (
            <label key={value}>
              <input
                defaultChecked={period === value}
                name="period"
                type="radio"
                value={value}
              />
              {label}
            </label>
          ))}
        </fieldset>
        <label>
          From
          <input defaultValue={from.slice(0, 10)} name="from" type="date" />
        </label>
        <label>
          To
          <input defaultValue={to.slice(0, 10)} name="to" type="date" />
        </label>
        <Button type="submit">Apply</Button>
      </form>
      <section aria-label="CRM summary" className={styles.stats}>
        {stats.map(([label, value]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
        <article>
          <span>This month revenue</span>
          <strong>
            {analytics.statistics.estimatedRevenue === null
              ? "Not tracked"
              : analytics.statistics.estimatedRevenue}
          </strong>
          <small>Revenue requires a numeric closed-value field.</small>
        </article>
      </section>
      <section aria-label="CRM charts" className={styles.charts}>
        <CrmAnalyticsCharts
          monthly={analytics.monthlyLeads}
          sources={analytics.leadSources}
          statuses={analytics.statusDistribution}
        />
      </section>
      <section className={styles.split}>
        <article className={styles.panel}>
          <h2>Sales funnel</h2>
          <ol className={styles.funnel}>
            {funnel.map(([label, value], index) => (
              <li key={label} style={{ width: `${100 - index * 12}%` }}>
                <span>{label}</span>
                <strong>{value}</strong>
              </li>
            ))}
          </ol>
        </article>
        <article className={styles.panel}>
          <h2>Follow-up radar</h2>
          <div className={styles.widgetGrid}>
            {Object.entries(analytics.followUps).map(([label, value]) => (
              <div key={label}>
                <CalendarClock aria-hidden="true" />
                <span>{label.replace(/([A-Z])/g, " $1")}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </article>
      </section>
      <section aria-label="Key performance indicators" className={styles.kpis}>
        {kpis.map(([label, value]) => (
          <article key={label}>
            <TrendingUp aria-hidden="true" />
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </section>
      <section className={styles.split}>
        <article className={styles.panel}>
          <h2>Recent activity</h2>
          {analytics.activity.length ? (
            <ol className={styles.timeline}>
              {analytics.activity.map((item) => (
                <li key={`${item.kind}-${item.id}`}>
                  <span aria-hidden="true" />
                  <div>
                    <strong>{item.label}</strong>
                    <time dateTime={item.occurred_at}>
                      {new Date(item.occurred_at).toLocaleString()}
                    </time>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p>No activity exists in this reporting range.</p>
          )}
        </article>
        <article className={styles.panel}>
          <h2>Smart signals</h2>
          <dl className={styles.signals}>
            <Signal
              icon={Users}
              term="Newest lead"
              value={analytics.smart.newestLead?.name ?? "No lead"}
            />
            <Signal
              icon={CircleDollarSign}
              term="Biggest budget"
              value={
                analytics.smart.biggestBudget
                  ? `${analytics.smart.biggestBudget.name} · ${analytics.smart.biggestBudget.budget_range}`
                  : "No budget supplied"
              }
            />
            <Signal
              icon={Target}
              term="Most requested service"
              value={analytics.smart.mostRequestedService?.label ?? "No data"}
            />
            <Signal
              icon={Mail}
              term="Highest priority"
              value={analytics.smart.highestPriorityLead?.name ?? "No lead"}
            />
            <Signal
              icon={CalendarClock}
              term="Longest inactive"
              value={analytics.smart.longestInactiveLead?.name ?? "No lead"}
            />
          </dl>
        </article>
      </section>
      {analytics.leaderboard.length > 1 ? (
        <section className={styles.panel}>
          <h2>Team leaderboard</h2>
          <div className={styles.tableWrap}>
            <table>
              <caption>
                Lead ownership and outcomes by active administrator or editor
              </caption>
              <thead>
                <tr>
                  <th>Team member</th>
                  <th>Leads handled</th>
                  <th>Won</th>
                  <th>Response time</th>
                </tr>
              </thead>
              <tbody>
                {analytics.leaderboard.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">{item.name}</th>
                    <td>{item.leads_handled}</td>
                    <td>{item.won}</td>
                    <td>{format(item.response_hours, "h")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
      {!canUpdate ? (
        <p className={styles.notice}>
          Viewer access is read only. Analytics remain fully available.
        </p>
      ) : null}
    </main>
  );
}
function Signal({
  icon: Icon,
  term,
  value,
}: {
  readonly icon: typeof Users;
  readonly term: string;
  readonly value: string;
}) {
  return (
    <div>
      <dt>
        <Icon aria-hidden="true" />
        {term}
      </dt>
      <dd>{value}</dd>
    </div>
  );
}
