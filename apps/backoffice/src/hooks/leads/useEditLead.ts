import { updateLead } from "@/services"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useEditLead = () => {

    const queryClient = useQueryClient();
    const { isLoading, mutate } = useMutation({
        mutationFn: updateLead,
        onMutate: async (card) => {
            await queryClient.cancelQueries({ queryKey: ['leads']});

            const data = queryClient.getQueryData<any>(['leads'])
            if(!data) return;

            const newCards = data.items.map((item: any) => {
              console.log(card)
              console.log(item)
              return item.id === card.id ? card : item
          });

            const newPreviousData: any = {
                ...data,
                items: newCards
            }
            queryClient.setQueryData(['leads'], newPreviousData);
            
            return { data: newPreviousData }
        },
        
        onError: (__, _, context) => {
            if (context?.data) {
              queryClient.setQueryData(
                ["leads"],
                context.data
              );
            }
          },
          onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['leads']})
          },
    })

    return { isEditing: isLoading, editLead: mutate }
}