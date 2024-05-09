import { updateDevelopmentApi } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditDevelopment = () => {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editDevelopment } =
    useMutation({
      mutationFn: updateDevelopmentApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["developments"],
        });
      },
      onError: (err) => console.error(err),
    });

  return { isEditing, editDevelopment };
};
