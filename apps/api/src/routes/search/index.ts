import { RouteOptions } from "fastify";
import { calculatePolygonRoute } from "./calculate-polygon";

const searchRoutes: RouteOptions[] = [
  calculatePolygonRoute,
];

export default searchRoutes;
