import { UiStore } from "@/types/ui";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useUiStore = create<UiStore>()(
  persist(
    devtools(
      immer((set) => ({
        isMobile: false,
        setUiState: (newState) => set(() => newState),
      }))
    ),
    {
      name: "ui",
    }
  )
);
