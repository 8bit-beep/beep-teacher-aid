import { useShifts } from "@/entities/shifts/queries";
import type { Shift } from "@/entities/shifts/types";
import { StudentId } from "@/shared/ui/student-id";
import { pad } from "@/shared/utils/pad";
import Table from "@/widgets/table/ui/table";
import Detail from "./detail";

const formatShiftStudentId = (shift: Shift) =>
  `${shift.user.studentInfo?.grade || 0}${shift.user.studentInfo?.classNumber || 0}${pad(shift.user.studentInfo?.num || 0, 2)}`;

const SHIFT_STATUS_STYLE: Record<Shift["status"], { label: string; className: string }> = {
  WAITING: { label: "대기", className: "text-greyscale-50" },
  APPROVED: { label: "승인", className: "text-blue-light" },
  REJECTED: { label: "거절", className: "text-red-light" },
};

const ShiftsTable = () => {
  const { data: response } = useShifts();
  const data = response.data;

  return (
    <>
      <div className="w-full flex-1 min-h-0 flex flex-col lg:hidden">
        <div className="w-full shrink-0 flex items-center justify-between px-3 py-3 bg-blue-light text-caption1 text-static-white">
          <p>학번/이름</p>
          <p>신청 내용</p>
        </div>
        <div className="w-full flex-1 overflow-y-auto overscroll-contain">
          {data.length === 0 ? (
            <div className="h-20 flex items-center justify-center text-body text-greyscale-40">
              내용이 없습니다.
            </div>
          ) : (
            data.map((shift, index) => (
              <div
                key={shift.id}
                className={`w-full flex items-center gap-3 px-3 py-2.5 ${index % 2 === 0 ? "bg-[#EFF8FF]" : "bg-static-white"}`}
              >
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-center gap-2.5">
                    <p className="text-caption2 text-greyscale-40 shrink-0 tabular-nums">
                      {formatShiftStudentId(shift)}
                    </p>
                    <p className="min-w-0 text-body text-static-black truncate">
                      {shift.user.name}
                    </p>
                    <span
                      className={`shrink-0 text-[12px] font-medium ${SHIFT_STATUS_STYLE[shift.status].className}`}
                    >
                      {SHIFT_STATUS_STYLE[shift.status].label}
                    </span>
                  </div>
                  <p className="text-caption1 text-blue-light truncate">
                    {`${shift.checkpoint.name} · ${shift.room.name}로 이동`}
                  </p>
                </div>
                <Detail data={shift} />
              </div>
            ))
          )}
        </div>
      </div>
      <div className="w-full flex-1 min-h-0 overflow-y-auto hidden lg:block">
        <Table
          header={[
            { title: "학번/이름", width: "168px" },
            { title: "변경 교시", width: "140px" },
            { title: "이동 내용" },
            { title: "신청 사유", width: "165px" },
          ]}
          rows={data.map(shift => [
            <StudentId key={shift.id} id={formatShiftStudentId(shift)} name={shift.user.name} />,
            shift.checkpoint.name,
            `${shift.room.name}로 이동`,
            <Detail data={shift} key={`${shift.id}-detail`} />,
          ])}
        />
      </div>
    </>
  );
};

export default ShiftsTable;
