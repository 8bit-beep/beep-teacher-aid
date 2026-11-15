import type { ReactNode } from "react";
import type { Attendance } from "@/entities/attendances/types";
import ClassroomDropdown from "./classroom-dropdown";

interface Props {
  data: Attendance;
  date?: string;
}

const MobileClassroomItem = ({ data, date }: Props): ReactNode[] =>
  data.statuses.map((statusItem, statusIndex) => (
    <div key={statusItem.checkpoint.id} className="py-2 px-1">
      <ClassroomDropdown data={data} statusIndex={statusIndex} date={date} />
    </div>
  ));

export default MobileClassroomItem;
