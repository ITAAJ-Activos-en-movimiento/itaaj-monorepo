import { getFunnel } from "@/services"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom";

interface Result {
    isLoading: boolean,
    funnel: any,
}

export const useFunnel = (): Result => {
    const { id } = useParams();
    const { isLoading,  data: funnel,  } = useQuery({
        queryKey: ["funnel", id],
        queryFn: () => getFunnel(id!)
    });

    return { isLoading, funnel }
}