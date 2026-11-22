import { DESKTOP_MEDIA_QUERY, useMediaQuery } from "@/shared/hooks/use-media-query";
import { useHeaderStore } from "@/shared/stores/header";

/** 모바일에서 목록을 스크롤해 상단을 접어야 하는지 여부 */
export const useSectionCollapsed = () => {
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);
  const collapsed = useHeaderStore(state => state.collapsed);

  return !isDesktop && collapsed;
};
