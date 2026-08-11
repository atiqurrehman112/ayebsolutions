import type { Metadata } from "next";

import { AboutPage } from "@/features/about";
import { company } from "@/config/company";

const title = "About Ayeb Solutions";
const description =
  "Learn how Ayeb Solutions approaches modern software, thoughtful design, AI automation, accessibility, and maintainable digital product development.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "/about",
    title,
    description,
    siteName: company.name,
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function AboutRoute() {
  return <AboutPage heroMedia={null} />;
}
