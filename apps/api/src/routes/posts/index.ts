import { RouteOptions } from "fastify";
import { createPostRoute } from "./create";
import { getAllPostsRoute } from "./list";
import { deletePostRoute } from "./delete";
import { getPostBySlugRoute } from "./get-by-slug";

const postsRoutes: RouteOptions[] = [
  createPostRoute,
  getAllPostsRoute,
  deletePostRoute,
  getPostBySlugRoute
];

export default postsRoutes;
