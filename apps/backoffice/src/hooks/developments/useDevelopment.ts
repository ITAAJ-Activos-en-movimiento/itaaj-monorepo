import { getDevelopmentApi } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useDevelopment = () => {
  const { slug } = useParams();
  const { isLoading, data: development } = useQuery({
    queryKey: ["developments", slug],
    queryFn:  () => getDevelopmentApi(slug ?? ""),
  });

  return { isLoading, development };
};
