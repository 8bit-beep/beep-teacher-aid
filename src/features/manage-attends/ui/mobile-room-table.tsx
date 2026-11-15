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
    <div className="flex lg:hidden w-full min-h-0 flex-col">
      <div className="w-full flex items-center pl-2 pr-2 lg:pl-10 lg:pr-10 py-3 bg-blue-light">
        <div className="flex-1 min-w-[164px] text-left text-static-white text-body lg:text-h4">
          실 정보
        </div>
        <div
          style={{ width: "120px" }}
          className="text-left text-static-white text-body lg:text-h4 hidden lg:flex"
        >
          승인 시각
        </div>
        <div
          style={{ width: "124px" }}
          className="text-left text-static-white text-body lg:text-h4 hidden lg:flex"
        >
          승인 책임자
        </div>
        <div className="w-full text-left text-static-white text-body lg:text-h4 lg:hidden flex">
          실 정보
        </div>
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
