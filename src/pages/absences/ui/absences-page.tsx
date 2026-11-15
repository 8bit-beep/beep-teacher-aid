import { Suspense } from "react";
import { useAllAbsences, useTodayAbsences } from "@/entities/absences/queries";
import AbsencesSectionContent from "@/features/manage-absences/ui/absences-section-content";

const AbsencesContent = () => {
  const { data: allData } = useAllAbsences();
  const { data: todayResponse } = useTodayAbsences();

  return <AbsencesSectionContent todayData={todayResponse.data.content} allData={allData} />;
};

const AbsencesPage = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4.5 px-5 pb-5 lg:px-13.5 lg:pb-6">
      <Suspense
        fallback={
          <div className="w-full flex items-center justify-center py-20 text-greyscale-50">
            불러오는 중...
          </div>
        }
      >
        <AbsencesContent />
      </Suspense>
    </div>
  );
};

export default AbsencesPage;
