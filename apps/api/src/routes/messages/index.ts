import { RouteOptions } from "fastify";
import { createMessageRoute } from "./create";

const messagesRoutes: RouteOptions[] = [
  createMessageRoute,
];

export default messagesRoutes;
