import type { Dispatch, SetStateAction } from "react";
import type { SegmentItem } from "@/shared/types/segment-item";
import { DEFAULT_FLOOR_VALUE, FLOOR_OPTIONS } from "../constants/floor";

type FloorStateHook = () => [string, Dispatch<SetStateAction<string>>];

export const useFloorFilter = (useFloorState: FloorStateHook) => {
  const [floorValue, setFloorValue] = useFloorState();

  const floor =
    FLOOR_OPTIONS.find(option => option.value === floorValue) ??
    FLOOR_OPTIONS.find(option => option.value === DEFAULT_FLOOR_VALUE) ??
    FLOOR_OPTIONS[0];

  const setFloor = (next: SegmentItem) => {
    setFloorValue(next.value);
  };

  return {
    floor,
    setFloor,
  };
};
