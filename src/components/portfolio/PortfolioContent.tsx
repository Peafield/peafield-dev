import { itemVariants } from "@/constants/constants";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type PortfolioContentProps = {
  children: ReactNode;
};
const PortfolioContent = ({ children }: PortfolioContentProps) => {
  return (
    <motion.div
      variants={itemVariants}
      className="md:grid md:grid-flow-row md:auto-row-auto md:gap-4 xl:grid-flow-col xl:auto-cols-auto"
    >
      {children}
    </motion.div>
  );
};

export default PortfolioContent;
