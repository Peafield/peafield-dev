"use client";

import { PortfolioItem } from "@/types/portfolio";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import ScrollToBottom from "../scrollActions/ScrollToBottom";
import ScrollToTop from "../scrollActions/ScrollToTop";
import BackToCardsButton from "../buttons/BackToCardsButton";
import PortfolioCarousel from "./PortfolioCarousel";
import PortfolioFooter from "./PortfolioFooter";
import PortfolioHeader from "./PortfolioHeader";

type PortfolioItemSectionsProps = {
  portfolioItem: PortfolioItem;
};

const PortfolioItemSections = ({
  portfolioItem,
}: PortfolioItemSectionsProps) => {
  const [showHiddenButtons, setShowHiddenButtons] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  const numItems = portfolioItem.image.images.length;
  const vw = typeof window !== "undefined" ? window.innerWidth : 0;
  const xRange = -((numItems - 1) * vw);
  const x = useTransform(scrollYProgress, [0, 1], [0, xRange]);
  const scaleX = useSpring(scrollYProgress);
  useMotionValueEvent(scrollYProgress, "change", (currentY) => {
    setShowHiddenButtons(currentY > 0.5);
    setShowProgressBar(currentY !== 1);
  });

  return (
    <>
      {/* Portfolio */}
      <article className="relative w-[98vw]">
        <AnimatePresence>
          {showHiddenButtons && (
            <>
              <BackToCardsButton /> <ScrollToTop />
            </>
          )}
        </AnimatePresence>
        <PortfolioHeader item={portfolioItem} />
        <ScrollToBottom />

        {/* Portfolio Carousel Container */}
        <section ref={scrollContainerRef} className="h-[500vh] ">
          <PortfolioCarousel x={x} images={portfolioItem.image.images} />
        </section>
        <PortfolioFooter portfolioItem={portfolioItem} />
      </article>
      {/* Portfolio Progress Bar */}
      {showProgressBar && (
        <motion.div
          className="fixed left-0 right-0 h-2 bg-terminal bottom-12 translate-x-0"
          style={{ scaleX }}
        />
      )}
    </>
  );
};
export default PortfolioItemSections;
