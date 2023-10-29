import { RouteOptions } from "fastify";
import { getAllDevelopmentsRoute } from "./list";
import { createDevelopmentRoute } from "./create";
import { getDevelopmentBySlugRoute } from "./get-by-slug";

const developmentsRoutes: RouteOptions[] = [
  getAllDevelopmentsRoute,
  createDevelopmentRoute,
  getDevelopmentBySlugRoute
];

export default developmentsRoutes;
