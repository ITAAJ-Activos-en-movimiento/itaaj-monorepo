import { updateLead } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditLead = () => {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: updateLead,
    onMutate: async (card) => {
      await queryClient.cancelQueries({ queryKey: ["leads"] });

      const data = queryClient.getQueryData<any>(["leads"]);
      if (!data) return;
      console.log("card", card);
      const newCards = data.map((item: any) => {
        return item.id === card.id ? card : item;
      });

      const newPreviousData: any = [...newCards];

      queryClient.setQueryData(["leads"], newPreviousData);

      return newPreviousData;
    },

    onError: (__, _, context) => {
      if (context?.data) {
        queryClient.setQueryData(["leads"], context.data);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });

  return { isEditing: isLoading, editLead: mutate };
};
