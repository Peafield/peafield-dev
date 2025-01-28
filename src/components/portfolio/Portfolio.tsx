"use client";

import { containerVariants } from "@/constants/constants";
import { portfolioItems } from "@/data/portfolio";
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import PortfolioCarousel from "./PortfolioCarousel";
import PortfolioContent from "./PortfolioContent";
import PortfolioContentItem from "./PortfolioContentItem";
import PortfolioSection from "./PortfolioSection";
import ScrollToBottom from "./ScrollToBottom";
import { useUiStore } from "@/store/ui";
import clsx from "clsx";

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
              <ScrollToBottom />
            </PortfolioContent>
          </PortfolioSection>
          <PortfolioCarousel images={item.image.images} />
        </div>
      ))}
    </motion.div>
  );
};

export default Portfolio;
