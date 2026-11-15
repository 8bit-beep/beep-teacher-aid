import RefreshIcon from "@/shared/icons/refresh-icon";
import { useRefresh } from "@/shared/hooks/use-refresh";

const RefreshButton = () => {
  const handleRefresh = useRefresh();

  return (
    <button
      type="button"
      onClick={handleRefresh}
      aria-label="새로고침"
      className="size-10 shrink-0 rounded-large bg-static-white shadow-modal flex items-center justify-center text-blue-light cursor-pointer"
    >
      <RefreshIcon size={24} />
    </button>
  );
};

export default RefreshButton;
