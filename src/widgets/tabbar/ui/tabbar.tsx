import { ROUTES } from "@/shared/constants/routes";
import NavItem from "./nav-item";

const Tabbar = () => {
  return (
    <nav className="w-full pt-3.5 pb-4 px-2 bg-static-white flex items-center justify-evenly gap-2 border-t border-greyscale-20">
      {ROUTES.map(({ icon, path, mobileLabel }) => (
        <NavItem key={path} icon={icon} label={mobileLabel} path={path} />
      ))}
    </nav>
  );
};

export default Tabbar;
