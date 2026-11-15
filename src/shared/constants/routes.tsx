import { TAB_PATHS } from "@/shared/config/tabs";
import CalendarIcon from "../icons/calendar-icon";
import DashboardIcon from "../icons/dashboard-icon";
import HistoryIcon from "../icons/history-icon";
import LabIcon from "../icons/lab-icon";
import PersonIcon from "../icons/person-icon";

export const ROUTES = [
  {
    label: "출석 조회",
    path: TAB_PATHS.attendance,
    icon: <LabIcon size={20} />,
    mobileLabel: "출석",
  },
  {
    label: "반별 조회",
    path: TAB_PATHS.classroom,
    icon: <DashboardIcon size={20} />,
    mobileLabel: "반별",
  },
  {
    label: "외박자 관리",
    path: TAB_PATHS.absences,
    icon: <CalendarIcon size={20} />,
    mobileLabel: "외박자",
  },
  {
    label: "실 이동 관리",
    path: TAB_PATHS.shifts,
    icon: <PersonIcon size={20} />,
    mobileLabel: "실 이동",
  },
  {
    label: "출석 기록 조회",
    path: TAB_PATHS.histories,
    icon: <HistoryIcon size={20} />,
    mobileLabel: "출석 기록",
  },
] as const;
