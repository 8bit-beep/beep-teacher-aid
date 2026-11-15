import type { Routes } from "@b1nd/aid-kit/navigation";
import AttendancePage from "@/pages/attendance/ui/attendance-page";
import ClassroomPage from "@/pages/classroom/ui/classroom-page";
import EventsPage from "@/pages/events/ui/events-page";
import RoomPage from "@/pages/room/ui/room-page";
import ShiftsPage from "@/pages/shifts/ui/shifts-page";
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
      element: () => <ClassroomPage />,
    },
    {
      path: TAB_PATHS.absences,
      element: () => <div className="min-h-full bg-greyscale-10" />,
    },
    {
      path: TAB_PATHS.shifts,
      element: () => <ShiftsPage />,
    },
    {
      path: TAB_PATHS.histories,
      element: () => <div className="min-h-full bg-greyscale-10" />,
    },
  ],
  stacks: [
    {
      path: STACK_PATHS.room,
      element: () => <RoomPage />,
    },
    {
      path: STACK_PATHS.events,
      element: () => <EventsPage />,
    },
  ],
};
