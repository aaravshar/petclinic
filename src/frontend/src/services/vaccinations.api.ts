import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export interface VaccinationCreateData {
  vaccine_name: string;
  administered_date: string;
  next_due_date?: string | null;
  lot_number?: string;
}

export interface VaccinationData {
  id: number;
  pet_id: number;
  vaccine_name: string;
  administered_date: string;
  next_due_date: string | null;
  lot_number: string;
}

export const vaccinationsApi = {
  list: async (): Promise<VaccinationData[]> => {
    const response = await api.get("/vaccinations");
    return response.data;
  },

  create: async (petId: number, data: VaccinationCreateData): Promise<VaccinationData> => {
    const response = await api.post(`/pets/${petId}/vaccinations`, data);
    return response.data;
  },
};
