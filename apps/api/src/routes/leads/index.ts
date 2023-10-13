import { RouteOptions } from "fastify";
import { getAllLeadsRoute } from "./list";
import { createLeadRoute } from "./create";

const leadsRoutes: RouteOptions[] = [
    getAllLeadsRoute,
    createLeadRoute
];

export default leadsRoutes;
  