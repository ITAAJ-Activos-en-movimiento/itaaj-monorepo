import { getPropertiesApi } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useProperties = () => {
  const { isLoading, data: properties } = useQuery({
    queryKey: ["properties"],
    queryFn: () => getPropertiesApi(),
  });

  console.log(properties)
  return { isLoading, properties: properties?.items };
};
