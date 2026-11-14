import { useSuspenseQuery } from "@tanstack/react-query";
import { parseDate } from "@/shared/utils/pare-date";
import { ApprovalApi } from "../api";
import type { Approval } from "../types";

export interface ApprovalListParams {
  date?: string;
  floor?: string;
}

export const filterApprovals = (approvals: Approval[], params?: ApprovalListParams): Approval[] => {
  if (!params) return approvals;

  return approvals.filter(approval => {
    if (params.date === "today") {
      if (!approval.approvedAt) {
        return false;
      }

      if (!approval.approvedAt.startsWith(parseDate(new Date()))) {
        return false;
      }
    }

    if (params.floor) {
      if (params.floor === "other") {
        return !["1", "2", "3"].includes(String(approval.room.floor));
      }

      return String(approval.room.floor) === params.floor;
    }

    return true;
  });
};

export const useApprovalList = (params?: ApprovalListParams) => {
  return useSuspenseQuery({
    queryKey: ["approval-list", params?.date, params?.floor],
    queryFn: async () => {
      const { data } = await ApprovalApi.getAllApprovals();
      return filterApprovals(data, params);
    },
  });
};
