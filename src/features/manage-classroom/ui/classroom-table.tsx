import { useClassroomAttendances } from "@/entities/attendances/queries/use-classroom-attendances";
import type { Attendance } from "@/entities/attendances/types";
import { useFilterClassroom } from "@/features/filter/hooks/use-filter-classroom";
import { useDateStore } from "@/features/filter/stores";
import { getClassroomTableWidths } from "@/shared/constants/table-widths";
import { isAbsenceStatusName, isOutStatusName } from "@/shared/utils/attendance-status";
import Table from "@/widgets/table/ui/table";
import ClassroomItem from "./classroom-item";
import MobileClassroomItem from "./mobile-classroom-item";

const getAttendanceRowHighlight = (attendance: Attendance) => {
  const isAbsent = attendance.statuses.some(s => isAbsenceStatusName(s.status?.name));
  const isOut = attendance.statuses.some(s => isOutStatusName(s.status?.name));
  const className = isAbsent ? "bg-red-light" : isOut ? "bg-green-light" : undefined;

  return {
    isHighlighted: isAbsent || isOut,
    className,
  };
};

const ClassroomTable = () => {
  const { classroom } = useFilterClassroom();
  const { date } = useDateStore();

  const [gradeStr, classNumberStr] = classroom.value.split("-");
  const grade = Number(gradeStr) || 1;
  const classNumber = Number(classNumberStr) || 1;

  const { data: response } = useClassroomAttendances(grade, classNumber, date);
  const data = response.data;

  const firstStatuses = data[0]?.statuses ?? [];
  const { dropdownWidth, headerWidth, lastHeaderWidth } = getClassroomTableWidths(
    firstStatuses.length
  );

  const desktopStatusHeaders = firstStatuses.map((s, i) => ({
    title: s.checkpoint.name,
    width: i === firstStatuses.length - 1 ? lastHeaderWidth : headerWidth,
  }));

  const mobileStatusHeaders = firstStatuses.map(s => ({
    title: s.checkpoint.name,
    align: "center" as const,
    width: "33.33vw",
  }));

  return (
    <>
      <div className="hidden lg:flex w-full flex-1 min-h-0 overflow-y-auto">
        <Table
          header={[{ title: "학번/이름" }, ...desktopStatusHeaders]}
          rows={data.map(attendance => {
            const { isHighlighted, className } = getAttendanceRowHighlight(attendance);

            return {
              className,
              cells: ClassroomItem({
                data: attendance,
                isHighlighted,
                desktopWidth: dropdownWidth,
                date,
              }),
            };
          })}
        />
      </div>
      <div className="flex lg:hidden w-full flex-1 min-h-0 overflow-x-auto overflow-y-auto [&_table]:w-auto [&_table]:min-w-full">
        <Table
          bodyScrollable={false}
          header={mobileStatusHeaders}
          rows={data.map(attendance => {
            const { isHighlighted, className } = getAttendanceRowHighlight(attendance);

            return {
              className,
              rowHeader: (
                <div className="flex gap-2">
                  <p
                    className={`text-accent ${isHighlighted ? "text-greyscale-10" : "text-greyscale-40"}`}
                  >
                    {attendance.studentId}
                  </p>
                  <p
                    className={`text-accent ${isHighlighted ? "text-white" : "text-static-black"}`}
                  >
                    {attendance.name}
                  </p>
                </div>
              ),
              cells: MobileClassroomItem({
                data: attendance,
                date,
              }),
            };
          })}
        />
      </div>
    </>
  );
};

export default ClassroomTable;
