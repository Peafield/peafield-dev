import { AnimatePresence, motion } from "framer-motion";
import ImageDescription from "../portfolio/ImageDescription";

type PortfolioCarouselSlideProps = {
  image: { src: string; description: string };
};

const PortfolioCarouselSlide = ({ image }: PortfolioCarouselSlideProps) => {
  return (
    <li className="w-[100vw] h-[100vh] p-4 flex flex-none flex-col items-center justify-center">
      <AnimatePresence>
        <motion.figure
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          exit={{ opacity: 0, y: 150 }}
          className="size-full flex flex-col items-center justify-center"
        >
          <div className="relative">
            <img
              className="aspect-3/2 object-cover rounded-lg shadow-lg dark:shadow-none"
              src={image.src}
              alt={image.description}
            />
            <ImageDescription description={image.description} />
          </div>
        </motion.figure>
      </AnimatePresence>
    </li>
  );
};

export default PortfolioCarouselSlide;
