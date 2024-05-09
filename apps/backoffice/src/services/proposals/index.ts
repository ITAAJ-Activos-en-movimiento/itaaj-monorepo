import { itaajApi } from "@/api";

export const getProposalsApi = async () => {
  const { data } = await itaajApi.get(`/proposals`);
  return data;
};
