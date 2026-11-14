import { useSuspenseQuery } from "@tanstack/react-query";
import { AttendanceApi } from "../api";

export const useGetAttendancesByRoomId = (roomId: number) => {
  return useSuspenseQuery({
    queryKey: ["attendances", roomId],
    queryFn: async () => await AttendanceApi.getAttendancesByRoomId(roomId),
  });
};

export { useClassroomAttendances } from "./use-classroom-attendances";
