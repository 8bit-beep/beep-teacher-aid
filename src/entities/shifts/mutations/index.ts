import { useMutation } from "@tanstack/react-query";
import { ShiftApi } from "../api";
import type { AxiosError } from "axios";
import type { Error } from "@/shared/types/error";
import { toast } from "@cher1shrxd/toast";
import type { ShiftStatus } from "../types";
import { modal } from "@beep-ds/ui";
import { TOAST_ISSUE_DURATION, TOAST_SUCCESS_DURATION } from "@/shared/constants/toast";
import { refreshQueries } from "@/shared/lib/query-refresh";

export const useUpdateShiftStatus = (shiftId: number) => {
  return useMutation({
    mutationFn: async (status: ShiftStatus) => await ShiftApi.updateShiftStatus(shiftId, status),
    onSuccess: async () => {
      modal.closeAll();
      toast.success(
        "신청 상태 변경 성공",
        "실 이동 신청 상태가 성공적으로 변경되었습니다.",
        TOAST_SUCCESS_DURATION
      );
      await refreshQueries(["shifts"]);
    },
    onError: (error: AxiosError<Error>) => {
      toast.error(
        "근무 상태 변경에 실패했습니다.",
        error.response?.data.message || "네트워크 오류",
        TOAST_ISSUE_DURATION
      );
    },
  });
};
