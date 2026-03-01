import { generateMarketAnalysis } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useGenerateAnalysis = () => {
  const queryClient = useQueryClient();
  const { isLoading: isGenerating, mutate: generate, data } =
    useMutation({
      mutationFn: generateMarketAnalysis,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["market"],
        });
      },
      onError: (err) => console.log(err),
    });

  return { isGenerating, generate, data };
};
