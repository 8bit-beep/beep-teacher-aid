import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { MemoApi } from "../api";

export const memoQueryOptions = (grade: number) =>
  queryOptions({
    queryKey: ["memos", grade],
    queryFn: async () => {
      const response = await MemoApi.getMemo(grade);

      if (response.status === 404 || !response.data) {
        return {
          ...response,
          data: {
            content: "",
            isRead: true,
            exists: false,
          },
        };
      }

      return {
        ...response,
        data: {
          ...response.data,
          exists: true,
        },
      };
    },
  });

export const useGetMemo = (grade: number) => {
  return useSuspenseQuery({
    ...memoQueryOptions(grade),
    refetchInterval: 5000,
  });
};
