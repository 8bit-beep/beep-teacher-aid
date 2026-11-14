import { useAppState } from "@b1nd/aid-kit/app-state";
import { DEFAULT_FLOOR_VALUE } from "@/features/filter/constants/floor";

export const ATTENDANCE_FLOOR_STATE_KEY = "attendance-floor";

export const useAttendanceFloor = () =>
  useAppState<string>(DEFAULT_FLOOR_VALUE, ATTENDANCE_FLOOR_STATE_KEY);
