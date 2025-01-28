"use client";

import { useUiStore } from "@/store/ui";
import { useEffect } from "react";

export const StoreInit = () => {
  if (typeof window === "undefined") return;

  useEffect(() => {
    // Rehydrate the store state from persisted storage
    useUiStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    const updateOrientation = () => {
      const isMobile = window.innerWidth < window.innerHeight;
      useUiStore.setState({ isMobile });
    };

    updateOrientation();

    window.addEventListener("resize", updateOrientation);

    return () => window.removeEventListener("resize", updateOrientation);
  }, []);

  return null;
};
