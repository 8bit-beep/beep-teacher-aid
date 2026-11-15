import { useShifts } from "@/entities/shifts/queries";
import type { Shift } from "@/entities/shifts/types";
import { StudentId } from "@/shared/ui/student-id";
import { pad } from "@/shared/utils/pad";
import Table from "@/widgets/table/ui/table";
import Detail from "./detail";

const formatShiftStudentId = (shift: Shift) =>
  `${shift.user.studentInfo?.grade || 0}${shift.user.studentInfo?.classNumber || 0}${pad(shift.user.studentInfo?.num || 0, 2)}`;

const ShiftsTable = () => {
  const { data: response } = useShifts();
  const data = response.data;

  return (
    <>
      <div className="w-full flex-1 min-h-0 overflow-y-auto lg:hidden">
        <Table
          header={[{ title: "학번/이름" }, { title: "신청보기", width: "150px", align: "right" }]}
          rows={data.map(shift => [
            <StudentId key={shift.id} id={formatShiftStudentId(shift)} name={shift.user.name} />,
            <Detail data={shift} key={`${shift.id}-detail`} />,
          ])}
        />
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
