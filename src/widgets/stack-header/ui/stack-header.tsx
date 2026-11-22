import type { ReactNode } from "react";
import { CloseIcon } from "@/shared/icons/close-icon";

interface Props {
  title: ReactNode;
  onBack: () => void;
  /** 기본은 닫기(✕). 폼처럼 이전 단계로 돌아갈 때는 다른 아이콘을 넘긴다. */
  icon?: ReactNode;
  backLabel?: string;
}

/**
 * 스택 화면(실 상세, 교내 행사) 상단 바.
 * aid-kit StackScreen은 `position: fixed; inset: 0`이라 메인 헤더와 safe area를 무시하므로,
 * safe area만큼 내려온 뒤 메인 헤더와 같은 높이·배경의 바를 둔다.
 */
const StackHeader = ({ title, onBack, icon = <CloseIcon />, backLabel = "닫기" }: Props) => {
  return (
    <header className="safe-area-top w-full shrink-0 bg-greyscale-10">
      <div className="w-full flex items-center justify-between gap-4 py-6 px-4">
        <button
          type="button"
          onClick={onBack}
          // StackScreen은 왼쪽 40px 안에서 시작한 포인터를 가장자리 스와이프로 가로채
          // (setPointerCapture) 버튼 클릭이 전달되지 않으므로, 버튼에서는 전파를 막는다.
          onPointerDown={e => e.stopPropagation()}
          aria-label={backLabel}
          className="size-10 shrink-0 rounded-large bg-static-white shadow-modal flex items-center justify-center text-static-black cursor-pointer"
        >
          {icon}
        </button>
        <h1 className="min-w-0 text-accent text-static-black truncate">{title}</h1>
      </div>
    </header>
  );
};

export default StackHeader;
