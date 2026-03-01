import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useGetPosts = () => {
 const [limit, ] = useState<number>(5000);
 const [page, ] = useState<number>(1);
 const [search, ] = useState<string>('');
 const dispatch = useDispatch();

 useEffect(() => {
 }, [dispatch, limit, page, search]);
 
}