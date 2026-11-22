import { parseDate } from "@/shared/utils/pare-date";
import { useDateStore } from "../stores";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;
const DAY_OFFSETS = [-3, -2, -1, 0, 1, 2, 3] as const;

const toDate = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, (month || 1) - 1, day || 1);
};

/** 선택한 날짜를 가운데에 두고 앞뒤 3일을 보여 주는 주간 날짜 선택기 */
const FilterHistoryWeek = () => {
  const { date, setDate } = useDateStore();
  const selected = toDate(date);

  const days = DAY_OFFSETS.map(offset => {
    const day = new Date(selected);
    day.setDate(selected.getDate() + offset);

    return day;
  });

  return (
    <div
      className="w-full flex items-center justify-between"
      role="radiogroup"
      aria-label="기록일 선택"
    >
      {days.map(day => {
        const value = parseDate(day);
        const isSelected = value === date;

        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={`${day.getMonth() + 1}월 ${day.getDate()}일 ${WEEKDAYS[day.getDay()]}요일`}
            onClick={() => setDate(value)}
            className="flex-1 min-w-0 flex flex-col items-center gap-1.5 cursor-pointer"
          >
            <span className="text-caption2 text-static-black">{WEEKDAYS[day.getDay()]}</span>
            <span
              className={`size-9 rounded-full flex items-center justify-center text-body tabular-nums ${
                isSelected ? "bg-blue-light text-static-white" : "text-greyscale-40"
              }`}
            >
              {day.getDate()}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterHistoryWeek;
