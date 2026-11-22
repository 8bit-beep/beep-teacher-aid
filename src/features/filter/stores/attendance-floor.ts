import { DEFAULT_FLOOR_VALUE } from "@/features/filter/constants/floor";
import { createSharedAppState } from "@/shared/lib/shared-app-state";

export const ATTENDANCE_FLOOR_STATE_KEY = "attendance-floor";

export const useAttendanceFloor = createSharedAppState(
  ATTENDANCE_FLOOR_STATE_KEY,
  DEFAULT_FLOOR_VALUE
);
