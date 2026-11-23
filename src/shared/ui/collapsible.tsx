import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";

interface Props {
  /** 완전히 접혔는지. 접히면 포커스·보조기기 대상에서 빠진다. */
  collapsed: boolean;
  /** false면 접지 않고 그대로 보여 준다(데스크톱 등). */
  enabled?: boolean;
  children: ReactNode;
  className?: string;
}

type CollapsibleStyle = CSSProperties & { "--collapsible-height"?: string };

/**
 * 목록 스크롤에 연동해 높이를 0까지 줄이는 래퍼.
 * 높이·투명도는 app-shell의 `--collapse-progress`(0~1)를 CSS calc로 따라가므로
 * 손가락 움직임과 같은 프레임에 부드럽게 접히고 펴진다.
 * 그림자가 잘리지 않도록 안쪽에 좌우 여백을 두고 같은 크기만큼 바깥으로 당긴다.
 */
const Collapsible = ({ collapsed, enabled = true, children, className = "" }: Props) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // 펼친 높이를 재서 CSS 변수로 넘긴다. 내용 높이가 바뀌어도 따라간다.
  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;

    if (!enabled || !outer || !inner) {
      return;
    }

    const update = () => {
      outer.style.setProperty("--collapsible-height", `${inner.scrollHeight}px`);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(inner);

    return () => observer.disconnect();
  }, [enabled]);

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  const style: CollapsibleStyle = {
    height: "calc(var(--collapsible-height, auto) * (1 - var(--collapse-progress, 0)))",
    opacity: "calc(1 - var(--collapse-progress, 0) * 1.5)",
  };

  return (
    <div
      ref={outerRef}
      data-collapsible=""
      aria-hidden={collapsed}
      inert={collapsed}
      style={style}
      className={`overflow-hidden ${className}`}
    >
      <div
        ref={innerRef}
        className="-mx-2 px-2"
        style={{ transform: "translateY(calc(var(--collapse-progress, 0) * -12px))" }}
      >
        {children}
      </div>
    </div>
  );
};

export default Collapsible;
