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

const Portfolio = () => {
  const containerRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);

  useEffect(() => {
    containerRefs.current = portfolioItems.map(
      (_, i) => containerRefs.current[i] ?? React.createRef<HTMLDivElement>()
    );
  }, [portfolioItems]);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {portfolioItems.map((item, index) => (
        <div
          key={index}
          className="min-h-svh md:min-h-[180vh] pb-4 mb-8"
          ref={containerRefs.current[index]}
        >
          <PortfolioSection>
            <PortfolioContent>
              <PortfolioContentItem item={item} />
              <ScrollToBottom />
            </PortfolioContent>
          </PortfolioSection>
          <PortfolioCarousel
            images={item.image.images}
            containerRef={containerRefs.current[index]!}
          />
        </div>
      ))}
    </motion.div>
  );
};

export default Portfolio;
