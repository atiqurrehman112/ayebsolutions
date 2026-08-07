import { WifiOff } from "lucide-react";
import type { Metadata } from "next";

import { SystemState } from "@/components/shell/system-state";

export const metadata: Metadata = {
  title: "You are offline",
  description:
    "Ayeb Solutions is currently unavailable because this device is offline.",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <SystemState
      title="You appear to be offline"
      description="Check your internet connection and try loading the page again. The Ayeb Solutions experience will be available when your connection returns."
      icon={<WifiOff className="size-7" aria-hidden="true" />}
    />
  );
}
