import api from "@/shared/libs/api";
import type { Checkpoint } from "../types";

export const CheckpointApi = {
  getCheckpoints: async () => {
    return await api.get<Checkpoint[]>("/checkpoints");
  },
};
