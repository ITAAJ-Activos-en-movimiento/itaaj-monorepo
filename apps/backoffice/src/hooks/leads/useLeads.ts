import { getLeads } from "@/services/leads";
import { useQuery } from "@tanstack/react-query";

export const useLeads = () => {
  const { isLoading, data: leads } = useQuery({
    queryKey: ["leads"],
    queryFn: getLeads,
  });

  return { isLoading, leads };
};
