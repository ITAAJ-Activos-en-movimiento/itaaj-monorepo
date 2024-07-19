import { RouteOptions } from "fastify";
import { createPostRoute } from "./create";
import { getAllPostsRoute } from "./list";
import { deletePostRoute } from "./delete";
import { getPostBySlugRoute } from "./get-by-slug";
import { updatePostRoute } from "./update";

const postsRoutes: RouteOptions[] = [
  createPostRoute,
  getAllPostsRoute,
  deletePostRoute,
  getPostBySlugRoute,
  updatePostRoute,
];

export default postsRoutes;
