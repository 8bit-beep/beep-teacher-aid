import Segment from "@/shared/ui/segment";
import { FLOOR_OPTIONS } from "../constants/floor";
import { useFilterRoom } from "../hooks/use-filter-room";

const FilterRoom = () => {
  const { floor, setFloor } = useFilterRoom();

  return (
    <div className="w-76">
      <Segment segment={FLOOR_OPTIONS} selected={floor} onSelect={setFloor} />
    </div>
  );
};

export default FilterRoom;
