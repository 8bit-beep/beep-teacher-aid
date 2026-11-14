import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AttendanceApi } from "../api";
import type { AxiosError } from "axios";
import type { Error } from "@/shared/types/error";
import { toast } from "@cher1shrxd/toast";
import { TOAST_ISSUE_DURATION } from "@/shared/constants/toast";
import { refreshQueries } from "@/shared/lib/query-refresh";

export const useUpdateAttendanceStatus = (roomId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AttendanceApi.updateAttendanceStatus,
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["attendances", roomId] });
      await refreshQueries(["attendances"]);
    },
    onError: (error: AxiosError<Error>) => {
      toast.error(
        "출석 상태 변경에 실패했습니다.",
        error.response?.data.message || "네트워크 오류",
        TOAST_ISSUE_DURATION
      );
    },
  });
};

export const useUpdateAttendanceStatusWithCheckpoint = () => {
  return useMutation({
    mutationFn: AttendanceApi.updateAttendanceStatusWithCheckpoint,
    onSuccess: async () => {
      await refreshQueries(["attendances"]);
    },
    onError: (error: AxiosError<Error>) => {
      toast.error(
        "출석 상태 변경에 실패했습니다.",
        error.response?.data.message || "네트워크 오류",
        TOAST_ISSUE_DURATION
      );
    },
  });
};

export const useUpdateAttendanceStatusBatch = (roomId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AttendanceApi.updateAttendanceStatuses,
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["attendances", roomId] });
      await refreshQueries(["attendances"]);
    },
    onError: (error: AxiosError<Error>) => {
      toast.error(
        "출석 상태 일괄 변경에 실패했습니다.",
        error.response?.data.message || "네트워크 오류",
        TOAST_ISSUE_DURATION
      );
    },
  });
};
