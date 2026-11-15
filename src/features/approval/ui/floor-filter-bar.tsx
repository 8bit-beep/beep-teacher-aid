import { FLOOR_OPTIONS } from "@/features/filter/constants/floor";
import { useAttendanceFloor } from "@/features/filter/stores";
import { FilterBar } from "@/shared/ui/filter-bar";

const FloorFilterBar = () => {
  const [selectedFloor, setSelectedFloor] = useAttendanceFloor();

  return (
    <FilterBar options={FLOOR_OPTIONS} selected={selectedFloor} onChange={setSelectedFloor} />
  );
};

export default FloorFilterBar;
