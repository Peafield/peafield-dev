import Bowser from "bowser";
import { useCallback } from "react";

const useDeviceDetect = () => {
  const getIsMobile = useCallback(() => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    return {
      isMobile: browser.getPlatformType() === "mobile",
    };
  }, []);

  return { getIsMobile };
};

export default useDeviceDetect;
