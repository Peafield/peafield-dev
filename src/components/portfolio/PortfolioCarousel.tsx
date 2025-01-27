"use client";

import { itemVariants } from "@/constants/constants";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import CarouselSlide from "./CarouselSlide";
import { useUiStore } from "@/store/ui";
import clsx from "clsx";
import { div } from "framer-motion/client";

type PortfolioCarouselProps = {
  images: string[];
};

const PortfolioCarousel = ({ images }: PortfolioCarouselProps) => {
  const { isMobile } = useUiStore();
  const outerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: outerRef,
    layoutEffect: false,
  });
  const [containerHeight, setContainerHeight] = useState(0);
  const [maxScrollDistance, setMaxScrollDistance] = useState(0);

  // Calculate dimensions only on desktop
  useEffect(() => {
    if (isMobile || !outerRef.current || !gridRef.current) return;

    const containerWidth = outerRef.current.offsetWidth;
    const contentWidth = gridRef.current.scrollWidth;
    const totalShift = contentWidth - containerWidth;
    const baseHeight = window.innerHeight;

    setContainerHeight(baseHeight * 2);
    setMaxScrollDistance(totalShift);
  }, [images, isMobile]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScrollDistance]);

  return (
    <div
      ref={outerRef}
      className="mb-16 sm:mb-8"
      style={{ height: isMobile ? "auto" : `${containerHeight}px` }}
    >
      {/* Sticky viewport container */}
      <div
        className={clsx("h-svh flex items-center", {
          "justify-center": isMobile,
          "sticky top-0 overflow-hidden justify-start": !isMobile,
        })}
      >
        <motion.div
          ref={gridRef}
          variants={itemVariants}
          className="grid grid-flow-row auto-rows-auto md:grid-flow-col md:auto-cols-[min(100vw,calc((100dvh-160px)*1.5))] gap-[3vw]"
          style={!isMobile ? { x } : undefined}
        >
          <AnimatePresence>
            {images.map((image, index) => (
              <CarouselSlide key={index} image={image} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioCarousel;
