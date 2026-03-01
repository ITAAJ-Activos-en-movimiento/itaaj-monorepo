import { RouteOptions } from "fastify";
import { getAllListingsRoute } from "./list";

const listingsRoutes: RouteOptions[] = [
  getAllListingsRoute,
];

export default listingsRoutes;
