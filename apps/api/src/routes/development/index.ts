import { RouteOptions } from "fastify";
import { getAllDevelopmentsRoute } from "./list";
import { createDevelopmentRoute } from "./create";
import { getDevelopmentBySlugRoute } from "./get-by-slug";
import { updateDevelopmentRoute } from "./update";
import { deleteDevelopmentRoute } from "./delete";

const developmentsRoutes: RouteOptions[] = [
  getAllDevelopmentsRoute,
  createDevelopmentRoute,
  getDevelopmentBySlugRoute,
  updateDevelopmentRoute,
  deleteDevelopmentRoute
];

export default developmentsRoutes;
