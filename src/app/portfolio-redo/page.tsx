import PortfolioItemSections from "@/components/portfolio-redo/PortfolioItemsSections";
import { portfolioItems } from "@/data/portfolio";

export default function PortfolioPage() {
  return <PortfolioItemSections portfolioItem={portfolioItems[0]} />;
}
