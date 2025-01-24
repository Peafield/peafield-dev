import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { clearInterval } from "timers";
import CarouselSlide from "./CarouselSlide";

const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};
type CarouselProps = {
  images: string[];
};

const Carousel = ({ images }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const dragX = useMotionValue(0);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && currentIndex < images.length - 1) {
      setCurrentIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && currentIndex > 0) {
      setCurrentIndex((pv) => pv - 1);
    }
  };

  return (
    <div className="overflow-hidden p-4 lg:p-16">
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `calc(-${currentIndex * 70}% + 10%)`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex gap-x-4 cursor-grab items-center active:cursor-grabbing lg:w-1/2"
      >
        {/* Slides */}
        {images.map((imageSrc, index) => (
          <CarouselSlide
            key={index}
            image={imageSrc}
            imgIndex={index}
            currentIndex={currentIndex}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Carousel;
