import { getPostsApi } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const usePosts = () => {
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isLoading, data: posts } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => getPostsApi({ page }),
  });

  return { isLoading, posts };
};
