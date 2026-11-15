import { useAttendanceFloor } from "../stores";
import { useFloorFilter } from "./use-floor-filter";

export const useFilterRoom = () => useFloorFilter(useAttendanceFloor);
