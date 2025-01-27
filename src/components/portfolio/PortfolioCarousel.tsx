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
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [maxScrollDistance, setMaxScrollDistance] = useState<number>(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !outerRef.current || !gridRef.current) return;

    if (isMobile) {
      // Mobile: Natural height, disable horizontal scroll
      setContainerHeight(0);
      setMaxScrollDistance(0);
    } else {
      // Desktop: Calculate for horizontal scroll
      const containerWidth = outerRef.current.offsetWidth;
      const contentWidth = gridRef.current.scrollWidth;
      const totalShift = contentWidth - containerWidth;
      const baseHeight = window.innerHeight;
      const scrollableOverflow = Math.min(totalShift, containerWidth);
      const newContainerHeight = baseHeight + Math.max(0, scrollableOverflow);
      setContainerHeight(Math.min(newContainerHeight, baseHeight * 2));
      setMaxScrollDistance(Math.max(0, totalShift));
    }
  }, [images, isMobile, isMounted]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScrollDistance]);

  if (!isMounted) return null;

  return (
    <div
      className="mb-8"
      style={{ height: isMobile ? "auto" : containerHeight || "100svh" }}
      ref={outerRef}
    >
      <div className="h-svh flex items-center justify-center md:h-dvh md:sticky md:top-0 md:overflow-hidden md:justify-start">
        <motion.div
          ref={gridRef}
          variants={itemVariants}
          className="grid grid-flow-row auto-rows-auto md:grid-flow-col md:auto-cols-[min(100vw,calc((100dvh-160px)*1.5))] gap-[2vw]"
          style={isMobile ? undefined : { x }}
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
