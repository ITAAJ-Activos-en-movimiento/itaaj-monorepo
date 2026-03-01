import { RouteOptions } from "fastify";
import { getAllUsersRoute } from "./list";
import { deleteUserRoute } from "./delete";
import { getUsersByIdRoute } from "./get-by-id";
import { updateUserRoute } from "./update";

const usersRoutes: RouteOptions[] = [getAllUsersRoute, deleteUserRoute, getUsersByIdRoute, updateUserRoute];

export default usersRoutes;
