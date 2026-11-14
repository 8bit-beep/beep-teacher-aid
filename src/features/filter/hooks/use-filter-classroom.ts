import type { DropdownItem } from "@beep-ds/ui";
import { CLASSROOM_OPTIONS } from "../constants/classroom";
import { useClassroomFilter } from "../stores";

export const useFilterClassroom = () => {
  const [classroomValue, setClassroomValue] = useClassroomFilter();

  const classroom =
    CLASSROOM_OPTIONS.find(option => option.value === classroomValue) ?? CLASSROOM_OPTIONS[0];

  const setClassroom = (next: DropdownItem) => {
    setClassroomValue(next.value);
  };

  return {
    classroom,
    setClassroom,
  };
};
