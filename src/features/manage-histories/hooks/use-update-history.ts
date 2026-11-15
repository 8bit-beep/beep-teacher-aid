import { useMemo, useState } from "react";
import type { DropdownItem } from "@beep-ds/ui";
import { useGetAttendTypes } from "@/entities/attend-types/queries";
import type { Attendance } from "@/entities/attendances/types";
import { useUpdateHistoryMutation } from "@/entities/histories/mutations";

export const useUpdateHistory = (data: Attendance, roomId: number, index: number) => {
  const statuses = useGetAttendTypes().data.data;

  const options: DropdownItem[] = useMemo(
    () =>
      statuses.map(status => ({
        name: status.name,
        value: `${status.id}`,
      })),
    [statuses]
  );

  const currentStatusName = data.statuses[index]?.status?.name ?? "미출석";
  const checkpointId = data.statuses[index]?.checkpoint.id ?? 0;

  const serverStatus = useMemo(
    () => options.find(option => option.name === currentStatusName) ?? null,
    [options, currentStatusName]
  );

  const [pendingStatus, setPendingStatus] = useState<DropdownItem | null>(null);
  const status = pendingStatus ?? serverStatus;

  const { mutateAsync } = useUpdateHistoryMutation(roomId, checkpointId);

  const setStatus = async (value: DropdownItem | null) => {
    if (!value || value.name === currentStatusName) return;
    setPendingStatus(value);
    try {
      await mutateAsync({ userId: data.userId, statusId: Number(value.value) });
      setPendingStatus(null);
    } catch {
      setTimeout(() => {
        setPendingStatus(null);
      }, 100);
    }
  };

  return {
    status,
    setStatus,
    options,
  };
};
