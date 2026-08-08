import type { Metadata } from "next";

import { company } from "@/config/company";
import { BlogPage } from "@/features/blog";

const title = "Insights & Resources | Ayeb Solutions";
const description =
  "Explore internal editorial previews about web development, AI automation, custom SaaS, UI/UX, API integration, and responsible digital growth.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    title,
    description,
    siteName: company.name,
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function BlogRoute() {
  return <BlogPage />;
}
