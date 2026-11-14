import type { AttendType } from "@/entities/attend-types/types";
import type { Checkpoint } from "@/entities/checkpoints/types";

export interface AttendanceSortMode {
  grade: number;
  checkpoint: Omit<Checkpoint, "startAt" | "endAt" | "attendanceStartAt" | "attendanceEndAt">;
  type: AttendType | null;
  defaultType?: AttendType | null;
}

export interface AttendanceSortModes {
  date: string;
  modes: AttendanceSortMode[];
}
