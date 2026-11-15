import { useMemo, useState } from "react";
import type { DropdownItem } from "@beep-ds/ui";
import { useGetAttendTypes } from "@/entities/attend-types/queries";
import { useUpdateAttendanceStatusWithCheckpoint } from "@/entities/attendances/mutations";
import type { Attendance } from "@/entities/attendances/types";

export const useUpdateClassroom = (data: Attendance, statusIndex: number, date?: string) => {
  const statuses = useGetAttendTypes().data.data;

  const options: DropdownItem[] = useMemo(
    () => statuses.map(status => ({ name: status.name, value: `${status.id}` })),
    [statuses]
  );

  const currentName = data.statuses[statusIndex]?.status?.name ?? "미출석";
  const serverStatus = useMemo(
    () => options.find(option => option.name === currentName) ?? null,
    [options, currentName]
  );

  const [pendingStatus, setPendingStatus] = useState<DropdownItem | null>(null);
  const status = pendingStatus ?? serverStatus;

  const { mutateAsync } = useUpdateAttendanceStatusWithCheckpoint();
  const checkpointId = data.statuses[statusIndex]?.checkpoint.id;

  const handleSetStatus = async (value: DropdownItem | null) => {
    if (!value || value.name === currentName) return;
    setPendingStatus(value);
    try {
      await mutateAsync({
        userId: data.userId,
        statusId: Number(value.value),
        checkpointId,
        date,
      });
      setPendingStatus(null);
    } catch {
      setTimeout(() => setPendingStatus(null), 100);
    }
  };

  return { status, setStatus: handleSetStatus, options };
};
