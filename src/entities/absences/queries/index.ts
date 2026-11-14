import { useQuery } from "@tanstack/react-query";
import { fetchAllAbsences } from "./use-all-absences";

export const useGetAllAbsencesQuery = () => {
  return useQuery({
    queryKey: ["absences", "all"],
    queryFn: fetchAllAbsences,
  });
};

export { useAllAbsences } from "./use-all-absences";
export { useTodayAbsences } from "./use-today-absences";
