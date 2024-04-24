import { createLead } from "@/services"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const  useCreateLead = () => {
    const queryClient = useQueryClient();
    const { isLoading, mutate } = useMutation({
        mutationFn: createLead,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["leads"]
            })
        },
        onError: (err) => console.log(err)
    })

    return { isCreating: isLoading, createLead: mutate }
}