import { useMemo, useState } from "react";
import { Button, modal } from "@beep-ds/ui";
import type { Absence } from "@/entities/absences/types";
import UpdateAbsenceDetailModal from "./update-absence-detail-modal";
import { useGetAbsenceReason } from "../hooks/use-get-absence-reason";
import { CloseIcon } from "@/shared/icons/close-icon";
import DeleteAbsenceModal from "./delete-absence-modal";
import { useSelectStudents } from "@/entities/students/hooks/use-select-students";
import { useResolveAbsenceUserIds } from "../hooks/use-resolve-absence-user-ids";
import { useAbsenceConflictStatus } from "../hooks/use-absence-conflict-status";
import { AbsenceApi } from "@/entities/absences/api";
import { parseDate } from "@/shared/utils/pare-date";
import { toast } from "@cher1shrxd/toast";
import {
  TOAST_DETAIL_DURATION,
  TOAST_ISSUE_DURATION,
  TOAST_SUCCESS_DURATION,
} from "@/shared/constants/toast";
import type { AxiosError } from "axios";
import type { Error } from "@/shared/types/error";
import { refreshQueries } from "@/shared/lib/query-refresh";
import DeleteAbsencesModal from "./delete-absences-modal";
import AddAbsenceReasonModal from "./add-absence-reason-modal";
import SelectStudentsModal from "@/entities/students/ui/select-students-modal";

interface Props {
  data: Absence[];
}

const UpdateAbsenceModal = ({ data }: Props) => {
  const { nameById } = useGetAbsenceReason();
  const [absences, setAbsences] = useState<Absence[]>(data);
  const allTargetStudents = useMemo(
    () => absences.flatMap(absence => absence.targetStudents),
    [absences]
  );
  const { resolvedUserIds: initialSelectedStudents, isResolving } =
    useResolveAbsenceUserIds(allTargetStudents);
  const { selectedStudents, setSelectedStudents } = useSelectStudents(initialSelectedStudents);
  const [isPending, setIsPending] = useState(false);
  const ownAbsenceIds = useMemo(
    () => absences.map(absence => absence.absenceId).filter((id): id is number => id !== null),
    [absences]
  );
  const getLockedStatusName = useAbsenceConflictStatus(absences, {
    ownAbsenceIds,
  });
  const persistedAbsences = absences.filter(
    absence => absence.absenceId !== null && absence.source !== "ATTENDANCE"
  );

  const submit = async () => {
    if (selectedStudents.length === 0) {
      toast.warning("조건 미충족", "외박 학생을 선택해주세요.", TOAST_ISSUE_DURATION);
      return;
    }

    setIsPending(true);

    try {
      const updateResponses = await Promise.all(
        persistedAbsences.map(absence =>
          AbsenceApi.updateAbsence(absence.absenceId!, {
            userIds: selectedStudents,
            startDate: parseDate(new Date(absence.startDate)),
            endDate: parseDate(new Date(absence.endDate)),
            reason: absence.reason,
            typeId: absence.typeId,
            checkpoints: [],
          })
        )
      );

      const skippedUserIds = new Set(
        updateResponses.flatMap(response => response.data.skippedUserIds)
      );

      if (skippedUserIds.size > 0) {
        toast.warning(
          "일부 대상 변경 실패",
          `${skippedUserIds.size}명은 선택한 외박 대상에 반영되지 않았습니다. 이미 등록된 기간과 겹치는지 확인해주세요.`,
          TOAST_DETAIL_DURATION
        );
      } else {
        toast.success(
          "외박 대상 변경 완료",
          "선택한 학생들로 외박 대상이 정상적으로 수정되었습니다.",
          TOAST_SUCCESS_DURATION
        );
      }

      await refreshQueries(["absences"]);
      modal.closeAll();
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      toast.error(
        "외박 대상 변경 실패",
        axiosError.response?.data.message || "외박 대상 변경 중 오류가 발생했습니다.",
        TOAST_ISSUE_DURATION
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex flex-col gap-2">
        {absences.map((absence, index) => {
          const typeName = nameById.get(absence.typeId) ?? "기타";
          const isReadOnly = absence.absenceId === null || absence.source === "ATTENDANCE";
          const absenceKey =
            absence.absenceId === null
              ? `${absence.source}-${absence.targetStudents.map(student => student.name).join("-")}-${absence.startDate}-${index}`
              : `${absence.source}-${absence.absenceId}`;

          return (
            <div
              key={absenceKey}
              className="w-full flex items-center gap-3 rounded-small bg-greyscale-10 px-3 py-3"
            >
              <Button
                buttonSize="medium"
                buttonType="text"
                onClick={() =>
                  modal.open({
                    title: "외박 상세 수정",
                    content: isReadOnly ? null : <UpdateAbsenceDetailModal data={absence} />,
                  })
                }
                disabled={isReadOnly}
                style={{
                  flex: 1,
                  justifyContent: "flex-start",
                  padding: 0,
                  minWidth: "auto",
                  height: "auto",
                }}
              >
                <p className="min-w-0 flex items-center gap-3">
                  <span className="shrink-0 text-body text-blue-light">{typeName}</span>
                  <span className="min-w-0 text-caption2 text-static-black truncate tabular-nums">
                    {absence.startDate} ~ {absence.endDate}
                  </span>
                </p>
              </Button>
              <Button
                buttonSize="small"
                buttonType="text"
                onClick={() =>
                  !isReadOnly &&
                  modal.open({
                    title: "외박 정보를 삭제하시겠습니까?",
                    content: <DeleteAbsenceModal absenceId={absence.absenceId!} />,
                  })
                }
                disabled={isReadOnly}
                style={{ padding: 0, minWidth: "auto", height: "auto" }}
              >
                <CloseIcon />
              </Button>
            </div>
          );
        })}
      </div>
      <Button
        buttonSize="medium"
        buttonType="text"
        onClick={() =>
          modal.open({
            title: "사유 및 기간 추가하기",
            content: (
              <AddAbsenceReasonModal
                selectedStudents={selectedStudents}
                targetStudents={allTargetStudents}
                onAdded={absence => setAbsences(prev => [...prev, absence])}
              />
            ),
          })
        }
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
                  onApply={setSelectedStudents}
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
      <div className="w-full flex items-center gap-2">
        <Button
          buttonSize="large"
          buttonType="primary"
          onClick={submit}
          disabled={
            isResolving ||
            isPending ||
            selectedStudents.length === 0 ||
            persistedAbsences.length === 0
          }
          style={{ flex: 1 }}
        >
          완료
        </Button>
        <Button
          buttonSize="large"
          buttonType="danger"
          onClick={() =>
            modal.open({
              title: "외박 정보를 삭제하시겠습니까?",
              content: (
                <DeleteAbsencesModal
                  absenceIds={persistedAbsences.map(absence => absence.absenceId!)}
                />
              ),
            })
          }
          disabled={isPending || persistedAbsences.length === 0}
          style={{ flex: 1 }}
        >
          삭제
        </Button>
      </div>
    </div>
  );
};

export default UpdateAbsenceModal;
