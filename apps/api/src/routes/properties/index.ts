import { RouteOptions } from "fastify";
import { getAllPropertiesRoute } from "./list";
import { createPropertyRoute } from "./create";
import { getPropertiesByDevelopmentRoute } from "./get-by-development";
import { getPropertiesBySlugRoute } from "./get-by-slug";
import { updatePropertyRoute } from "./update";
import { deletePropertyRoute } from "./delete";
import { getAllModelsPropertiesRoute } from "./list-models";
import { getAllPropertiesDevelopmentsRoute } from "./list-properties-developments";
import { getPropertiesByUserIdRoute } from "./get-by-user";
import { getPropertiesByIdRoute } from "./get-by-id";

const propertiesRoutes: RouteOptions[] = [
  getAllPropertiesRoute,
  createPropertyRoute,
  getPropertiesByDevelopmentRoute,
  getPropertiesBySlugRoute,
  updatePropertyRoute,
  deletePropertyRoute,
  getAllModelsPropertiesRoute,
  getAllPropertiesDevelopmentsRoute,
  getPropertiesByUserIdRoute,
  getPropertiesByIdRoute
];

export default propertiesRoutes;
