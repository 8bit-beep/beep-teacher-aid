import { modal } from "@beep-ds/ui";
import { useMarkAsReadMutation } from "@/entities/memo/mutations";
import { useGetMemo } from "@/entities/memo/queries";
import AlertIcon from "@/shared/icons/alert-icon";
import MemoIcon from "@/shared/icons/memo-icon";
import MemoModal from "./memo-modal";

const DEFAULT_GRADE = 1;

const ManageMemo = () => {
  const { data } = useGetMemo(DEFAULT_GRADE);
  const { mutate: markAsRead } = useMarkAsReadMutation();
  const hasUnread = !data.data.isRead;

  return (
    <button
      type="button"
      className={`relative h-10 px-6 rounded-large shadow-modal flex items-center gap-2.5 bg-static-white cursor-pointer ${
        hasUnread ? "outline-2 outline-red-light" : ""
      }`}
      onClick={() => {
        if (hasUnread && data.data.exists !== false) {
          markAsRead({ grade: DEFAULT_GRADE, content: data.data.content });
        }
        modal.open({ title: "메모", content: <MemoModal /> });
      }}
    >
      <div className="relative">
        {hasUnread && <AlertIcon className="absolute -top-1 -left-1.5 text-red-light" size={12} />}
        <MemoIcon className="text-blue-light" size={20} />
      </div>
      <p className="text-body text-static-black">메모</p>
    </button>
  );
};

export default ManageMemo;
