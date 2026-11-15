import { useEffect, useRef, useState } from "react";
import type { DropdownItem } from "@beep-ds/ui";
import { useGetAttendTypes } from "@/entities/attend-types/queries";
import { useUpdateAttendanceStatus } from "@/entities/attendances/mutations";
import type { Attendance } from "@/entities/attendances/types";

export const useUpdateAttendance = (data: Attendance, roomId: number) => {
  const statuses = useGetAttendTypes().data.data;
  const parseToOptions: DropdownItem[] = statuses.map(status => ({
    name: status.name,
    value: `${status.id}`,
  }));

  const getStatusFromData = () => {
    const name = data.statuses[0]?.status?.name ?? "미출석";
    return parseToOptions.find(option => option.name === name) || null;
  };

  const [status, setStatus] = useState<DropdownItem | null>(getStatusFromData);
  const isUserAction = useRef(false);

  useEffect(() => {
    if (isUserAction.current) {
      isUserAction.current = false;
      return;
    }
    setStatus(getStatusFromData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.statuses[0]?.status?.name]);

  const { mutateAsync } = useUpdateAttendanceStatus(roomId);

  const handleSetStatus = (value: DropdownItem | null) => {
    isUserAction.current = true;
    setStatus(value);
  };

  const updateStatus = async () => {
    const currentName = data.statuses[0]?.status?.name ?? "미출석";
    if (!status || status.name === currentName) return;
    try {
      await mutateAsync({
        userId: data.userId,
        statusId: Number(status.value),
      });
    } catch {
      setTimeout(() => {
        setStatus(getStatusFromData());
      }, 100);
    }
  };

  useEffect(() => {
    if (status) {
      updateStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const serverStatusName = data.statuses[0]?.status?.name;
  const statusName =
    status && status.name !== (serverStatusName ?? "미출석") ? status.name : serverStatusName;

  return {
    status,
    statusName,
    setStatus: handleSetStatus,
    options: parseToOptions,
  };
};
