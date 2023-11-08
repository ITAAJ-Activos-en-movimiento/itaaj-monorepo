import { RouteOptions } from "fastify";
import { createMessageRoute } from "./create";
import { getAllMessagesRoute } from "./list";

const messagesRoutes: RouteOptions[] = [
  getAllMessagesRoute,
  createMessageRoute,
];

export default messagesRoutes;
