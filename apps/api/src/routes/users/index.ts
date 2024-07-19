import { RouteOptions } from "fastify";
import { getAllUsersRoute } from "./list";
import { deleteUserRoute } from "./delete";

const usersRoutes: RouteOptions[] = [getAllUsersRoute, deleteUserRoute];

export default usersRoutes;
