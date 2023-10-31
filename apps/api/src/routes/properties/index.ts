import { RouteOptions } from "fastify";
import { getAllPropertiesRoute } from "./list";
import { createPropertyRoute } from "./create";
import { getPropertiesByDevelopmentRoute } from "./get-by-development";
import { getPropertiesBySlugRoute } from "./get-by-slug";

const propertiesRoutes: RouteOptions[] = [
  getAllPropertiesRoute,
  createPropertyRoute,
  getPropertiesByDevelopmentRoute,
  getPropertiesBySlugRoute
];

export default propertiesRoutes;
