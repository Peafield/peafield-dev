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
import { div, style } from "framer-motion/client";

type PortfolioCarouselProps = {
  images: { src: string; description: string }[];
};

const PortfolioCarousel = ({ images }: PortfolioCarouselProps) => {
  const { isMobile } = useUiStore();
  const outerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: outerRef });
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [maxScrollDistance, setMaxScrollDistance] = useState<number>(0);

  useEffect(() => {
    if (outerRef.current && gridRef.current) {
      const containerWidth = outerRef.current.offsetWidth;
      const contentWidth = gridRef.current.scrollWidth;
      const totalShift = contentWidth - containerWidth;
      const baseHeight = window.innerHeight;
      const scrollableOverflow = Math.min(totalShift, containerWidth);
      const newContainerHeight = baseHeight + Math.max(0, scrollableOverflow);
      setContainerHeight(Math.min(newContainerHeight, baseHeight * 2));
      setMaxScrollDistance(Math.max(0, totalShift));
    }
  }, [images]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScrollDistance]);
  return (
    <div
      style={{ height: !isMobile ? `${containerHeight}px` : "100%" }}
      ref={outerRef}
    >
      {/* Sticky viewport container */}
      <div
        className={clsx("flex items-center", {
          "h-dvh sticky top-0 overflow-hidden justify-start": !isMobile,
          "justify-center": isMobile,
        })}
      >
        <motion.div
          ref={gridRef}
          variants={itemVariants}
          className={clsx("grid gap-[3vw]", {
            "grid-flow-col auto-cols-auto": !isMobile,
            "h-full grid grid-flow-row auto-rows-auto ": isMobile,
          })}
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
