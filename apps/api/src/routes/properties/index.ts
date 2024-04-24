import { RouteOptions } from "fastify";
import { getAllPropertiesRoute } from "./list";
import { createPropertyRoute } from "./create";
import { getPropertiesByDevelopmentRoute } from "./get-by-development";
import { getPropertiesBySlugRoute } from "./get-by-slug";
import { updatePropertyRoute } from "./update";
import { deletePropertyRoute } from "./delete";

const propertiesRoutes: RouteOptions[] = [
  getAllPropertiesRoute,
  createPropertyRoute,
  getPropertiesByDevelopmentRoute,
  getPropertiesBySlugRoute,
  updatePropertyRoute,
  deletePropertyRoute
];

export default propertiesRoutes;
