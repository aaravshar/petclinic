import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export interface UserSyncData {
  browser_id: string;
  nickname?: string;
  role?: string;
}

export interface UserData {
  id: number;
  browser_id: string;
  nickname: string;
  role: string;
  created_at: string;
}

export const usersApi = {
  sync: async (data: UserSyncData): Promise<UserData> => {
    const response = await api.post("/users/sync", data);
    return response.data;
  },
};
