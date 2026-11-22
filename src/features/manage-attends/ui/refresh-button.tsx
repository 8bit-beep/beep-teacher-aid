import RefreshIcon from "@/shared/icons/refresh-icon";
import { useRefresh } from "@/shared/hooks/use-refresh";

const RefreshButton = () => {
  const { refresh, isRefreshing } = useRefresh();

  return (
    <button
      type="button"
      onClick={refresh}
      disabled={isRefreshing}
      aria-busy={isRefreshing}
      aria-label={isRefreshing ? "새로고침 중" : "새로고침"}
      className="size-10 shrink-0 rounded-large bg-static-white shadow-modal flex items-center justify-center text-blue-light cursor-pointer disabled:cursor-default"
    >
      <span className={isRefreshing ? "animate-spin" : undefined}>
        <RefreshIcon size={24} />
      </span>
    </button>
  );
};

export default RefreshButton;
