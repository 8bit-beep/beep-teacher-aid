import { Button, modal } from "@beep-ds/ui";
import type { Attendance } from "@/entities/attendances/types";
import ManageOneDayAbsenceModal from "./manage-one-day-absence-modal";

interface Props {
  data: Attendance;
  isLast: boolean;
}

const StudentItem = ({ data, isLast }: Props) => {
  return (
    <div
      className={`w-full h-14 flex items-center gap-4 bg-static-white${isLast ? "" : " border-b border-greyscale-20"}`}
    >
      <p className="text-caption1 text-greyscale-40">{data.studentId}</p>
      <p className="text-h4 text-static-black">{data.name}</p>
      <div className="flex-1" />
      <Button
        onClick={() =>
          modal.open({
            title: "출석 상태 설정하기",
            content: <ManageOneDayAbsenceModal data={data} />,
          })
        }
      >
        출석 상태 설정
      </Button>
    </div>
  );
};

export default StudentItem;
