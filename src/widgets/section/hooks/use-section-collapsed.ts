import { DESKTOP_MEDIA_QUERY, useMediaQuery } from "@/shared/hooks/use-media-query";
import { useHeaderStore } from "@/shared/stores/header";

/**
 * 모바일에서만 목록 스크롤에 맞춰 상단을 접는다.
 * - enabled: 스크롤 연동 접기를 쓸지(데스크톱은 false)
 * - collapsed: 완전히 접혔는지(포커스·보조기기 처리용)
 */
export const useSectionCollapsed = () => {
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);
  const collapsed = useHeaderStore(state => state.collapsed);

  return { enabled: !isDesktop, collapsed: !isDesktop && collapsed };
};
