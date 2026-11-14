import { create } from "zustand";
import type { Room } from "@/entities/rooms/types";

interface State {
  room: Room | null;
  setRoom: (room: Room | null) => void;
}

export const useRoomStore = create<State>(set => ({
  room: null,
  setRoom: room => set({ room }),
}));
