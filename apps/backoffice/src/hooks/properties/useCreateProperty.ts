import { createPropertiesApi } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateProperties = () => {
  const queryClient = useQueryClient();
  const { isLoading: isCreatingProperties, mutate: createProperties } =
    useMutation({
      mutationFn: createPropertiesApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["properties"],
        });
      },
      onError: (err) => console.log(err),
    });

  return { isCreatingProperties, createProperties };
};
