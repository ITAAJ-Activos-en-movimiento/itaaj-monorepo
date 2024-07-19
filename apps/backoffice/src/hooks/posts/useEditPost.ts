import { updatePostApi } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useEditPost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isEditing, mutate: editPost } = useMutation({
    mutationFn: updatePostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      navigate("/blogs");
    },
    onError: (err) => console.log(err),
  });

  return { isEditing, editPost };
};
