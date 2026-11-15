import { Suspense } from "react";
import ManageAttendance from "@/features/manage-attends/ui/manage-attendance";
import { useRoomStore } from "@/shared/stores/room";

const RoomPage = () => {
  const { room } = useRoomStore();

  if (!room) {
    return null;
  }

  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-static-white text-greyscale-50">
          불러오는 중...
        </div>
      }
    >
      <ManageAttendance room={room} />
    </Suspense>
  );
};

export default RoomPage;
