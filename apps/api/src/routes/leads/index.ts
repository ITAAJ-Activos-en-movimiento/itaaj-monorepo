import { RouteOptions } from "fastify";
import { getAllLeadsRoute } from "./list";
import { createLeadRoute } from "./create";
import { updateLeadRoutes } from "./update";

const leadsRoutes: RouteOptions[] = [
    getAllLeadsRoute,
    createLeadRoute,
    updateLeadRoutes
];

export default leadsRoutes;
  