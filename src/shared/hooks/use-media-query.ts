import { useCallback, useSyncExternalStore } from "react";

/** Tailwind `lg` 브레이크포인트(1024px)와 같은 기준 */
export const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

export const useMediaQuery = (query: string) => {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
};
