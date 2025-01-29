import { motion } from "framer-motion";
import YarnLogo from "../svgs/yarn/YarnLogo";
import YarnSnail from "../svgs/yarn/YarnSnail";

const YarnHeader = () => {
  return (
    <div className="flex items-center overflow-x-hidden">
      <motion.div
        whileHover={{
          scale: 0.9,
          transition: { duration: 1 },
        }}
        whileTap={{ scale: 0.9 }}
      >
        <YarnLogo className="h-8 w-auto" />
      </motion.div>
      <motion.div
        initial={{ x: "-20%", opacity: 0 }}
        animate={{
          x: "100vw",
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <YarnSnail className="h-8 w-auto" />
      </motion.div>
    </div>
  );
};
export default YarnHeader;
