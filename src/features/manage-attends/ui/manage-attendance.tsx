import { Suspense, useCallback } from "react";
import { Button, Checkbox } from "@beep-ds/ui";
import { toast } from "@cher1shrxd/toast";
import { useGetAttendancesByRoomId } from "@/entities/attendances/queries";
import type { Room } from "@/entities/rooms/types";
import { useApprove } from "@/features/manage-approvals/hooks/use-approve";
import { TOAST_ISSUE_DURATION } from "@/shared/constants/toast";
import { useSwipeToClose } from "@/shared/hooks/use-swipe-to-close";
import { CloseIcon } from "@/shared/icons/close-icon";
import { useBatchUpdateAttendance } from "../hooks/use-batch-update-attendance";
import AttendanceItem from "./attendance-item";
import BatchChangeBar from "./batch-change-bar";

interface Props {
  room: Room;
}

const ManageAttendance = ({ room }: Props) => {
  const attendances = useGetAttendancesByRoomId(room.id).data.data;
  const { isApproved, toggleApproval } = useApprove(room.id);
  const {
    options,
    selectedIds,
    batchStatus,
    setBatchStatus,
    isPending,
    toggleSelect,
    toggleSelectAll,
    applyBatch,
  } = useBatchUpdateAttendance(room.id);

  const allSelected = attendances.length > 0 && selectedIds.length === attendances.length;
  const currentStudentCount = attendances.filter(attendance => {
    const status = attendance.statuses[0]?.status;

    return status != null && !["외박", "외출"].includes(status.name);
  }).length;

  const handleClose = useCallback(() => {
    if (!isApproved) {
      toast.warning("승인 부탁드립니다", "출석 확인 후 승인해 주세요.", TOAST_ISSUE_DURATION);
    }
  }, [isApproved]);

  const { handlers, triggerClose, animationClass } = useSwipeToClose(handleClose);

  return (
    <div
      className={`w-full h-full bg-static-white flex flex-col items-start gap-4 px-4 pt-4 ${animationClass}`}
      {...handlers}
    >
      <div className="w-full flex justify-between items-center gap-4">
        <button
          type="button"
          onClick={triggerClose}
          aria-label="닫기"
          className="size-11 shrink-0 bg-static-white shadow-modal rounded-full flex items-center justify-center cursor-pointer"
        >
          <CloseIcon />
        </button>
        <h1 className="min-w-0 text-accent text-static-black truncate">
          {room.grade && room.classNumber
            ? `${room.grade}-${room.classNumber} (${room.name})`
            : room.name}
        </h1>
      </div>
      <div className="w-full flex justify-between items-center gap-3">
        <p className="min-w-0 text-blue-light text-body break-keep">
          {`인원 ${currentStudentCount}/${attendances.length}명`}
          {" · "}
          {`외박 ${attendances.filter(a => a.statuses[0]?.status?.name === "외박").length}명`}
          {" · "}
          {`외출 ${attendances.filter(a => a.statuses[0]?.status?.name === "외출").length}명`}
        </p>
        <div className="shrink-0">
          <Button
            buttonSize="small"
            buttonType={isApproved ? "danger" : "primary"}
            onClick={e => {
              e.stopPropagation();
              toggleApproval();
            }}
          >
            {isApproved ? "승인취소" : "승인하기"}
          </Button>
        </div>
      </div>
      <div className="w-[calc(100%+2rem)] -mx-4 flex-1 min-h-0 flex flex-col overflow-hidden border-t border-greyscale-20 lg:w-full lg:mx-0 lg:border-t-0 lg:rounded-medium lg:shadow-modal">
        <div className="w-full flex-1 overflow-y-auto overscroll-contain">
          {attendances.length > 0 && (
            <div className="w-full h-12 flex items-center px-4 gap-3 border-b border-greyscale-20 bg-static-white sticky top-0 z-[1]">
              <Checkbox
                checked={allSelected}
                onChange={() => toggleSelectAll(attendances.map(a => a.userId))}
              />
              <p
                className={`text-caption1 ${allSelected ? "text-blue-light" : "text-greyscale-40"}`}
              >
                {allSelected ? "전체 해제" : "전체 선택"}
              </p>
              <div className="flex-1" />
              {selectedIds.length > 0 && (
                <p className="text-caption1 text-greyscale-40">{selectedIds.length}명 선택됨</p>
              )}
            </div>
          )}
          <Suspense
            fallback={
              <div className="w-full h-20 flex items-center justify-center text-greyscale-40">
                로딩중...
              </div>
            }
          >
            {attendances.map(attendance => (
              <AttendanceItem
                data={attendance}
                key={attendance.userId}
                roomId={room.id}
                selected={selectedIds.includes(attendance.userId)}
                onToggleSelect={() => toggleSelect(attendance.userId)}
              />
            ))}
          </Suspense>
        </div>
        {selectedIds.length > 0 && (
          <BatchChangeBar
            count={selectedIds.length}
            options={options}
            status={batchStatus}
            setStatus={setBatchStatus}
            isPending={isPending}
            onApply={applyBatch}
          />
        )}
      </div>
    </div>
  );
};

export default ManageAttendance;
