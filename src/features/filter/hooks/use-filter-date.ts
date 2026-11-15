import { parseDate } from "@/shared/utils/pare-date";
import { useDateStore } from "../stores";

const toDate = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day);
};

export const useFilterDate = () => {
  const { date: dateString, setDate: setDateString } = useDateStore();
  const date = toDate(dateString);

  const setDate = (next: Date) => {
    setDateString(parseDate(next));
  };

  return { date, setDate };
};
