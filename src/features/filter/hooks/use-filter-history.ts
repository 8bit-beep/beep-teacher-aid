import { useHistoriesFloor } from "../stores";
import { useFloorFilter } from "./use-floor-filter";

export const useFilterHistory = () => useFloorFilter(useHistoriesFloor);
