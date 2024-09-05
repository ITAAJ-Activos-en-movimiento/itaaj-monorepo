import { RouteOptions } from "fastify";
import { getAllLeadsRoute } from "./list";
import { createLeadRoute } from "./create";
import { updateLeadRoutes } from "./update";
import { deleteLeadRoute } from "./delete";

const leadsRoutes: RouteOptions[] = [
    getAllLeadsRoute,
    createLeadRoute,
    updateLeadRoutes,
    deleteLeadRoute
];

export default leadsRoutes;
  