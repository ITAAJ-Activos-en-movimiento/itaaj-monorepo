import { login as loginApi } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLoginEmail = () => {
  const queryClient = useQueryClient();
  const { isLoading: isSending, mutate: login } =
    useMutation({
      mutationFn: loginApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["auth-email"],
        });
      },
      onError: (err) => console.log(err),
    });

  return { isSending, login };
};
