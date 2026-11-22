import type { AbsenceTargetStudent } from "@/entities/absences/types";
import { StudentApi } from "@/entities/students/api";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const getClassKey = (grade: number, classNumber: number) => `${grade}-${classNumber}`;

export const useResolveAbsenceUserIds = (targetStudents: AbsenceTargetStudent[]) => {
  const initialIds = useMemo(
    () =>
      Array.from(
        new Set(
          targetStudents
            .map(student => student.id)
            .filter((id): id is number => id !== undefined && id !== null)
        )
      ),
    [targetStudents]
  );

  const classes = useMemo(
    () =>
      Array.from(
        new Map(
          targetStudents.flatMap(student => {
            const grade = student.info?.grade;
            const classNumber = student.info?.classNumber;

            if (grade == null || classNumber == null) return [];

            return [[getClassKey(grade, classNumber), { grade, classNumber }] as const];
          })
        ).values()
      ),
    [targetStudents]
  );

  const infoIds = useMemo(
    () =>
      targetStudents
        .map(student => student.info?.id)
        .filter((id): id is number => id !== undefined && id !== null),
    [targetStudents]
  );

  const shouldFetch = initialIds.length === 0 && classes.length > 0;

  const { data: fetchedUserIds = [], isPending } = useQuery({
    queryKey: ["resolve-absence-user-ids", classes, infoIds],
    enabled: shouldFetch,
    queryFn: async () => {
      const responses = await Promise.all(
        classes.map(({ grade, classNumber }) => StudentApi.getStudentByClass(grade, classNumber))
      );

      const studentIdByInfoId = new Map<number, number>();

      responses.forEach(response => {
        response.data.forEach(student => {
          studentIdByInfoId.set(student.studentInfo.id, student.id);
        });
      });

      return Array.from(
        new Set(
          infoIds
            .map(infoId => studentIdByInfoId.get(infoId))
            .filter((id): id is number => id !== undefined)
        )
      );
    },
  });

  return {
    resolvedUserIds: initialIds.length > 0 ? initialIds : fetchedUserIds,
    isResolving: shouldFetch && isPending,
  };
};
