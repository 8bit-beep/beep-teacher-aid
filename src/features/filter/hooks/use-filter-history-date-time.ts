import { useEffect, useMemo } from "react";
import { useGetCheckpoints } from "@/entities/checkpoints/queries";
import { useCheckpointStore, useDateStore } from "../stores";

export const useFilterHistoryDateTime = () => {
  const checkpoints = useGetCheckpoints().data.data;
  const options = useMemo(
    () =>
      checkpoints.map(checkpoint => ({
        name: checkpoint.name,
        value: `${checkpoint.id}`,
      })),
    [checkpoints]
  );

  const { checkpoint: selectedCheckpoint, setCheckpoint: setSelectedCheckpoint } =
    useCheckpointStore();
  const { date: selectedDate, setDate: setSelectedDate } = useDateStore();

  useEffect(() => {
    if (!selectedCheckpoint && options.length > 0) {
      setSelectedCheckpoint(options[0]);
    }
  }, [options, selectedCheckpoint, setSelectedCheckpoint]);

  return {
    selectedDate,
    setSelectedDate,
    selectedCheckpoint,
    setSelectedCheckpoint,
    options,
  };
};
