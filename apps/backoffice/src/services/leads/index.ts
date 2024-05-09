import { itaajApi } from "@/api";
import axios from "axios";


export const updateLead = async (lead: any) => {
  const { data } = await itaajApi.patch(`/leads/${lead.id}`, lead);
  return data;
};

export const createLead = async ({
  lead}: { lead: any }
) => {
  const { data } = await itaajApi.post(`/leads`, lead, {
  });
  return data;
};

export const getLeads = async () => {
    const { data } = await axios.get(`https://itaajrealty.com/api/api/v1/leads`);
    return data;
  };
  