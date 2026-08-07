import { SearchX } from "lucide-react";
import type { Metadata } from "next";

import { SystemState } from "@/components/shell/system-state";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <SystemState
      code="404"
      title="This page could not be found"
      description="The address may have changed, or the page may no longer be available. Use the navigation to continue exploring Ayeb Solutions."
      icon={<SearchX className="size-7" aria-hidden="true" />}
    />
  );
}
