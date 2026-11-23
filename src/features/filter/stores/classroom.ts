import { createSharedAppState } from "@/shared/lib/shared-app-state";

export const CLASSROOM_STATE_KEY = "classroom";
export const DEFAULT_CLASSROOM_VALUE = "1-1";

export const useClassroomFilter = createSharedAppState(
  CLASSROOM_STATE_KEY,
  DEFAULT_CLASSROOM_VALUE
);
