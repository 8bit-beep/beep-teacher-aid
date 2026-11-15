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

const ApprovedInfo = ({
  approvedAt,
  approvedTeacher,
}: {
  approvedAt: string;
  approvedTeacher: string;
}) => (
  <div className="flex w-full">
    <p className="text-caption1 inline-block w-full">{approvedAt}</p>
    <p className="text-caption1 inline-block w-full">{approvedTeacher}</p>
  </div>
);

const MobileRoomItem = ({ data, approvedAt, approvedTeacher }: Props) => {
  const { attendances, toggleOpen } = useToggleData(data);
  const { isApproved, toggleApproval } = useApprove(data.id);

  const label = data.grade ? `${data.grade}-${data.classNumber} (${data.name})` : data.name;

  const currentStudentCount = attendances.filter(attendance => {
    const status = attendance.statuses[0]?.status;

    return status != null && !["외박", "외출"].includes(status.name);
  }).length;

  const stats = `인원 ${currentStudentCount}/${attendances.length}명 · 외박 ${attendances.filter(a => a.statuses[0]?.status?.name === "외박").length}명 · 외출 ${attendances.filter(a => a.statuses[0]?.status?.name === "외출").length}명`;

  return (
    <div
      className="w-full flex flex-col items-center border-b active:bg-zinc-200 border-greyscale-20 cursor-pointer text-h4 px-3 py-[15px] gap-[10px]"
      onClick={toggleOpen}
    >
      <div className="w-full flex items-center gap-2">
        <p className="w-full text-body">{label}</p>
        <div className="flex w-full">
          {isApproved && approvedAt && approvedTeacher ? (
            <ApprovedInfo approvedAt={approvedAt} approvedTeacher={approvedTeacher} />
          ) : (
            <p className="text-caption1 w-full text-blue-light">{stats}</p>
          )}
        </div>
        <ChevronIcon size={16} className="text-static-black" rotate={-90} />
      </div>
      <div className="w-full flex items-center">
        {isApproved && approvedAt && approvedTeacher ? (
          <Button
            style={{ width: "100%" }}
            buttonType="danger"
            onClick={e => {
              e.stopPropagation();
              toggleApproval();
            }}
          >
            승인취소
          </Button>
        ) : (
          <Button
            style={{ width: "100%" }}
            buttonType="primary"
            onClick={e => {
              e.stopPropagation();
              toggleApproval();
            }}
          >
            승인하기
          </Button>
        )}
      </div>
    </div>
  );
};

export default MobileRoomItem;
