import { itemVariants } from "@/constants/constants";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type PortfolioSectionProps = {
  children: ReactNode;
};

const PortfolioSection = ({ children }: PortfolioSectionProps) => {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col items-center justify-center h-screen"
    >
      {children}
    </motion.div>
  );
};

export default PortfolioSection;
