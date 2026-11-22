import { Dropdown, type DropdownItem } from "@beep-ds/ui";
import CheckIcon from "@/shared/icons/check-icon";

interface Props {
  count: number;
  options: DropdownItem[];
  status: DropdownItem | null;
  setStatus: (item: DropdownItem | null) => void;
  isPending: boolean;
  onApply: () => void;
}

const BatchChangeBar = ({ count, options, status, setStatus, isPending, onApply }: Props) => {
  return (
    <div className="w-full shrink-0 border-t border-greyscale-10 px-4 py-3 flex items-center justify-between gap-2 bg-static-white">
      <div className="min-w-0 flex items-center gap-2">
        <p className="text-body text-static-black whitespace-nowrap">{count}명을</p>
        <div className="shrink-0 compact-dropdown">
          <Dropdown
            openDirection="auto"
            selected={status}
            onSelect={setStatus}
            options={options}
            dropdownSize="small"
            width="104px"
          />
        </div>
        <p className="text-body text-static-black whitespace-nowrap">(으)로 변경하기</p>
      </div>
      <button
        type="button"
        disabled={!status || isPending}
        onClick={onApply}
        aria-label={isPending ? "변경 중" : "변경 완료"}
        className="size-9 shrink-0 rounded-full bg-blue-light text-static-white flex items-center justify-center cursor-pointer disabled:bg-greyscale-20"
      >
        <CheckIcon size={24} />
      </button>
    </div>
  );
};

export default BatchChangeBar;
