import { createDevelopmentApi } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateDevelopment = () => {
  const queryClient = useQueryClient();
  const { isLoading: isCreatingDevelopment, mutate: createDevelopment } =
    useMutation({
      mutationFn: createDevelopmentApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["developments"],
        });
      },
      onError: (err) => console.log(err),
    });

  return { isCreatingDevelopment, createDevelopment };
};
