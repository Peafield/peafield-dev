import { containerVariants, itemVariants } from "@/constants/constants";
import { PortfolioItem } from "@/types/portfolio";
import { motion } from "framer-motion";
import Link from "next/link";

type PortfolioFooterProps = {
  portfolioItem: PortfolioItem;
};

const PortfolioFooter = ({ portfolioItem }: PortfolioFooterProps) => {
  return (
    <footer className="h-[100vh] w-full flex items-center justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="prose dark:prose-invert size-full flex flex-col mx-2 xl:item-center xl:justify-center"
      >
        <h1>Achievements</h1>
        {portfolioItem.achievements.map((item, index) => (
          <motion.p
            key={index}
            variants={itemVariants}
            className="border-2 border-gray-200 rounded-lg p-2 shadow-lg dark:shadow-none dark:border-none dark:bg-gray-800"
          >
            {item.description}{" "}
            {item.link && (
              <Link
                href={item.link}
                target="_blank"
                className="no-underline hover:animate-pulse"
              >
                🔗 View more
              </Link>
            )}
          </motion.p>
        ))}
      </motion.div>
    </footer>
  );
};
export default PortfolioFooter;
