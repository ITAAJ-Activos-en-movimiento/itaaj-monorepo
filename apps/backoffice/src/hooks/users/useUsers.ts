import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services"; // Asegúrate de importar correctamente tu función getUsers

interface UseUserParams {
  search?: string;
}

export const useUsers = ({ search }: UseUserParams) => {
  const { isLoading, data: users } = useQuery({
    queryKey: ["users", search],
    queryFn: () => getUsers({ search: search || "" }), // Pasa el parámetro de búsqueda a la función getUsers
  });

  return { isLoading, users };
};
