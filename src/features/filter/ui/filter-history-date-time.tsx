import { DatePicker } from "@beep-ds/ui";
import { parseDate } from "@/shared/utils/pare-date";
import { useFilterHistoryDateTime } from "../hooks/use-filter-history-date-time";

const FilterHistoryDateTime = () => {
  const { selectedDate, setSelectedDate } = useFilterHistoryDateTime();

  return (
    <DatePicker
      date={new Date(selectedDate)}
      onChangeDate={date => setSelectedDate(parseDate(date))}
      title="기록일 선택"
    />
  );
};

export default FilterHistoryDateTime;
