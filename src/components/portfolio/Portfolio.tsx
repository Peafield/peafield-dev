"use client";

import { useUiStore } from "@/store/ui";
import PortfolioCardsSection from "./PortfolioCardsSection";
import PortfolioItemSections from "./PortfolioItemsSections";

// TODO: FIX ERROR WITH REFRESH!!
const Portfolio = () => {
  const { isCardClicked, clickedCard } = useUiStore();
  return (
    <>
      {!isCardClicked ? (
        <PortfolioCardsSection />
      ) : (
        <PortfolioItemSections portfolioItem={clickedCard} />
      )}
    </>
  );
};
export default Portfolio;
