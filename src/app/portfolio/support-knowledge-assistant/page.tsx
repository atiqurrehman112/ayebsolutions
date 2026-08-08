import {
  getPortfolioProject,
  getPortfolioProjectMetadata,
  PortfolioProjectPage,
} from "@/features/portfolio";

const slug = "support-knowledge-assistant" as const;
export const metadata = getPortfolioProjectMetadata(slug);

export default function SupportKnowledgeAssistantRoute() {
  return <PortfolioProjectPage project={getPortfolioProject(slug)} />;
}
