import { RouteOptions } from "fastify";
import { chatRoute } from "./chat";

const aiRoutes: RouteOptions[] = [
    chatRoute
];

export default aiRoutes;
  