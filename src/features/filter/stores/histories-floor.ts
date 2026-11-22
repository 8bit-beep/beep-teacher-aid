import { DEFAULT_FLOOR_VALUE } from "@/features/filter/constants/floor";
import { createSharedAppState } from "@/shared/lib/shared-app-state";

export const HISTORIES_FLOOR_STATE_KEY = "histories-floor";

export const useHistoriesFloor = createSharedAppState(
  HISTORIES_FLOOR_STATE_KEY,
  DEFAULT_FLOOR_VALUE
);
