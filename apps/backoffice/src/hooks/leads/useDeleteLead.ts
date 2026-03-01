import { deleteLeadApi } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteLead = () => {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteLead } = useMutation({
    mutationFn: deleteLeadApi,
    onSuccess: () => {
      console.log("ENTRA AL DELETE HOOK")
      queryClient.invalidateQueries({
        queryKey: ["leads"],
      });
    },
    onError: (err) => console.log(err),
  });

  return { isDeleting, deleteLead };
};
