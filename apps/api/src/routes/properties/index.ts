import { RouteOptions } from "fastify";
import { getAllPropertiesRoute } from "./list";
import { createPropertyRoute } from "./create";

const propertiesRoutes: RouteOptions[] = [
  getAllPropertiesRoute,
  createPropertyRoute,
];

export default propertiesRoutes;
