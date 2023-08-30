import { RouteOptions } from "fastify";
import { getAllUsersRoute } from "./list";

const usersRoutes: RouteOptions[] = [
    getAllUsersRoute,
];

export default usersRoutes;
  