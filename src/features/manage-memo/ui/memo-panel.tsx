import { Suspense, useEffect, useState, useTransition } from "react";
import { Button } from "@beep-ds/ui";
import { useQueryClient } from "@tanstack/react-query";
import { memoQueryOptions } from "@/entities/memo/queries";
import { useUpdateMemo } from "../hooks/use-update-memo";

const grades = [
  { label: "1학년", value: 1 },
  { label: "2학년", value: 2 },
] as const;

const MemoEditor = ({ grade }: { grade: (typeof grades)[number]["value"] }) => {
  const { memo, onChange, save, isPending } = useUpdateMemo(grade);

  return (
    <div className="w-full flex flex-col gap-4">
      <textarea
        className="w-full h-40 p-3 rounded-medium shadow-modal outline-none resize-none text-caption2 placeholder:text-greyscale-40"
        placeholder="메모를 입력 해주세요."
        value={memo}
        onChange={onChange}
      />
      <Button
        onClick={save}
        disabled={isPending}
        buttonSize="large"
        buttonType="primary"
        style={{ width: "100%" }}
      >
        메모 저장
      </Button>
    </div>
  );
};

const MemoEditorFallback = () => (
  <div className="w-full flex flex-col gap-4">
    <div className="w-full h-40 rounded-medium bg-greyscale-10" />
    <Button disabled buttonSize="large" buttonType="primary" style={{ width: "100%" }}>
      메모 저장
    </Button>
  </div>
);

const MemoPanel = () => {
  const queryClient = useQueryClient();
  const [selectedGrade, setSelectedGrade] = useState<(typeof grades)[number]["value"]>(1);
  const [, startTransition] = useTransition();

  // 학년 전환 시 Suspense fallback으로 높이가 바뀌지 않도록 모든 학년 메모를 미리 불러온다.
  useEffect(() => {
    grades.forEach(({ value }) => {
      void queryClient.prefetchQuery(memoQueryOptions(value));
    });
  }, [queryClient]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex items-center gap-2">
        {grades.map(({ label, value }) => {
          const isActive = selectedGrade === value;

          return (
            <button
              key={value}
              type="button"
              onClick={() => startTransition(() => setSelectedGrade(value))}
              className={`flex-1 h-8 rounded-small text-body transition-colors cursor-pointer ${
                isActive ? "bg-blue-light text-static-white" : "bg-static-white text-blue-light"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="w-full">
        <Suspense fallback={<MemoEditorFallback />}>
          <MemoEditor key={selectedGrade} grade={selectedGrade} />
        </Suspense>
      </div>
    </div>
  );
};

export default MemoPanel;
