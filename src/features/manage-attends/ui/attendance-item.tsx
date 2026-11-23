import { Checkbox, Dropdown } from "@beep-ds/ui";
import type { Attendance } from "@/entities/attendances/types";
import { isAbsenceStatusName, isOutStatusName } from "@/shared/utils/attendance-status";
import { useUpdateAttendance } from "../hooks/use-update-attendance";

interface Props {
  data: Attendance;
  roomId: number;
  selected: boolean;
  onToggleSelect: () => void;
}

const AttendanceItem = ({ data, roomId, selected, onToggleSelect }: Props) => {
  const { status, statusName, setStatus, options } = useUpdateAttendance(data, roomId);
  const currentStatus = statusName;
  const isAbsent = isAbsenceStatusName(currentStatus);
  const isOut = isOutStatusName(currentStatus);

  return (
    <div
      className={`w-full h-15 flex items-center px-4 gap-3 border-b border-greyscale-20 ${currentStatus ? (isAbsent ? "bg-red-light" : isOut ? "bg-green-light" : "bg-static-white") : "bg-greyscale-10"}`}
    >
      <Checkbox checked={selected} onChange={onToggleSelect} />
      <p
        className={`text-caption1 inline-block w-10 shrink-0 tabular-nums ${isAbsent || isOut ? "text-greyscale-10" : "text-greyscale-40"}`}
      >
        {data.studentId}
      </p>
      <p
        className={`min-w-0 text-body truncate ${isAbsent || isOut ? "text-white" : "text-static-black"}`}
      >
        {data.name}
      </p>
      {data.isLate && <div className="w-4.5 h-4.5 rounded-full shrink-0 bg-yellow-400" />}
      <div className="flex-1" />
      <div className="shrink-0 compact-dropdown">
        <Dropdown
          openDirection="auto"
          selected={status}
          onSelect={setStatus}
          options={options}
          dropdownSize="small"
          width="112px"
        />
      </div>
    </div>
  );
};

export default AttendanceItem;
