import { getPropertiesApi } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useProperties = () => {
  const { isLoading, data: properties } = useQuery({
    queryKey: ["properties"],
    queryFn: () => getPropertiesApi(),
  });

  return { isLoading, properties };
};
