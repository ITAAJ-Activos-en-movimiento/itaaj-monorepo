import { createPostApi } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createPost } = useMutation({
    mutationFn: createPostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (err) => console.error(err),
  });

  return { isCreating, createPost };
};
