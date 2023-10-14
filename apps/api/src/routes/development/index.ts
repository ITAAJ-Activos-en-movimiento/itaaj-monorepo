import { RouteOptions } from "fastify";
import { getAllDevelopmentsRoute } from "./list";
import { createDevelopmentRoute } from "./create";

const developmentsRoutes: RouteOptions[] = [
  getAllDevelopmentsRoute,
  createDevelopmentRoute,
];

export default developmentsRoutes;
