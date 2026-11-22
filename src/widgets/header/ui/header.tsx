import { Suspense, type ReactNode } from "react";
import { useRouter } from "@b1nd/aid-kit/navigation";
import { useAuth } from "@/features/auth";
import FilterHistory from "@/features/filter/ui/filter-history";
import FilterHistoryDateTime from "@/features/filter/ui/filter-history-date-time";
import FilterRoom from "@/features/filter/ui/filter-room";
import CreateAbsence from "@/features/manage-absences/ui/create-absence";
import RefreshButton from "@/features/manage-attends/ui/refresh-button";
import ManageMemo from "@/features/manage-memo/ui/manage-memo";
import { TAB_PATHS } from "@/shared/config/tabs";
import { useHeaderStore } from "@/shared/stores/header";
import ProfileIcon from "@/shared/icons/profile-icon";
import logo from "@/assets/logo.svg";

const Header = () => {
  const { tab } = useRouter();
  const { user } = useAuth();
  const collapsed = useHeaderStore(state => state.collapsed);

  const headerContentMap: Record<string, ReactNode> = {
    [TAB_PATHS.attendance]: <FilterRoom />,
    [TAB_PATHS.absences]: <CreateAbsence />,
    [TAB_PATHS.histories]: (
      <div className="w-full flex flex-col sm:flex-row gap-5 sm:gap-4">
        <div className="flex items-center gap-4">
          <Suspense fallback={<div className="h-10 w-36 rounded-large bg-static-white" />}>
            <FilterHistoryDateTime />
          </Suspense>
        </div>
        <FilterHistory />
      </div>
    ),
  };

  const headerContent = headerContentMap[tab.current];

  return (
    <header
      className={`w-full shrink-0 flex items-center gap-4 px-4 transition-[padding] duration-200 ease-out lg:gap-5 lg:my-4 lg:py-0 lg:px-13.5 ${
        collapsed ? "py-2" : "py-6"
      }`}
    >
      <button
        type="button"
        onClick={() => tab.move(TAB_PATHS.attendance)}
        className="shrink-0 cursor-pointer"
        aria-label="출석 조회로 이동"
      >
        <img src={logo} alt="logo" width={40} height={40} className="h-10 w-auto" />
      </button>
      <div className="flex-1 min-w-0 flex items-center gap-4 lg:gap-5">
        {headerContent && <div className="hidden lg:flex">{headerContent}</div>}
        <Suspense
          fallback={<div className="h-10 w-25 rounded-large bg-static-white shadow-modal" />}
        >
          <ManageMemo />
        </Suspense>
        <RefreshButton />
      </div>
      <div className="min-w-0 max-w-28 flex items-center gap-1.5 shrink">
        <ProfileIcon size={24} className="shrink-0 text-blue-light" />
        <p className="min-w-0 text-[12px] font-medium leading-none text-static-black truncate">
          {user.name}
        </p>
      </div>
    </header>
  );
};

export default Header;
