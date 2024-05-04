import { createDevelopmentApi } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteDevelopment = () => {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createDevelopment } =
    useMutation({
      mutationFn: createDevelopmentApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["developments"],
        });
      },
      onError: (err) => console.error(err),
    });

  return { isCreating, createDevelopment };
};
