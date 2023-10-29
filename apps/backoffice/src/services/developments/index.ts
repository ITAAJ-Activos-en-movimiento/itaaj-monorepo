import { itaajApi } from "@/api";
import { Development } from "@itaaj/entities";

export const getDevelopmentsApi = async () => {
  const { data } = await itaajApi.get(`/developments`);
  return data;
};

export const createDevelopmentApi = async (development: Partial<Development>) => {
  const { data } = await itaajApi.post(`/developments`, development);
  return data;
};
