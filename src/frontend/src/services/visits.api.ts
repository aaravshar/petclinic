import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export interface VisitCreateData {
  visit_date: string;
  reason?: string;
  diagnosis?: string;
  treatment?: string;
  vet_id?: number | null;
}

export interface VisitData {
  id: number;
  pet_id: number;
  vet_id: number | null;
  visit_date: string;
  reason: string;
  diagnosis: string;
  treatment: string;
  attachment_path: string;
  created_at: string;
}

export const visitsApi = {
  listForPet: async (petId: number): Promise<VisitData[]> => {
    const response = await api.get(`/pets/${petId}/visits`);
    return response.data;
  },

  get: async (id: number): Promise<VisitData> => {
    const response = await api.get(`/visits/${id}`);
    return response.data;
  },

  create: async (petId: number, data: VisitCreateData): Promise<VisitData> => {
    const formData = new FormData();
    formData.append("visit_date", data.visit_date);
    formData.append("reason", data.reason || "");
    formData.append("diagnosis", data.diagnosis || "");
    formData.append("treatment", data.treatment || "");
    if (data.vet_id) formData.append("vet_id", String(data.vet_id));

    const response = await api.post(`/pets/${petId}/visits`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};
