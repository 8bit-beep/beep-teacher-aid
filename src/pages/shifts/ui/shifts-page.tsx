import { Suspense } from "react";
import ShiftsTable from "@/features/manage-shifts/ui/shifts-table";
import PersonIcon from "@/shared/icons/person-icon";
import Section from "@/widgets/section/ui/section";

const ShiftsPage = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4.5 lg:px-13.5 lg:pb-6">
      <Section
        title="실 이동 관리"
        description="실 이동 목록을 확인해 보세요!"
        icon={<PersonIcon size={24} />}
      >
        <Suspense
          fallback={
            <div className="w-full flex items-center justify-center py-20 text-greyscale-50">
              불러오는 중...
            </div>
          }
        >
          <ShiftsTable />
        </Suspense>
      </Section>
    </div>
  );
};

export default ShiftsPage;
