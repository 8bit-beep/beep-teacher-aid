import { create } from "zustand";

interface State {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

/** 목록을 아래로 스크롤하면 상단 헤더를 축소하고, 맨 위로 돌아오면 다시 펼친다. */
export const useHeaderStore = create<State>(set => ({
  collapsed: false,
  setCollapsed: collapsed => set(state => (state.collapsed === collapsed ? state : { collapsed })),
}));
