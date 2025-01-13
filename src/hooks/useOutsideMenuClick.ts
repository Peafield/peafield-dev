import { RefObject, useEffect } from "react";

const useOutsideMenuClick = (
  refs: RefObject<HTMLElement | null>[],
  callback: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const isInside = refs.some(
        (ref) => ref.current && ref.current.contains(event.target as Node)
      );
      if (isInside) {
        return;
      }

      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };

    // Reload only if refs or callback changes
  }, [refs, callback]);
};

export default useOutsideMenuClick;
