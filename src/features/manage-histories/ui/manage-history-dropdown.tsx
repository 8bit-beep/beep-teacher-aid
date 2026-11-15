import { Dropdown } from "@beep-ds/ui";
import type { Attendance } from "@/entities/attendances/types";
import { useUpdateHistory } from "../hooks/use-update-history";

interface Props {
  data: Attendance;
  roomId: number;
  index: number;
  desktopWidth?: string;
}

const ManageHistoryDropdown = ({ data, roomId, index, desktopWidth = "180px" }: Props) => {
  const { status, setStatus, options } = useUpdateHistory(data, roomId, index);
  const highlightClass =
    status?.name === "미출석" ? "rounded-large outline-2 outline-red-light" : "";

  return (
    <div className={highlightClass}>
      <div className="hidden lg:block">
        <Dropdown
          selected={status}
          onSelect={setStatus}
          options={options}
          dropdownSize="medium"
          width={desktopWidth}
        />
      </div>
      <div className="lg:hidden">
        <Dropdown
          selected={status}
          onSelect={setStatus}
          options={options}
          dropdownSize="medium"
          width="100%"
        />
      </div>
    </div>
  );
};

export default ManageHistoryDropdown;
