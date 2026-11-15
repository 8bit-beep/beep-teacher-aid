import type { Routes } from "@b1nd/aid-kit/navigation";
import AttendancePage from "@/pages/attendance/ui/attendance-page";
import { STACK_PATHS, TAB_PATHS } from "@/shared/config/tabs";

export const routes: Routes = {
  tabs: [
    {
      path: TAB_PATHS.attendance,
      index: true,
      element: () => <AttendancePage />,
    },
    {
      path: TAB_PATHS.classroom,
      element: () => <div className="min-h-full bg-greyscale-10" />,
    },
    {
      path: TAB_PATHS.absences,
      element: () => <div className="min-h-full bg-greyscale-10" />,
    },
    {
      path: TAB_PATHS.shifts,
      element: () => <div className="min-h-full bg-greyscale-10" />,
    },
    {
      path: TAB_PATHS.histories,
      element: () => <div className="min-h-full bg-greyscale-10" />,
    },
  ],
  stacks: [
    {
      path: STACK_PATHS.room,
      element: () => <div className="min-h-full bg-greyscale-10" />,
    },
    {
      path: STACK_PATHS.events,
      element: () => <div className="min-h-full bg-greyscale-10" />,
    },
  ],
};
