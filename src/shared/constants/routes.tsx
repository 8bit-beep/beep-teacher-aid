import { TAB_PATHS } from "@/shared/config/tabs";
import CalendarIcon from "../icons/calendar-icon";
import DashboardIcon from "../icons/dashboard-icon";
import LabIcon from "../icons/lab-icon";

// 아이콘마다 viewBox 안의 여백이 달라, 탭바에서 같은 크기(약 20px)로 보이도록 크기를 보정한다.

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
    icon: <CalendarIcon size={18} />,
    mobileLabel: "외박자",
  },
] as const;
