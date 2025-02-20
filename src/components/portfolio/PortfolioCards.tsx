"use client";

import { itemVariants } from "@/constants/constants";
import { useUiStore } from "@/store/ui";
import { PortfolioItem } from "@/types/portfolio";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type PortfolioCardProps = {
  item: PortfolioItem;
};

const PortfolioCard = ({ item }: PortfolioCardProps) => {
  const router = useRouter();
  const { setUiState } = useUiStore();
  return (
    <motion.article
      role="button"
      tabIndex={0}
      onClickCapture={() =>
        setUiState({ isCardClicked: true, clickedCard: item })
      }
      variants={itemVariants}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.5 },
      }}
      whileTap={{ scale: 1.1 }}
      className={
        "relative flex h-[400px] w-80 cursor-pointer flex-col overflow-hidden rounded-lg border-2 border-gray-200 shadow-lg dark:shadow-none dark:border-none dark:bg-gray-800 hover:shadow-xl"
      }
    >
      <div className="relative h-1/2 w-full">
        <img
          src={item.image.hero.src}
          alt={item.image.hero.description}
          className="aspect-3/2 object-cover rounded-lg shadow-lg dark:shadow-none"
        />
      </div>
      <div className="flex h-1/2 flex-col gap-4 p-6 ">
        <h2 className="text-2xl font-bold tracking-tight ">{item.name}</h2>
        <div className="flex flex-wrap w-full gap-x-2">
          {item.technologies.map((tech, index) => (
            <p key={index} className="text-terminal">
              {tech}
            </p>
          ))}
        </div>
      </div>
      <button
        className="absolute bottom-0 right-0 rounded-md bg-primary px-4 py-2 text-sm font-semibold hover:text-hoverColor"
        onClick={(e) => {
          e.stopPropagation();
          setUiState({ isCardClicked: true, clickedCard: item });
        }}
      >
        Read More
      </button>
    </motion.article>
  );
};

export default PortfolioCard;
