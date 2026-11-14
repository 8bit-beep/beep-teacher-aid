import api from "@/shared/libs/api";
import type { AbsenceRequestDto, AbsenceResponseDto } from "../types/dto";
import type { PageResponse } from "@/shared/types/page-response";
import type { Absence } from "../types";

export const AbsenceApi = {
  createAbsence: async (data: AbsenceRequestDto) => {
    return await api.post<AbsenceResponseDto>("/absences", data);
  },

  getAbsences: async (page: number, size = 10) => {
    return await api.get<PageResponse<Absence>>(`/absences?page=${page}&size=${size}`);
  },

  getTodayAbsences: async () => {
    return await api.get<PageResponse<Absence>>("/absences/today?page=0&size=100");
  },

  updateAbsence: async (absenceId: number, data: AbsenceRequestDto) => {
    return await api.patch<AbsenceResponseDto>(`/absences/${absenceId}`, data);
  },

  deleteAbsence: async (absenceId: number) => {
    return await api.delete(`/absences/${absenceId}`);
  },
};
