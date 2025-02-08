import { motion, MotionValue } from "framer-motion";
import PortfolioCarouselSlide from "./PortfolioCarouselSlide";

type PortfolioCarouselProps = {
  x: MotionValue<number>;
  images: { src: string; description: string }[];
};

const PortfolioCarousel = ({ x, images }: PortfolioCarouselProps) => {
  return (
    <div className="sticky top-0 overflow-hidden h-[100vh]">
      <motion.ul style={{ x }} className="flex">
        {images.map((image, index) => (
          <PortfolioCarouselSlide key={index} image={image} />
        ))}
      </motion.ul>
    </div>
  );
};
export default PortfolioCarousel;
