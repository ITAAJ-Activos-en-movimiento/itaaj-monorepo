import { createDevelopmentApi } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditDevelopment = () => {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editDevelopment } =
    useMutation({
      mutationFn: createDevelopmentApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["developments"],
        });
      },
      onError: (err) => console.log(err),
    });

  return { isEditing, editDevelopment };
};
