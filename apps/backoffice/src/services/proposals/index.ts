import { itaajApi } from "@/api";

export const getProposalsApi = async () => {
  const { data } = await itaajApi.get(`/proposals`);
  console.log(" PROPOSLS", data);
  return data;
};
