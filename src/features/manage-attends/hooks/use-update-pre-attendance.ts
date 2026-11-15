import { useState } from "react";
import type { DropdownItem } from "@beep-ds/ui";
import { useGetAttendTypes } from "@/entities/attend-types/queries";
import { useUpdateAttendanceStatusWithCheckpoint } from "@/entities/attendances/mutations";
import type { Attendance } from "@/entities/attendances/types";

export const useUpdatePreAttendance = (data: Attendance) => {
  const attendTypes = useGetAttendTypes().data.data;
  const { mutateAsync } = useUpdateAttendanceStatusWithCheckpoint();

  const parseToOptions: DropdownItem[] = attendTypes.map(type => ({
    name: type.name,
    value: `${type.id}`,
  }));

  const currentStatuses = data.statuses.map(status => ({
    status: status.status
      ? {
          value: `${status.status.id}`,
          name: status.status.name,
        }
      : null,
    checkpoint: {
      value: `${status.checkpoint.id}`,
      name: status.checkpoint.name,
    },
  }));

  const [selectedStatuses, setSelectedStatuses] = useState<(DropdownItem | null)[]>(
    currentStatuses.map(s => s.status)
  );
  const [prevStatuses, setPrevStatuses] = useState(data.statuses);

  if (prevStatuses !== data.statuses) {
    setPrevStatuses(data.statuses);
    setSelectedStatuses(currentStatuses.map(s => s.status));
  }

  const handleStatusChange = async (index: number, value: DropdownItem | null) => {
    const previousValue = selectedStatuses[index];

    setSelectedStatuses((prev: (DropdownItem | null)[]) => {
      const newStatuses = [...prev];
      newStatuses[index] = value;
      return newStatuses;
    });

    if (!value || value.value === currentStatuses[index].status?.value) {
      return;
    }

    try {
      await mutateAsync({
        userId: data.userId,
        checkpointId: Number(currentStatuses[index].checkpoint.value),
        statusId: Number(value.value),
      });
    } catch {
      setTimeout(() => {
        setSelectedStatuses((prev: (DropdownItem | null)[]) => {
          const newStatuses = [...prev];
          newStatuses[index] = previousValue;
          return newStatuses;
        });
      }, 100);
    }
  };

  return {
    currentStatuses,
    selectedStatuses,
    parseToOptions,
    handleStatusChange,
  };
};
