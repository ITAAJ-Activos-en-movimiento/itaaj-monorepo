import { getPropertiesDevelopmentApi } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const usePropertiesDevelopments = () => {
  const { isLoading, data: properties } = useQuery({
    queryKey: ["properties/developments"],
    queryFn: () => getPropertiesDevelopmentApi(),
  });

  return { isLoading, properties: properties?.items };
};
