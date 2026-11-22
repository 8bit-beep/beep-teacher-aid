import { Suspense } from "react";
import FilterClassroom from "@/features/filter/ui/filter-classroom";
import FilterDate from "@/features/filter/ui/filter-date";
import ClassroomTable from "@/features/manage-classroom/ui/classroom-table";
import DashboardIcon from "@/shared/icons/dashboard-icon";
import Section from "@/widgets/section/ui/section";

const ClassroomPage = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4.5 lg:px-13.5 lg:pb-6">
      <Section
        title="반별 조회"
        description="학생들의 반별 출석여부를 조회하세요!"
        icon={<DashboardIcon size={24} />}
        collapseHeaderOnScroll
        headerOptions={
          <div className="flex items-center gap-3">
            <FilterDate />
            <div className="hidden lg:block">
              <FilterClassroom />
            </div>
          </div>
        }
        mobileFilter={
          <div className="lg:hidden">
            <FilterClassroom />
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
          <ClassroomTable />
        </Suspense>
      </Section>
    </div>
  );
};

export default ClassroomPage;
