import api from "@/shared/libs/api";
import type { AttendType } from "../types";

export const AttendTypeApi = {
  getAttendTypes: async () => {
    return await api.get<AttendType[]>("/types");
  },
};
