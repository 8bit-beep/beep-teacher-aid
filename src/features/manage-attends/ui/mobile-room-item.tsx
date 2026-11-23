import { Button } from "@beep-ds/ui";
import type { Room } from "@/entities/rooms/types";
import ChevronIcon from "@/shared/icons/chevron-icon";
import { useApprove } from "../../manage-approvals/hooks/use-approve";
import { useToggleData } from "../hooks/use-toggle-data";

interface Props {
  data: Room;
  approvedAt?: string;
  approvedTeacher?: string;
}

const MobileRoomItem = ({ data, approvedAt, approvedTeacher }: Props) => {
  const { attendances, toggleOpen } = useToggleData(data);
  const { isApproved, toggleApproval } = useApprove(data.id);

  const label = data.grade ? `${data.grade}-${data.classNumber} (${data.name})` : data.name;

  const currentStudentCount = attendances.filter(attendance => {
    const status = attendance.statuses[0]?.status;

    return status != null && !["외박", "외출"].includes(status.name);
  }).length;
  const countByStatus = (name: string) =>
    attendances.filter(a => a.statuses[0]?.status?.name === name).length;

  const stats = `${currentStudentCount}/${attendances.length}명 · 외박 ${countByStatus("외박")}명 · 외출 ${countByStatus("외출")}명`;
  const showApprovedInfo = isApproved && approvedAt && approvedTeacher;

  return (
    <div
      className="w-full flex flex-col border-b border-greyscale-20 active:bg-greyscale-10 cursor-pointer px-3 py-3 gap-2.5"
      onClick={toggleOpen}
    >
      <div className="w-full min-h-6 flex items-center gap-2">
        <p className="w-[38%] shrink-0 text-body text-static-black truncate">{label}</p>
        {showApprovedInfo ? (
          <div className="flex-1 min-w-0 flex items-center gap-2 text-caption1 text-static-black">
            <p className="flex-1 min-w-0 truncate">{approvedTeacher}</p>
            <p className="flex-1 min-w-0 truncate">{approvedAt}</p>
          </div>
        ) : (
          <p className="flex-1 min-w-0 text-[13px] font-medium leading-tight text-blue-light break-keep">
            {stats}
          </p>
        )}
        <ChevronIcon size={16} className="shrink-0 text-static-black" rotate={-90} />
      </div>
      <Button
        style={{ width: "100%" }}
        buttonSize="small"
        buttonType={isApproved ? "danger" : "primary"}
        onClick={e => {
          e.stopPropagation();
          toggleApproval();
        }}
      >
        {isApproved ? "승인취소" : "승인하기"}
      </Button>
    </div>
  );
};

export default MobileRoomItem;
