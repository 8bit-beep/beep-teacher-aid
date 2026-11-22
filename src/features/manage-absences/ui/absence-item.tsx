import type { Absence } from "@/entities/absences/types";
import { Button, modal } from "@beep-ds/ui";
import UpdateAbsenceModal from "./update-absence-modal";

interface Props {
  data: Absence[];
  studentNum?: string;
  studentName?: string;
}

const MAX_VISIBLE_PERIODS = 2;

// 폰 화면에서는 "26-02-16 ~ 26-02-16"처럼 연도를 두 자리로 줄인다.
const shortDate = (date: string) => (/^\d{4}-/.test(date) ? date.slice(2) : date);

const buildPeriodLabel = (absences: Absence[], short = false) => {
  const format = short ? shortDate : (date: string) => date;
  const periods = [...absences]
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .map(absence => `${format(absence.startDate)} ~ ${format(absence.endDate)}`);

  if (periods.length === 0) {
    return "";
  }

  const visible = periods.slice(0, MAX_VISIBLE_PERIODS).join(", ");

  return periods.length > MAX_VISIBLE_PERIODS ? `${visible} …` : visible;
};

const AbsenceItem = ({ data, studentName, studentNum }: Props) => {
  const displayModalTitle = `${studentNum} ${studentName}`;
  const periodLabel = buildPeriodLabel(data);
  const shortPeriodLabel = buildPeriodLabel(data, true);

  const openDetail = () =>
    modal.open({
      title: displayModalTitle || "",
      content: <UpdateAbsenceModal data={data} />,
    });

  return (
    <div className="w-full px-5 py-2.5 lg:px-2 lg:py-2 xl:py-3 flex flex-col">
      <div className="hidden items-center gap-2 lg:flex">
        <p className="text-body text-greyscale-40 min-w-10 shrink-0 tabular-nums">{studentNum}</p>
        <p className="text-accent text-greyscale-70 min-w-0 truncate">
          {periodLabel ? `${studentName} / ${periodLabel}` : studentName}
        </p>
        <div className="flex-1" />
        <Button buttonSize="small" buttonType="primary" className="shrink-0" onClick={openDetail}>
          상세 및 수정
        </Button>
      </div>
      <div className="flex items-center gap-3 lg:hidden">
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-center gap-2.5">
            <p className="text-caption2 text-greyscale-40 shrink-0 tabular-nums">{studentNum}</p>
            <p className="min-w-0 text-body text-static-black truncate">{studentName}</p>
          </div>
          {shortPeriodLabel && (
            <p className="text-caption1 text-blue-light truncate tabular-nums">
              {shortPeriodLabel}
            </p>
          )}
        </div>
        <Button buttonSize="small" buttonType="primary" className="shrink-0" onClick={openDetail}>
          수정 및 상세
        </Button>
      </div>
    </div>
  );
};

export default AbsenceItem;
