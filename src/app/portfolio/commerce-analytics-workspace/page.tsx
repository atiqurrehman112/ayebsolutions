import {
  getPortfolioProject,
  getPortfolioProjectMetadata,
  PortfolioProjectPage,
} from "@/features/portfolio";

const slug = "commerce-analytics-workspace" as const;
export const metadata = getPortfolioProjectMetadata(slug);

export default function CommerceAnalyticsWorkspaceRoute() {
  return <PortfolioProjectPage project={getPortfolioProject(slug)} />;
}
