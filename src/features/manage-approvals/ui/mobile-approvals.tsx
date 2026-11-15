import { Button } from "@beep-ds/ui";
import { parseDatetimeToTime } from "@/shared/utils/parse-datetime-to-time";
import { useApprove } from "../hooks/use-approve";

interface Props {
  approvalId: number;
}

const MobileApprovals = ({ approvalId }: Props) => {
  const { toggleApproval, isApproved, teacher, approvedAt } = useApprove(approvalId);

  return (
    <Button
      buttonSize="small"
      buttonType={isApproved ? "danger" : "primary"}
      onClick={toggleApproval}
    >
      {isApproved ? `${parseDatetimeToTime(approvedAt!)} · ${teacher}` : "승인하기"}
    </Button>
  );
};

export default MobileApprovals;
