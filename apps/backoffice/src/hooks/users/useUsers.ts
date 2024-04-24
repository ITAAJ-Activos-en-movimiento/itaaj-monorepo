import { getUsers } from "@/services"
import { useQuery } from "@tanstack/react-query"

export const useUsers = () => {
    const { isLoading, data: users } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers
    });

    return { isLoading, users }
}