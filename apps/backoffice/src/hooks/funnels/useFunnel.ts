import { getFunnel } from "@/services";
import { Funnel } from "@itaaj/entities";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

interface Result {
  isLoading: boolean;
  funnel: Funnel;
}

export const useFunnel = (): Result => {
  const { id } = useParams();
  const { isLoading, data: funnel } = useQuery({
    queryKey: ["funnel", id],
    queryFn: () => getFunnel(id!),
  });

  return { isLoading, funnel };
};
