"use client";

import { useEffect, useState } from "react";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import type { AnalyticsDatum } from "@/lib/database/repositories/contact-leads-repository";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
);
interface Props {
  readonly monthly: readonly AnalyticsDatum[];
  readonly sources: readonly AnalyticsDatum[];
  readonly statuses: readonly AnalyticsDatum[];
}
const colors = [
  "#2563eb",
  "#7c3aed",
  "#0891b2",
  "#059669",
  "#ca8a04",
  "#dc2626",
  "#64748b",
];
export function CrmAnalyticsCharts({ monthly, sources, statuses }: Props) {
  const [reduced, setReduced] = useState(true);
  useEffect(
    () =>
      setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches),
    [],
  );
  const options = {
    animation: reduced ? (false as const) : undefined,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#94a3b8" }, position: "bottom" as const },
    },
    scales: {
      x: { ticks: { color: "#94a3b8" }, grid: { display: false } },
      y: {
        beginAtZero: true,
        ticks: { color: "#94a3b8", precision: 0 },
        grid: { color: "rgba(148,163,184,.15)" },
      },
    },
  };
  return (
    <>
      <Chart title="Lead status distribution">
        <Doughnut
          aria-label="Lead status distribution chart"
          data={{
            labels: statuses.map((item) => item.label),
            datasets: [
              {
                data: statuses.map((item) => item.value),
                backgroundColor: colors,
              },
            ],
          }}
          options={{ ...options, scales: undefined }}
          role="img"
        />
      </Chart>
      <Chart title="Monthly leads">
        <Line
          aria-label="Monthly lead totals chart"
          data={{
            labels: monthly.map((item) => item.label),
            datasets: [
              {
                label: "Leads",
                data: monthly.map((item) => item.value),
                borderColor: colors[0],
                backgroundColor: "rgba(37,99,235,.2)",
                tension: 0.35,
                fill: true,
              },
            ],
          }}
          options={options}
          role="img"
        />
      </Chart>
      <Chart title="Lead sources">
        <Bar
          aria-label="Lead sources chart"
          data={{
            labels: sources.map((item) => item.label),
            datasets: [
              {
                label: "Leads",
                data: sources.map((item) => item.value),
                backgroundColor: colors[2],
                borderRadius: 8,
              },
            ],
          }}
          options={options}
          role="img"
        />
      </Chart>
    </>
  );
}
function Chart({
  children,
  title,
}: {
  readonly children: React.ReactNode;
  readonly title: string;
}) {
  return (
    <article>
      <h2>{title}</h2>
      <div style={{ height: 300 }}>{children}</div>
    </article>
  );
}
