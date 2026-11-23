import { useApprovalList } from "@/entities/approvals/queries";
import { useRooms } from "@/entities/rooms/queries";
import { useAttendanceFloor } from "@/features/filter/stores";
import { parseDatetimeToTime } from "@/shared/utils/parse-datetime-to-time";
import MobileRoomItem from "./mobile-room-item";

const MobileRoomTable = () => {
  const [floor] = useAttendanceFloor();
  const { data: roomsResponse } = useRooms(floor);
  const { data: approvals } = useApprovalList({ floor });
  const data = roomsResponse.data;

  return (
    <div className="flex lg:hidden w-full flex-1 min-h-0 flex-col">
      <div className="w-full shrink-0 flex items-center gap-2 px-3 py-3 bg-blue-light text-caption1 text-static-white">
        <div className="w-[38%] shrink-0">실 정보</div>
        <div className="flex-1">승인 정보</div>
      </div>
      <div className="w-full flex-1 overflow-y-auto">
        {data.length === 0 ? (
          <div className="h-20 flex items-center justify-center text-h4 text-greyscale-40">
            내용이 없습니다.
          </div>
        ) : (
          data.map(room => {
            const approval = approvals.find(a => a.room.id === room.id);
            return (
              <MobileRoomItem
                data={room}
                key={room.id}
                approvedAt={
                  approval?.approvedAt ? parseDatetimeToTime(approval.approvedAt) : undefined
                }
                approvedTeacher={approval?.approvedTeacher?.name ?? undefined}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default MobileRoomTable;
