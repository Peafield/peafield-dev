import { itemVariants, containerVariants } from "@/constants/constants";
import { portfolioItems } from "@/data/portfolio";
import { motion } from "framer-motion";
import PortfolioCard from "./PortfolioCards";

const PortfolioCardsSection = () => {
  return (
    <section className="w-[98vw] ">
      <motion.div
        variants={itemVariants}
        className="prose dark:prose-invert m-auto p-8 md:py-8 md:px-0"
      >
        <h1 className="font-openSans font-medium">Portfolio</h1>
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap items-center justify-center gap-6"
      >
        {portfolioItems.map((item, index) => (
          <PortfolioCard key={index} item={item} />
        ))}
      </motion.div>
    </section>
  );
};

export default PortfolioCardsSection;
