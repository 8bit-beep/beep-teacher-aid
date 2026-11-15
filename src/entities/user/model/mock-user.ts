import type { User } from "./user.schema";

// 일반 브라우저에서 UI를 개발할 때만 사용한다.
export const MOCK_USER = {
  id: 1,
  username: "teacher_mock",
  name: "김교사",
  role: "TEACHER",
  profileImage: null,
  studentInfo: null,
  currentStatus: null,
} satisfies User;
