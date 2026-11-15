import { useSuspenseQuery } from "@tanstack/react-query";
import { DEFAULT_FLOOR_VALUE } from "@/features/filter/constants/floor";
import { RoomApi } from "../api";

export const useRooms = (floor?: string) => {
  return useSuspenseQuery({
    queryKey: ["rooms", floor ?? DEFAULT_FLOOR_VALUE],
    queryFn: async () => await RoomApi.getRooms(floor === "other" ? null : floor),
  });
};
