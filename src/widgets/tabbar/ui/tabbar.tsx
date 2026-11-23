import { ROUTES } from "@/shared/constants/routes";
import NavItem from "./nav-item";

const Tabbar = () => {
  return (
    <nav className="w-full shrink-0 pt-3 pb-3 px-1 bg-static-white flex items-center rounded-t-large shadow-[0_-2px_4px_0_rgba(0,0,0,0.05)]">
      {ROUTES.map(({ icon, path, mobileLabel }) => (
        <NavItem key={path} icon={icon} label={mobileLabel} path={path} />
      ))}
    </nav>
  );
};

export default Tabbar;
