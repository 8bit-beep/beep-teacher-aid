import { usePaging } from "../hooks/use-paging";
import PageItem from "./page-item";

interface Props {
  totalPages: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const Pagination = ({ totalPages, currentPage, onPageChange }: Props) => {
  const { page: localPage, onPageChange: handlePageChange } = usePaging(
    currentPage ?? 0,
    onPageChange
  );
  const activePage = currentPage ?? localPage;

  return (
    <div className="w-full h-12 mb-8 flex items-center justify-center gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <PageItem
          number={page}
          isActive={page - 1 === activePage}
          onClick={handlePageChange}
          key={page}
        />
      ))}
    </div>
  );
};

export default Pagination;
