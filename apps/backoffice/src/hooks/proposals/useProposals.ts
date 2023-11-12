import { getProposalsApi } from "@/services/proposals";
import { useQuery } from "@tanstack/react-query";

export const useProposals = () => {
  const { isLoading, data: proposals } = useQuery({
    queryKey: ["proposals"],
    queryFn: () => getProposalsApi(),
  });

  return { isLoading, proposals };
};
