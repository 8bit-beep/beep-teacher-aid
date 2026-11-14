import { useState } from "react";

export const usePaging = (initialPage = 0, onPageChange?: (page: number) => void) => {
  const [page, setPage] = useState(initialPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    onPageChange?.(newPage);
  };

  return { page, onPageChange: handlePageChange };
};
