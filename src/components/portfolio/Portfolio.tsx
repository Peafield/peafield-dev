"use client";

import { containerVariants } from "@/constants/constants";
import { motion } from "framer-motion";
import PortfolioSection from "./PortfolioSection";
import PortfolioContent from "./PortfolioContent";
import PortfolioCarousel from "./PortfolioCarousel";
import { RiScrollToBottomFill } from "react-icons/ri";
import PortfolioContentItem from "./PortfolioContentItem";
import { portfolioItems } from "@/data/portfolio";
import ScrollToBottom from "./ScrollToBottom";

const Portfolio = () => {
  // TODO: Add opaque background image of yarn
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {portfolioItems.map((item, index) => (
        <div key={index}>
          <PortfolioSection>
            <PortfolioContent>
              <PortfolioContentItem item={item} />
            </PortfolioContent>
            <ScrollToBottom />
          </PortfolioSection>
          <PortfolioCarousel images={item.images} />
        </div>
      ))}
    </motion.div>
  );
};

export default Portfolio;
