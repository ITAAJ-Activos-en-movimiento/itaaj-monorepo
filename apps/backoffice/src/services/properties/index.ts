import { itaajApi } from "@/api";
import { Property } from "@itaaj/entities";

export const getPropertiesApi = async () => {
  const { data } = await itaajApi.get(`/properties`);
  return data;
};

export const createPropertiesApi = async (property: Partial<Property>) => {
  const { data } = await itaajApi.post(`/properties`, property);
  return data;
};
