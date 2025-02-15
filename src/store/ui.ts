import { PortfolioItem } from "@/types/portfolio";
import { UiStore } from "@/types/ui";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useUiStore = create<UiStore>()(
  persist(
    devtools(
      immer((set) => ({
        isMobile: false,
        isCardClicked: false,
        clickedCard: {} as PortfolioItem,
        setUiState: (newState) => set(() => newState),
      }))
    ),
    {
      name: "ui",
      partialize: (state) => ({
        isMobile: state.isMobile,
        isCardClicked: state.isCardClicked,
      }),
    }
  )
);
