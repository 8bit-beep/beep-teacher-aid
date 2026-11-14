import { useSuspenseQuery } from "@tanstack/react-query";
import { AttendanceApi } from "../api";

export const useClassroomAttendances = (grade: number, classNumber: number, date?: string) => {
  return useSuspenseQuery({
    queryKey: ["attendances", "classroom", grade, classNumber, date],
    queryFn: async () => await AttendanceApi.getAttendancesByClassroom(grade, classNumber, date),
  });
};
