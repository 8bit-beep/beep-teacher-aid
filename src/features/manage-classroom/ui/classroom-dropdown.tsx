import { Dropdown } from "@beep-ds/ui";
import type { Attendance } from "@/entities/attendances/types";
import { useUpdateClassroom } from "../hooks/use-update-classroom";

interface Props {
  data: Attendance;
  statusIndex: number;
  desktopWidth?: string;
  date?: string;
}

const ClassroomDropdown = ({ data, statusIndex, desktopWidth = "180px", date }: Props) => {
  const { status, setStatus, options } = useUpdateClassroom(data, statusIndex, date);

  return (
    <>
      <div
        className={`hidden lg:block ${status?.name === "미출석" ? "rounded-large outline-2 outline-red-light" : ""}`}
      >
        <Dropdown
          openDirection="auto"
          selected={status}
          onSelect={setStatus}
          options={options}
          dropdownSize="medium"
          width={desktopWidth}
        />
      </div>
      <div
        className={`lg:hidden ${status?.name === "미출석" ? "rounded-large outline-2 outline-red-light" : ""}`}
      >
        <Dropdown
          openDirection="auto"
          selected={status}
          onSelect={setStatus}
          options={options}
          dropdownSize="medium"
          width="100%"
        />
      </div>
    </>
  );
};

export default ClassroomDropdown;
