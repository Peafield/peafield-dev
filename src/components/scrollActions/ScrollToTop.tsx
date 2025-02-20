import { motion } from "framer-motion";
import { RiArrowUpDoubleLine } from "react-icons/ri";

const ScrollToTop = () => {
  const scrollToTop = () => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <motion.button
      onClick={scrollToTop}
      type="button"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { duration: 0.6 } }}
      exit={{ y: 100, opacity: 0, transition: { duration: 0.6 } }}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 1 }}
      className="fixed z-50 bottom-4 right-4 flex justify-center animate-bounce"
    >
      <RiArrowUpDoubleLine className="size-12" />
    </motion.button>
  );
};

export default ScrollToTop;
