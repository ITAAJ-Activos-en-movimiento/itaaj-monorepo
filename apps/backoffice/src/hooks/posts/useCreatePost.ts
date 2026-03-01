import { createPostApi } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isCreating, mutate: createPost } = useMutation({
    mutationFn: createPostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      navigate("/blogs");
    },
    onError: (err) => console.log(err),
  });

  return { isCreating, createPost };
};