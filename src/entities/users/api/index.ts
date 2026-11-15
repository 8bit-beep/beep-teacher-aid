import api from "@/shared/libs/api";
import type { User } from "../types";

export const UserApi = {
  getMe: async () => {
    return (await api.get<User>("/users/my")).data;
  },
};
