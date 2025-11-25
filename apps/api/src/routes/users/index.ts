import { RouteOptions } from "fastify";
import { getAllUsersRoute } from "./list";
import { deleteUserRoute } from "./delete";
import { getUsersByIdRoute } from "./get-by-id";

const usersRoutes: RouteOptions[] = [getAllUsersRoute, deleteUserRoute, getUsersByIdRoute];

export default usersRoutes;
