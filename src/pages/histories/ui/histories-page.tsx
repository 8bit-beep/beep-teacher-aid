import { Suspense } from "react";
import { useRooms } from "@/entities/rooms/queries";
import { useHistoriesFloor } from "@/features/filter/stores";
import FilterHistory from "@/features/filter/ui/filter-history";
import FilterHistoryDateTime from "@/features/filter/ui/filter-history-date-time";
import HistoriesDropdownTable from "@/features/manage-histories/ui/histories-dropdown-table";
import HistoryIcon from "@/shared/icons/history-icon";
import Section from "@/widgets/section/ui/section";

const HistoriesContent = () => {
  const [floor] = useHistoriesFloor();
  const { data: roomsResponse } = useRooms(floor);

  return <HistoriesDropdownTable data={roomsResponse.data} />;
};

const HistoriesPage = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4.5 px-5 pb-5 lg:px-13.5 lg:pb-6">
      <Section
        title="출석 기록 조회"
        description="출석 기록을 조회하고 다운로드하세요!"
        icon={<HistoryIcon size={24} />}
        mobileFilter={
          <div className="w-full flex flex-col gap-2">
            <FilterHistory />
            <Suspense fallback={<div className="h-10 w-36 rounded-large bg-greyscale-10" />}>
              <FilterHistoryDateTime />
            </Suspense>
          </div>
        }
      >
        <div className="flex-1 min-h-0 overflow-y-auto px-2 lg:px-10">
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
