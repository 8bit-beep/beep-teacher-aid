import { modal } from "@beep-ds/ui";
import type { Student } from "../types";
import { useSelectStudents } from "../hooks/use-select-students";
import SelectStudents from "./select-students";

interface Props {
  initialSelectedStudents: number[];
  onApply: (selectedStudents: number[]) => boolean | void | Promise<boolean | void>;
  getLockedStatusName?: (student: Student) => string | undefined;
}

const SelectStudentsModal = ({ initialSelectedStudents, onApply, getLockedStatusName }: Props) => {
  const { selectedStudents, toggleSelected } = useSelectStudents(initialSelectedStudents);

  return (
    <SelectStudents
      selectedStudents={selectedStudents}
      toggleSelected={toggleSelected}
      getLockedStatusName={getLockedStatusName}
      onDone={async () => {
        const isApplied = await onApply(selectedStudents);

        if (isApplied !== false) {
          modal.close();
        }
      }}
    />
  );
};

export default SelectStudentsModal;
