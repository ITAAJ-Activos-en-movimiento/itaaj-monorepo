import { getPropertiesApi } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useProperties = () => {
  const { isLoading: isLoadingProperties, data: properties } = useQuery({
    queryKey: ["properties"],
    queryFn: () => getPropertiesApi(),
  });

  return { isLoadingProperties, properties };
};
