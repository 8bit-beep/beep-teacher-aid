import { FilterBar } from "@/shared/ui/filter-bar";
import { FLOOR_OPTIONS } from "../constants/floor";
import { useFilterHistory } from "../hooks/use-filter-history";

/** 폰 화면용 층 선택 탭 (밑줄형) */
const FilterHistoryTabs = () => {
  const { floor, setFloor } = useFilterHistory();

  return (
    <FilterBar
      options={FLOOR_OPTIONS}
      selected={floor.value}
      onChange={value => {
        const next = FLOOR_OPTIONS.find(option => option.value === value);

        if (next) {
          setFloor(next);
        }
      }}
    />
  );
};

export default FilterHistoryTabs;
