import { motion, MotionValue } from "framer-motion";

type PortfolioCarouselProps = {
  x: MotionValue<number>;
};

const PortfolioCarousel = ({ x }: PortfolioCarouselProps) => {
  return (
    <div className="sticky top-0 overflow-hidden h-[100vh]">
      {/* Portfolio Img group */}
      <motion.ul style={{ x }} className="flex">
        {/* Portfolio Img Container  */}
        <li className="w-[100vw] h-[100vh] flex flex-none flex-col items-center justify-center">
          <img className="w-96 h-80" src="/portfolio/yarn1.webp" alt="yarn" />
          <h3>Yarn</h3>
        </li>
        <li className="w-[100vw] h-[100vh] flex flex-none flex-col items-center justify-center">
          <img className="w-96 h-80" src="/portfolio/yarn2.webp" alt="yarn" />
          <h3>Yarn</h3>
        </li>
        <li className="w-[100vw] h-[100vh] flex flex-none flex-col items-center justify-center">
          <img className="w-96 h-80" src="/portfolio/yarn3.webp" alt="yarn" />
          <h3>Yarn</h3>
        </li>
        <li className="w-[100vw] h-[100vh] flex flex-none flex-col items-center justify-center">
          <img className="w-96 h-80" src="/portfolio/yarn4.webp" alt="yarn" />
          <h3>Yarn</h3>
        </li>
      </motion.ul>
    </div>
  );
};
export default PortfolioCarousel;
