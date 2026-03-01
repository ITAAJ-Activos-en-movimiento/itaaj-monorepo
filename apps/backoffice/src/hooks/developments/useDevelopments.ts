import { getDevelopmentsApi } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useDevelopments = () => {
  const { isLoading, data: developments } = useQuery({
    queryKey: ["developments"],
    queryFn:  getDevelopmentsApi,
  });

  return { isLoading, developments: developments?.items };
};
