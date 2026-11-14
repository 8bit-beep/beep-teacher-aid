import { useAppState } from "@b1nd/aid-kit/app-state";

export const CLASSROOM_STATE_KEY = "classroom";
export const DEFAULT_CLASSROOM_VALUE = "1-1";

export const useClassroomFilter = () =>
  useAppState<string>(DEFAULT_CLASSROOM_VALUE, CLASSROOM_STATE_KEY);
