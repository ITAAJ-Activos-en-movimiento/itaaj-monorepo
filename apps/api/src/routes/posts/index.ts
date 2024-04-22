import { RouteOptions } from "fastify";
import { createPostRoute } from "./create";
import { getAllPostsRoute } from "./list";
import { deletePostRoute } from "./delete";

const postsRoutes: RouteOptions[] = [
  createPostRoute,
  getAllPostsRoute,
  deletePostRoute,
];

export default postsRoutes;
