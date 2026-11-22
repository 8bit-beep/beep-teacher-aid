import type { IconProps } from "../types/icon-props";

const TriangleIcon = ({ className, size = 12 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 9L0.5 1H9.5L5 9Z" fill="currentColor" />
    </svg>
  );
};

export default TriangleIcon;
