import { motion } from "framer-motion";
import YarnLogo from "../svgs/yarn/YarnLogo";
import YarnSnail from "../svgs/yarn/YarnSnail";

const YarnHeader = () => {
  return (
    <motion.div
      whileHover={{
        scale: 0.9,
        transition: { duration: 1 },
      }}
      whileTap={{ scale: 0.9 }}
    >
      <YarnLogo className="h-8 md:h-16 w-auto" />
    </motion.div>
  );
};
export default YarnHeader;
