import { RouteOptions } from "fastify";
import { getAllDevelopmentsRoute } from "./list";
import { createDevelopmentRoute } from "./create";
import { getDevelopmentBySlugRoute } from "./get-by-slug";
import { updateDevelopmentRoute } from "./update";

const developmentsRoutes: RouteOptions[] = [
  getAllDevelopmentsRoute,
  createDevelopmentRoute,
  getDevelopmentBySlugRoute,
  updateDevelopmentRoute
];

export default developmentsRoutes;
