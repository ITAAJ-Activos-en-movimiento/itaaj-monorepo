import { itaajApi } from "@/api";
import { Post } from "@itaaj/entities";

interface Props {
  page: number;
}

export const getPostsApi = async ({ page }: Props) => {
  const { data } = await itaajApi.get(`/posts?page=${page}`);
  return data;
};

export const createPostApi = async (post: Partial<Post>) => {
  const { data } = await itaajApi.post(`/posts`, post);
  return data;
};

export const deletePostApi = async (uuid: string) => {
  const { data } = await itaajApi.patch(`/posts/${uuid}/delete`);
  return data;
};

export const updatePostApi = async (post: Partial<Post>) => {
  const { data } = await itaajApi.put(`/posts/${post.id}`, post);
  return data;
};

export const getPostByIdApi = async (slug: string) => {
  const { data } = await itaajApi.get(`/posts/${slug}`);
  return data;
};
