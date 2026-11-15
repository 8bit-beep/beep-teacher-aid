import Segment from "@/shared/ui/segment";
import { FLOOR_OPTIONS } from "../constants/floor";
import { useFilterHistory } from "../hooks/use-filter-history";

const FilterHistory = () => {
  const { floor, setFloor } = useFilterHistory();

  return (
    <div className="w-76">
      <Segment segment={FLOOR_OPTIONS} selected={floor} onSelect={setFloor} />
    </div>
  );
};

export default FilterHistory;
