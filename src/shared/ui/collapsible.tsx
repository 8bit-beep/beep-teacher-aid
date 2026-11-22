import type { ReactNode } from "react";

interface Props {
  collapsed: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * 높이를 0으로 접었다 펼치는 래퍼. 접히면 공간을 차지하지 않고 포커스도 받지 않는다.
 * 그림자가 잘리지 않도록 안쪽에 좌우 여백을 두고 같은 크기만큼 바깥으로 당긴다.
 */
const Collapsible = ({ collapsed, children, className = "" }: Props) => {
  return (
    <div
      aria-hidden={collapsed}
      inert={collapsed}
      className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
        collapsed ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
      } ${className}`}
    >
      <div className="min-h-0 overflow-hidden -mx-2 px-2">{children}</div>
    </div>
  );
};

export default Collapsible;
