import { Suspense, type ReactNode } from "react";
import { useRouter } from "@b1nd/aid-kit/navigation";
import { useAuth } from "@/features/auth";
import FilterHistory from "@/features/filter/ui/filter-history";
import FilterHistoryDateTime from "@/features/filter/ui/filter-history-date-time";
import FilterRoom from "@/features/filter/ui/filter-room";
import RefreshButton from "@/features/manage-attends/ui/refresh-button";
import ManageMemo from "@/features/manage-memo/ui/manage-memo";
import { TAB_PATHS } from "@/shared/config/tabs";

const Header = () => {
  const { tab } = useRouter();
  const { user } = useAuth();

  const headerContentMap: Record<string, ReactNode> = {
    [TAB_PATHS.attendance]: <FilterRoom />,
    [TAB_PATHS.absences]: null, // 외박 등록 버튼은 Cycle 7에서 추가
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
    <header className="w-full min-h-12.5 flex items-center gap-5 my-4 px-5 lg:px-13.5">
      <button
        type="button"
        onClick={() => tab.move(TAB_PATHS.attendance)}
        className="shrink-0 cursor-pointer"
        aria-label="출석 조회로 이동"
      >
        <img src="/logo.svg" alt="logo" width={40} height={40} className="h-10 w-auto" />
      </button>
      <div className="w-full min-w-0 flex items-center gap-5">
        {headerContent && <div className="hidden lg:flex">{headerContent}</div>}
        <Suspense
          fallback={<div className="h-10 w-24 rounded-large bg-static-white shadow-modal" />}
        >
          <ManageMemo />
        </Suspense>
        <RefreshButton />
      </div>
      <div className="w-fit flex items-center gap-2 shrink-0">
        <p className="text-caption1 text-static-black inline-block min-w-9 truncate">{user.name}</p>
      </div>
    </header>
  );
};

export default Header;
