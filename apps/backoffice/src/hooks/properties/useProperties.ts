import { getPropertiesApi, propertiesDevelopmentsApi } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useProperties = () => {
  const { isLoading, data: properties } = useQuery({
    queryKey: ["properties"],
    queryFn: () => getPropertiesApi(),
  });

  console.log(properties)
  return { isLoading, properties: properties?.items };
};

export const usePropertiesDevs = () => {
  const { isLoading, data: properties } = useQuery({
    queryKey: ["properties-developments"],
    queryFn: propertiesDevelopmentsApi,
  });

  return { isLoading, properties: properties?.items };
};



