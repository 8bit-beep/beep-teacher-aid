export const TAB_PATHS = {
  attendance: "/attendance",
  classroom: "/classroom",
  absences: "/absences",
  shifts: "/shifts",
  histories: "/histories",
} as const;

export const STACK_PATHS = {
  room: "/room",
  events: "/events",
} as const;

export type TabPath = (typeof TAB_PATHS)[keyof typeof TAB_PATHS];
export type StackPath = (typeof STACK_PATHS)[keyof typeof STACK_PATHS];
