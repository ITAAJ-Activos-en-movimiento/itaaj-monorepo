import { itaajApi } from "@/api";
import { Lead } from "@itaaj/entities";

export const updateLead = async (lead: Partial<Lead>) => {
  const { data } = await itaajApi.patch(`/leads/${lead.id}`, lead);
  return data;
};

export const createLead = async (lead: Partial<Lead>) => {
  const { data } = await itaajApi.post(`/leads`, lead, {});
  return data;
};

export const getLeads = async () => {
  const { data } = await itaajApi.get(`/leads`);
  return data;
};

export const deleteLeadApi = async (id: string) => {
  const { data } = await itaajApi.patch(`/leads/${id}/delete`);
  return data;
};
