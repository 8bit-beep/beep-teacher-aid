import type { Checkpoint } from "@/entities/checkpoints/types";
import type { Room } from "@/entities/rooms/types";
import type { User } from "@/entities/users/types";

export interface Shift {
  id: number;
  user: User;
  room: Room;
  checkpoint: Checkpoint;
  reason: string;
  status: ShiftStatus;
  date: string;
}

export type ShiftStatus = "WAITING" | "APPROVED" | "REJECTED";
