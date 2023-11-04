import { FastifyInstance, RouteOptions } from "fastify";
import { healthCheckRoute } from "./health-check";
import usersRoutes from "./users";
import authRoutes from "./auth";
import aiRoutes from "./ai";
import leadsRoutes from "./leads";
import propertiesRoutes from "./properties";
import developmentsRoutes from "./development";
import messagesRoutes from "./messages";

const routes: RouteOptions[] = [
  healthCheckRoute,
  ...authRoutes,
  ...usersRoutes,
  ...aiRoutes,
  ...leadsRoutes,
  ...propertiesRoutes,
  ...developmentsRoutes,
  ...messagesRoutes
];

export const registerRoutes = (fastify: FastifyInstance) => {
  console.warn("registering routes", routes);
  routes.map((route) => {
    fastify.route(route);
  });
};
