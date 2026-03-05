import { updatePropertyApi } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editProperty } = useMutation({
    mutationFn: updatePropertyApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["properties"],
      });
    },
    onError: (err) => console.log(err),
  });

  return { isEditing, editProperty };
};
