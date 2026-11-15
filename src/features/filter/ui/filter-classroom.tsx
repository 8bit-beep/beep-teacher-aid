import { Dropdown } from "@beep-ds/ui";
import { CLASSROOM_OPTIONS } from "../constants/classroom";
import { useFilterClassroom } from "../hooks/use-filter-classroom";

const FilterClassroom = () => {
  const { classroom, setClassroom } = useFilterClassroom();

  return (
    <Dropdown
      selected={classroom}
      onSelect={setClassroom}
      options={CLASSROOM_OPTIONS}
      dropdownSize="medium"
    />
  );
};

export default FilterClassroom;
