import { itemVariants } from "@/constants/constants";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type PortfolioCarouselProps = {
  images: string[];
};

const PortfolioCarousel = ({ images }: PortfolioCarouselProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  // small screen: 20% to -80% large screen "20%" to "-55%"
  const x = useTransform(scrollYProgress, [0, 1], ["20%", "-80%"]);
  return (
    // Carousel
    <div className="h-[1000vh] lg:h-[500vh]">
      {/* Carousel Container */}
      <div className="h-dvh overflow-hidden sticky top-0 flex items-center justify-start">
        {/* Slides */}
        <motion.div
          variants={itemVariants}
          className="grid grid-flow-col auto-cols-auto gap-[3vw] py-8"
          style={{ x }}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 150 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="w-[100vw] lg:w-[50vw] aspect-video">
                <img src={image} alt="" className="size-full object-cover" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioCarousel;
