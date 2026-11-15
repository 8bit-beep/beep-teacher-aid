import { useSuspenseQuery } from "@tanstack/react-query";
import { AbsenceApi } from "../api";

export const useTodayAbsences = () => {
  return useSuspenseQuery({
    queryKey: ["absences", "today"],
    queryFn: async () => await AbsenceApi.getTodayAbsences(),
  });
};
