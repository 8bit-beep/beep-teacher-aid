import type { ReactNode } from "react";
import { useRouter } from "@b1nd/aid-kit/navigation";

interface Props {
  icon: ReactNode;
  label: string;
  path: string;
}

const NavItem = ({ icon, label, path }: Props) => {
  const { tab } = useRouter();
  const isActive = tab.current === path;

  return (
    <button
      type="button"
      onClick={() => tab.move(path)}
      aria-current={isActive ? "page" : undefined}
      className="flex-1 min-w-0 flex justify-center cursor-pointer"
    >
      <span
        className={`${
          isActive ? "bg-greyscale-10" : "bg-transparent"
        } w-16 h-12 rounded-medium flex flex-col items-center justify-center gap-1 text-static-black`}
      >
        <span className="size-6 flex items-center justify-center">{icon}</span>
        <span className="text-[11px] font-medium leading-none whitespace-nowrap">{label}</span>
      </span>
    </button>
  );
};

export default NavItem;
