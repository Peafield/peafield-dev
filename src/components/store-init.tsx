"use client";

import useDeviceDetect from "@/hooks/useDeviceDetect";
import { useUiStore } from "@/store/ui";
import { useEffect } from "react";

export const StoreInit = () => {
  if (typeof window === "undefined") return;
  const { getIsMobile } = useDeviceDetect();

  useEffect(() => {
    // Rehydrate the store state from persisted storage
    useUiStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    const isMobile = getIsMobile();
    useUiStore.setState({ isMobile: isMobile.isMobile });
  }, []);
  return null;
};
