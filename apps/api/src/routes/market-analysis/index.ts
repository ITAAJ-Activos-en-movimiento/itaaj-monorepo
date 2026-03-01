import { RouteOptions } from "fastify";
import { generateMarketAnalysisRoute } from "./generate";

const marketRoutes: RouteOptions[] = [
  generateMarketAnalysisRoute,
];

export default marketRoutes;
