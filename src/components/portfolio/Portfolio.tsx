"use client";

import { containerVariants } from "@/constants/constants";
import { portfolioItems } from "@/data/portfolio";
import { useUiStore } from "@/store/ui";
import clsx from "clsx";
import { motion } from "framer-motion";
import PortfolioCarousel from "./PortfolioCarousel";
import PortfolioContent from "./PortfolioContent";
import PortfolioContentItem from "./PortfolioContentItem";
import PortfolioSection from "./PortfolioSection";
import ScrollToBottom from "./ScrollToBottom";

const Portfolio = () => {
  const { isMobile } = useUiStore();
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {portfolioItems.map((item, index) => (
        <div
          key={index}
          className={clsx({
            "min-h-svh pb-4 mb-8": isMobile,
          })}
        >
          <PortfolioSection>
            <PortfolioContent>
              <PortfolioContentItem item={item} />
              {isMobile && <ScrollToBottom />}
            </PortfolioContent>
          </PortfolioSection>
          <PortfolioCarousel images={item.image.images} />
        </div>
      ))}
    </motion.div>
  );
};

export default Portfolio;
