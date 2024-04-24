import { getPropertyApi } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useProperty = () => {
  const { slug } = useParams();
  const { isLoading, data: property } = useQuery({
    queryKey: ["properties", slug],
    queryFn: () => getPropertyApi(slug!),
  });

  return { isLoading, property };
};
