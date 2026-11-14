import { useAppState } from "@b1nd/aid-kit/app-state";
import { DEFAULT_FLOOR_VALUE } from "@/features/filter/constants/floor";

export const HISTORIES_FLOOR_STATE_KEY = "histories-floor";

export const useHistoriesFloor = () =>
  useAppState<string>(DEFAULT_FLOOR_VALUE, HISTORIES_FLOOR_STATE_KEY);
