import { useState } from "react";

export const useSelectStudents = (initData?: number[]) => {
  const [prevInitData, setPrevInitData] = useState(initData);
  const [selectedStudents, setSelectedStudents] = useState<number[]>(initData || []);

  if (initData !== prevInitData) {
    setPrevInitData(initData);
    setSelectedStudents(initData || []);
  }

  const toggleSelected = (studentId: number) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(prev => prev.filter(id => id !== studentId));
    } else {
      setSelectedStudents(prev => [...prev, studentId]);
    }
  };

  return {
    selectedStudents,
    setSelectedStudents,
    toggleSelected,
  };
};
