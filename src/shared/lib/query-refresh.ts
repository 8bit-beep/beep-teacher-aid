import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const refreshQueries = (queryKey?: readonly unknown[]) => {
  if (queryKey) {
    return queryClient.invalidateQueries({ queryKey });
  }
  return queryClient.invalidateQueries();
};
