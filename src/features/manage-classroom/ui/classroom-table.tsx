import { useClassroomAttendances } from "@/entities/attendances/queries/use-classroom-attendances";
import type { Attendance } from "@/entities/attendances/types";
import { useFilterClassroom } from "@/features/filter/hooks/use-filter-classroom";
import { useDateStore } from "@/features/filter/stores";
import { getClassroomTableWidths, MOBILE_STATUS_CELL_WIDTH } from "@/shared/constants/table-widths";
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
      <div className="flex lg:hidden w-full flex-1 min-h-0 overflow-auto overscroll-contain">
        <div className="min-w-full w-max self-start">
          <div className="sticky top-0 z-[1] flex gap-2.5 px-4 py-3 bg-blue-light">
            {firstStatuses.map(s => (
              <p
                key={s.checkpoint.id}
                className={`${MOBILE_STATUS_CELL_WIDTH} shrink-0 text-center text-caption1 text-static-white whitespace-nowrap`}
              >
                {s.checkpoint.name}
              </p>
            ))}
          </div>
          {data.length === 0 ? (
            <div className="h-20 flex items-center justify-center text-body text-greyscale-40">
              내용이 없습니다.
            </div>
          ) : (
            data.map((attendance, index) => (
              <div
                key={attendance.userId}
                className={`flex flex-col gap-1.5 px-4 pt-2 pb-3 ${index % 2 === 0 ? "bg-[#EFF8FF]" : "bg-static-white"}`}
              >
                <div className="sticky left-4 w-fit flex items-center gap-2">
                  <p className="text-caption2 text-greyscale-40 tabular-nums">
                    {attendance.studentId}
                  </p>
                  <p className="text-body text-static-black">{attendance.name}</p>
                </div>
                <div className="flex gap-2.5">
                  {MobileClassroomItem({ data: attendance, date }).map((cell, cellIndex) => (
                    <div key={cellIndex} className={`${MOBILE_STATUS_CELL_WIDTH} shrink-0`}>
                      {cell}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ClassroomTable;
