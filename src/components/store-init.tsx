"use client";

import useDeviceDetect from "@/hooks/useDeviceDetect";
import { useUiStore } from "@/store/ui";
import { useEffect } from "react";

export const StoreInit = () => {
  if (typeof window === "undefined") return;
  const { getIsMobile } = useDeviceDetect();
  useUiStore.persist.rehydrate();
  useEffect(() => {
    const isMobile = getIsMobile();
    useUiStore.setState({ isMobile: isMobile.isMobile });
  }, []);
  return null;
};
