import { useSuspenseQuery } from "@tanstack/react-query";
import { ShiftApi } from "../api";

export const useShifts = () => {
  return useSuspenseQuery({
    queryKey: ["shifts"],
    queryFn: async () => await ShiftApi.getShifts(),
  });
};
