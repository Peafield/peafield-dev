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
      className="h-full md:h-[80%] md:grid md:grid-flow-col md:auto-cols-auto md:gap-4"
    >
      {children}
    </motion.div>
  );
};

export default PortfolioContent;
