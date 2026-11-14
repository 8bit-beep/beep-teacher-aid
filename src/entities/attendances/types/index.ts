import type { AttendType } from "@/entities/attend-types/types";
import type { Checkpoint } from "@/entities/checkpoints/types";

export interface Attendance {
  userId: number;
  name: string;
  studentId: string;
  username: string;
  statuses: AttendanceStatus[];
  isLate: boolean;
}

export interface AttendanceStatus {
  checkpoint: Omit<Checkpoint, "startAt" | "endAt" | "attendanceStartAt" | "attendanceEndAt">;
  status: AttendType | null;
}
