import { getPosts } from "@/redux/states";
import { AppStore } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useGetPosts = () => {
 const [limit, setLimit] = useState<number>(5000);
 const [page, setPage] = useState<number>(1);
 const [search, setSearch] = useState<string>('');
 
 const { loading, result } = useSelector((state: AppStore) => state.posts);

 const dispatch = useDispatch();

 useEffect(() => {
     dispatch(getPosts({ limit, page, search }) as any);
 }, [dispatch, limit, page, search]);
 
 return {
   loading,
   posts: result
 }
}