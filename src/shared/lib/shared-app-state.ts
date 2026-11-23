import type { Dispatch, SetStateAction } from "react";
import { useAppState } from "@b1nd/aid-kit/app-state";
import { create } from "zustand";

/**
 * aid-kit의 useAppState는 컴포넌트마다 별도의 useState를 두고 저장소에만 기록하므로,
 * 같은 key를 쓰는 다른 컴포넌트(예: 층 탭과 방 목록)에는 변경이 전달되지 않는다.
 * 값은 zustand 스토어로 공유하고, 앱 재실행 시 복원을 위해 저장은 useAppState에 맡긴다.
 */
export const createSharedAppState = (key: string, initialValue: string) => {
  const useStore = create<{ value: string | undefined }>(() => ({ value: undefined }));

  return (): [string, Dispatch<SetStateAction<string>>] => {
    const [persisted, setPersisted] = useAppState<string>(initialValue, key);
    const shared = useStore(state => state.value);
    const value = shared === undefined ? persisted : shared;

    const setValue: Dispatch<SetStateAction<string>> = action => {
      const prev = useStore.getState().value ?? value;
      const next = action instanceof Function ? action(prev) : action;

      useStore.setState({ value: next });
      setPersisted(next);
    };

    return [value, setValue];
  };
};
