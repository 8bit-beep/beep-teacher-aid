import type { ReactNode } from "react";
import { useRouter } from "@b1nd/aid-kit/navigation";

interface Props {
  icon: ReactNode;
  label: string;
  path: string;
}

const NavItem = ({ icon, label, path }: Props) => {
  const { tab } = useRouter();

  return (
    <button
      type="button"
      onClick={() => tab.move(path)}
      className={`${
        tab.current === path ? "text-blue-light" : "text-static-black"
      } w-12 h-11 rounded-medium flex flex-col items-center justify-between cursor-pointer`}
    >
      {icon}
      <p className="text-caption1">{label}</p>
    </button>
  );
};

export default NavItem;
