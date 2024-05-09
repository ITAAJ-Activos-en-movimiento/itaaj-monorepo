import { getFunnels } from "@/services"
import { useQuery } from "@tanstack/react-query"

export const useFunnels = () => {
    const { isLoading, data: funnels } = useQuery({
        queryKey: ["funnels"],
        queryFn: () => getFunnels()
    });

    return { isLoading, funnels }
}