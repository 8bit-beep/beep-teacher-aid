import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { ApprovalApi } from "../api";
import { filterApprovals } from "./use-approval-list";
import type { ApprovalListParams } from "./use-approval-list";

export const useGetCurrentApprovalByRoomId = (roomId: number) => {
  return useSuspenseQuery({
    queryKey: ["approvals", roomId],
    queryFn: async () => {
      try {
        const data = (await ApprovalApi.getCurrentApprovalByRoomId(roomId)).data;
        return {
          approved: data.approved,
          approvedTeacherName: data.approvedTeacher?.name,
          approvedAt: data.approvedAt,
        };
      } catch {
        return {
          approved: false,
          approvedTeacherName: null,
          approvedAt: null,
        };
      }
    },
  });
};

export const useApprovalListQuery = (params: ApprovalListParams) => {
  return useQuery({
    queryKey: ["approval-list", params.date, params.floor],
    queryFn: async () => {
      const { data } = await ApprovalApi.getAllApprovals();
      return filterApprovals(data, params);
    },
  });
};

export { useApprovalList } from "./use-approval-list";
export type { ApprovalListParams } from "./use-approval-list";
