import { useGetAllCheckpointHistories } from "@/entities/histories/queries";
import type { Room } from "@/entities/rooms/types";
import { useDateStore } from "@/features/filter/stores/date";
import { MOBILE_STATUS_CELL_WIDTH } from "@/shared/constants/table-widths";
import ManageHistoryDropdown from "./manage-history-dropdown";

interface Props {
  room: Room;
}

const MobileHistoriesDropdownContent = ({ room }: Props) => {
  const { date } = useDateStore();
  const histories = useGetAllCheckpointHistories(room.id, date).data.data;

  const checkpoints = histories[0]?.statuses.map(s => s.checkpoint) ?? [];

  return (
    <div className="w-full overflow-x-auto bg-static-white slide-in-down">
      <div className="min-w-full w-max">
        <div className="flex gap-2.5 px-4 py-2.5">
          {checkpoints.map(checkpoint => (
            <p
              key={checkpoint.id}
              className={`${MOBILE_STATUS_CELL_WIDTH} shrink-0 text-center text-caption2 text-greyscale-60 whitespace-nowrap`}
            >
              {checkpoint.name}
            </p>
          ))}
        </div>
        {histories.map((history, index) => (
          <div
            key={history.userId}
            className={`flex flex-col gap-1.5 px-4 pt-2 pb-3 ${index % 2 === 0 ? "bg-[#EFF8FF]" : "bg-static-white"}`}
          >
            <div className="sticky left-4 w-fit flex items-center gap-2">
              <p className="text-caption2 text-greyscale-40 tabular-nums">{history.studentId}</p>
              <p className="text-body text-static-black">{history.name}</p>
            </div>
            <div className="flex gap-2.5">
              {history.statuses.map((statusItem, statusIndex) => (
                <div
                  key={statusItem.checkpoint.id}
                  className={`${MOBILE_STATUS_CELL_WIDTH} shrink-0 compact-dropdown`}
                >
                  <ManageHistoryDropdown data={history} roomId={room.id} index={statusIndex} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileHistoriesDropdownContent;
