import { Suspense } from "react";
import FloorFilterBar from "@/features/approval/ui/floor-filter-bar";
import MobileRoomTable from "@/features/manage-attends/ui/mobile-room-table";
import RoomTable from "@/features/manage-attends/ui/room-table";
import LabIcon from "@/shared/icons/lab-icon";
import Section from "@/widgets/section/ui/section";

const AttendancePage = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4.5 px-5 pb-5 lg:px-13.5 lg:pb-6">
      <Section
        title="출석 조회"
        description="학생들의 실 별 출석여부를 조회하세요!"
        icon={<LabIcon size={24} />}
        mobileFilter={
          <div className="w-full flex flex-col gap-3">
            <FloorFilterBar />
          </div>
        }
      >
        <Suspense
          fallback={
            <div className="w-full flex items-center justify-center py-20 text-greyscale-50">
              불러오는 중...
            </div>
          }
        >
          <RoomTable />
          <MobileRoomTable />
        </Suspense>
      </Section>
    </div>
  );
};

export default AttendancePage;
