import type { MouseEvent } from "react";

export interface FilterOption {
  label: string;
  value: string;
}

interface Props {
  options: FilterOption[];
  selected: string;
  onChange: (value: string) => void;
  className?: string;
  variant?: "default" | "segment";
}

const FilterBar = ({ options, selected, onChange, className, variant = "default" }: Props) => {
  const isSegment = variant === "segment";

  return (
    <div
      className={`w-full flex items-center ${
        isSegment
          ? "w-41 h-8.5 gap-1 rounded-xl bg-white p-1 shadow-modal"
          : "border-b border-blue-light"
      } ${className ?? ""}`.trim()}
    >
      {options.map(option => (
        <button
          key={option.value}
          type="button"
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onChange(option.value);
          }}
          className={`flex-1 cursor-pointer ${
            isSegment
              ? `h-full rounded-2xl px-4 py-2 text-body flex items-center justify-center ${
                  option.value === selected
                    ? "bg-blue-light text-white"
                    : "bg-transparent text-greyscale-40"
                }`
              : `min-w-0 px-1 pt-2 pb-2 -mb-px text-body whitespace-nowrap border-b-[5px] ${
                  option.value === selected
                    ? "font-bold text-static-black border-blue-light"
                    : "text-greyscale-40 border-transparent"
                }`
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
