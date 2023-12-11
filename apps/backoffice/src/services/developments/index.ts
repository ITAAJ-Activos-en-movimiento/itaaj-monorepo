import { itaajApi } from "@/api";
import { Development } from "@itaaj/entities";

export const getDevelopmentsApi = async () => {
  const { data } = await itaajApi.get(`/developments`);
  return data;
};

export const getDevelopmentApi = async (slug: string) => {
  const { data } = await itaajApi.get(`/developments/${slug}`);
  return data;
};

export const createDevelopmentApi = async (development: Partial<Development>) => {
  const { data } = await itaajApi.post(`/developments`, development);
  return data;
};


export const updateDevelopmentApi = async (development: Partial<Development>) => {
  const { data } = await itaajApi.put(`/developments`, development);
  return data;
};
