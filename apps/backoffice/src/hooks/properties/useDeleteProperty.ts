import { deletePropertyApi } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteProperty } = useMutation({
    mutationFn: deletePropertyApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["properties"],
      });
    },
  });

  return { isDeleting, deleteProperty };
};
