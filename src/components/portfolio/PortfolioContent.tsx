import { itemVariants } from "@/constants/constants";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type PortfolioContentProps = {
  children: ReactNode;
};
const PortfolioContent = ({ children }: PortfolioContentProps) => {
  return (
    <motion.div variants={itemVariants} className="flex flex-col gap-y-4">
      {children}
    </motion.div>
  );
};

export default PortfolioContent;
