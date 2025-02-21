import { useUiStore } from "@/store/ui";
import { PortfolioItem } from "@/types/portfolio";
import { motion } from "framer-motion";
import { RiArrowGoBackFill, RiArrowUpDoubleLine } from "react-icons/ri";
import { set } from "zod";

const BackToCardsButton = () => {
  const { setUiState } = useUiStore();
  return (
    <motion.button
      onClick={() =>
        setUiState({ isCardClicked: false, clickedCard: {} as PortfolioItem })
      }
      type="button"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { duration: 0.6 } }}
      exit={{ y: 100, opacity: 0, transition: { duration: 0.6 } }}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 1 }}
      className="fixed z-50 bottom-4 left-4 flex justify-center"
    >
      <RiArrowGoBackFill className="size-12" />
    </motion.button>
  );
};

export default BackToCardsButton;
