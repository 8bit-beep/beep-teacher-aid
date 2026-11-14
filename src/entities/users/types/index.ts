import type { AttendType } from "@/entities/attend-types/types";
import type { StudentInfo } from "@/entities/students/types";

export interface User {
  id: number;
  email: string;
  name: string;
  role: "STUDENT";
  profileImage: string;
  studentInfo: StudentInfo;
  currentStatus: AttendType | null;
}
