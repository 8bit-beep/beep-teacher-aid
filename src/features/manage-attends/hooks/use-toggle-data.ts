import { useRouter } from "@b1nd/aid-kit/navigation";
import { useGetAttendancesByRoomId } from "@/entities/attendances/queries";
import type { Room } from "@/entities/rooms/types";
import { STACK_PATHS } from "@/shared/config/tabs";
import { useRoomStore } from "@/shared/stores/room";

export const useToggleData = (data: Room) => {
  const attendances = useGetAttendancesByRoomId(data.id).data.data;
  const { setRoom } = useRoomStore();
  const { stack } = useRouter();

  const toggleOpen = () => {
    setRoom(data);
    stack.push(STACK_PATHS.room);
  };

  return {
    attendances,
    toggleOpen,
  };
};
