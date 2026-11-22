import { Button, DatePicker, Dropdown, modal } from "@beep-ds/ui";
import { useCreateAbsence } from "../hooks/use-create-absence";
import { useAbsenceConflictStatus } from "../hooks/use-absence-conflict-status";
import { CloseIcon } from "@/shared/icons/close-icon";
import SelectStudentsModal from "@/entities/students/ui/select-students-modal";

interface Props {
  initialSelectedStudents?: number[];
  initialPhase?: "list" | "add";
}

const CreateAbsenceModal = ({ initialSelectedStudents, initialPhase }: Props) => {
  const {
    phase,
    setPhase,
    selectedStudents,
    applySelectedStudents,
    setSelectedType,
    selectedType,
    reason,
    setReason,
    startAt,
    setStartAt,
    endAt,
    setEndAt,
    options,
    drafts,
    deleteDraft,
    startEditDraft,
    isEditingDraft,
    submitDraft,
    addDisabled,
    resetDraftForm,
    submit,
    disabled,
  } = useCreateAbsence({
    initialSelectedStudents,
    initialPhase,
  });
  const getLockedStatusName = useAbsenceConflictStatus(drafts, {
    requireAll: true,
  });

  if (phase === "add") {
    return (
      <div className="w-full flex flex-col gap-5">
        <div className="w-full flex flex-col gap-0.5 items-start">
          <span className="text-caption1 text-static-black">외박 사유</span>
          <Dropdown
            openDirection="auto"
            onSelect={setSelectedType}
            options={options}
            selected={selectedType}
            dropdownSize="large"
          />
        </div>
        <textarea
          className="w-full h-24 p-4 rounded-medium shadow-modal outline-none resize-none text-body placeholder:text-greyscale-40"
          placeholder="상세한 외박 사유를 작성해주세요. (255자 이내)"
          maxLength={255}
          value={reason}
          onChange={e => setReason(e.target.value.slice(0, 255))}
        />
        <div className="w-full flex flex-col gap-0.5">
          <span className="text-caption1 text-static-black">외박 기간</span>
          <div className="w-full flex items-center gap-2 justify-between date-range">
            <DatePicker date={startAt} onChangeDate={setStartAt} title="시작일 선택" />
            <span className="text-caption1 text-static-black">~</span>
            <DatePicker date={endAt} onChangeDate={setEndAt} title="종료일 선택" />
          </div>
        </div>
        <div className="w-full flex items-center gap-2">
          <Button
            buttonSize="large"
            buttonType="ghost"
            style={{ flex: 1 }}
            onClick={() => {
              resetDraftForm();
              setPhase("list");
            }}
          >
            취소
          </Button>
          <Button
            buttonSize="large"
            buttonType="primary"
            style={{ flex: 1 }}
            onClick={submitDraft}
            disabled={addDisabled}
          >
            {isEditingDraft ? "수정" : "추가"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5">
      {drafts.length > 0 && (
        <div className="w-full flex flex-col gap-2">
          {drafts.map(draft => (
            <div
              key={draft.id}
              className="w-full flex items-center gap-3 rounded-small bg-greyscale-10 px-3 py-3"
            >
              <Button
                buttonSize="medium"
                buttonType="text"
                onClick={() => startEditDraft(draft)}
                style={{
                  flex: 1,
                  justifyContent: "flex-start",
                  padding: 0,
                  minWidth: "auto",
                  height: "auto",
                }}
              >
                <p className="min-w-0 flex items-center gap-3">
                  <span className="shrink-0 text-body text-blue-light">{draft.type.name}</span>
                  <span className="min-w-0 text-caption2 text-static-black truncate tabular-nums">
                    {draft.startDate} ~ {draft.endDate}
                  </span>
                </p>
              </Button>
              <Button
                buttonSize="small"
                buttonType="text"
                onClick={() => deleteDraft(draft.id)}
                style={{ padding: 0, minWidth: "auto", height: "auto" }}
              >
                <CloseIcon />
              </Button>
            </div>
          ))}
        </div>
      )}
      <Button
        buttonSize="medium"
        buttonType="text"
        onClick={() => setPhase("add")}
        style={{
          width: "100%",
          height: "50px",
          background: "var(--color-greyscale-10)",
          borderRadius: "var(--radius-small)",
        }}
      >
        <span className="text-h4 text-blue-light">+</span>
      </Button>

      <div className="w-full flex items-center gap-4">
        <Button
          buttonSize="medium"
          buttonType="ghost"
          showIcon
          className="whitespace-nowrap"
          onClick={() =>
            modal.open({
              title: "대상 선택하기",
              content: (
                <SelectStudentsModal
                  initialSelectedStudents={selectedStudents}
                  onApply={applySelectedStudents}
                  getLockedStatusName={getLockedStatusName}
                />
              ),
            })
          }
        >
          대상 선택하기
        </Button>
        <p className="text-blue-light text-caption1 whitespace-nowrap">
          {selectedStudents.length}명 선택됨
        </p>
      </div>

      <Button
        buttonSize="large"
        buttonType="primary"
        onClick={submit}
        disabled={disabled}
        style={{ width: "100%" }}
      >
        완료
      </Button>
    </div>
  );
};

export default CreateAbsenceModal;
