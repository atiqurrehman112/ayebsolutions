import {
  getPortfolioProject,
  getPortfolioProjectMetadata,
  PortfolioProjectPage,
} from "@/features/portfolio";

const slug = "auction-marketplace-architecture" as const;
export const metadata = getPortfolioProjectMetadata(slug);

export default function AuctionMarketplaceArchitectureRoute() {
  return <PortfolioProjectPage project={getPortfolioProject(slug)} />;
}
