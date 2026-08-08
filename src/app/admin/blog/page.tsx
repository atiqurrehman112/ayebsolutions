import type { Metadata } from "next";

import { AdminBlog } from "@/features/admin";

export const metadata: Metadata = {
  title: "Blog Management",
  description: "Static blog management CMS preview for Ayeb Solutions.",
  robots: { index: false, follow: false },
};

export default function AdminBlogRoute() {
  return <AdminBlog />;
}
