import {
  getPortfolioProject,
  getPortfolioProjectMetadata,
  PortfolioProjectPage,
} from "@/features/portfolio";

const slug = "ai-lead-routing-workflow" as const;
export const metadata = getPortfolioProjectMetadata(slug);

export default function AiLeadRoutingWorkflowRoute() {
  return <PortfolioProjectPage project={getPortfolioProject(slug)} />;
}
