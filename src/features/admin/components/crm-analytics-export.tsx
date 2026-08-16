"use client";

import { Download, FileSpreadsheet, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CrmAnalytics } from "@/lib/database/repositories/contact-leads-repository";

export function CrmAnalyticsExport({
  analytics,
}: {
  readonly analytics: CrmAnalytics;
}) {
  const rows = Object.entries(analytics.statistics).map(([metric, value]) => [
    metric,
    value ?? "Not tracked",
  ]);
  const download = (content: string, type: string, extension: string) => {
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(new Blob([content], { type }));
    anchor.download = `crm-summary.${extension}`;
    anchor.click();
    URL.revokeObjectURL(anchor.href);
  };
  return (
    <div aria-label="Export analytics" role="group">
      <Button
        onClick={() =>
          download(
            ["Metric,Value", ...rows.map((row) => row.join(","))].join("\n"),
            "text/csv",
            "csv",
          )
        }
        size="sm"
        type="button"
        variant="outline"
      >
        <Download aria-hidden="true" />
        CSV
      </Button>
      <Button
        onClick={() =>
          download(
            `<table>${rows.map(([key, value]) => `<tr><td>${key}</td><td>${value}</td></tr>`).join("")}</table>`,
            "application/vnd.ms-excel",
            "xls",
          )
        }
        size="sm"
        type="button"
        variant="outline"
      >
        <FileSpreadsheet aria-hidden="true" />
        Excel
      </Button>
      <Button
        onClick={() => window.print()}
        size="sm"
        type="button"
        variant="outline"
      >
        <Printer aria-hidden="true" />
        PDF summary
      </Button>
    </div>
  );
}
