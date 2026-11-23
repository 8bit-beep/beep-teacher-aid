import { Suspense } from "react";
import { useRooms } from "@/entities/rooms/queries";
import Download from "@/features/download/ui/download";
import { useDateStore, useHistoriesFloor } from "@/features/filter/stores";
import FilterHistoryTabs from "@/features/filter/ui/filter-history-tabs";
import FilterHistoryWeek from "@/features/filter/ui/filter-history-week";
import HistoriesDropdownTable from "@/features/manage-histories/ui/histories-dropdown-table";
import HistoryIcon from "@/shared/icons/history-icon";
import Section from "@/widgets/section/ui/section";

const HistoriesContent = () => {
  const [floor] = useHistoriesFloor();
  const { data: roomsResponse } = useRooms(floor);

  return <HistoriesDropdownTable data={roomsResponse.data} />;
};

const HistoriesPage = () => {
  const { date } = useDateStore();
  const month = Number(date.split("-")[1]);

  return (
    <div className="w-full h-full flex flex-col gap-4.5 lg:px-13.5 lg:pb-6">
      <Section
        title="출석 기록 조회"
        description="출석 기록을 조회하고 다운로드하세요!"
        icon={<HistoryIcon size={24} />}
        titleSuffix={
          month ? (
            <span className="text-body text-greyscale-40 whitespace-nowrap">{month}월</span>
          ) : undefined
        }
        headerOptions={<Download />}
        mobileFilter={
          <div className="w-full flex flex-col gap-4">
            <FilterHistoryWeek />
            <FilterHistoryTabs />
          </div>
        }
      >
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain lg:px-10">
          <Suspense
            fallback={
              <div className="w-full flex items-center justify-center py-20 text-greyscale-50">
                불러오는 중...
              </div>
            }
          >
            <HistoriesContent />
          </Suspense>
        </div>
      </Section>
    </div>
  );
};

export default HistoriesPage;
