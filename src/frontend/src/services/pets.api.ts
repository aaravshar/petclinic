import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export interface PetCreateData {
  name: string;
  species: string;
  breed?: string;
  birth_date?: string | null;
  owner_id?: number | null;
  microchip_id?: string;
  notes?: string;
}

export interface PetData {
  id: number;
  name: string;
  species: string;
  breed: string;
  birth_date: string | null;
  owner_id: number | null;
  microchip_id: string;
  notes: string;
  created_at: string;
}

export const petsApi = {
  list: async (search?: string): Promise<PetData[]> => {
    const params = search ? { search } : {};
    const response = await api.get("/pets", { params });
    return response.data;
  },

  get: async (id: number): Promise<PetData> => {
    const response = await api.get(`/pets/${id}`);
    return response.data;
  },

  create: async (data: PetCreateData): Promise<PetData> => {
    const response = await api.post("/pets", data);
    return response.data;
  },

  update: async (id: number, data: PetCreateData): Promise<PetData> => {
    const response = await api.put(`/pets/${id}`, data);
    return response.data;
  },
};
