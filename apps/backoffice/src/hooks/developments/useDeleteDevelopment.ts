import { deleteDevelopmentApi } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteDevelopment = () => {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: deleteDevelopment } = useMutation({
      mutationFn: deleteDevelopmentApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["developments"],
        });
      },
      onError: (err) => console.log(err),
    });

  return { isCreating, deleteDevelopment };
};
