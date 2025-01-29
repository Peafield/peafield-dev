"use client";

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
      className="relative flex flex-col items-center h-full py-4 md:pt-16 md:pb-0 md:gap-y-16"
    >
      {children}
    </motion.div>
  );
};

export default PortfolioSection;
