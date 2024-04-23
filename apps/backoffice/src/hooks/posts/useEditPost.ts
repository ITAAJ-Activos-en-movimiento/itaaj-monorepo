import { updatePostApi } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditPost = () => {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editPost } = useMutation({
    mutationFn: updatePostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (err) => console.log(err),
  });

  return { isEditing, editPost };
};
