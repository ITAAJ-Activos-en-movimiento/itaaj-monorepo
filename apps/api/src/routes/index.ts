import { FastifyInstance, RouteOptions } from "fastify";
import { healthCheckRoute } from "./health-check";
import usersRoutes from "./users";
import authRoutes from "./auth";
import aiRoutes from "./ai";
import leadsRoutes from "./leads";
import propertiesRoutes from "./properties";
import dashboardRoutes from "./dashboard";
import developmentsRoutes from "./development";
import messagesRoutes from "./messages";
import proposalsRoutes from "./proposals";
import postsRoutes from "./posts";
import { funnelsRoutes } from "./funnels";

const routes: RouteOptions[] = [
  healthCheckRoute,
  ...authRoutes,
  ...usersRoutes,
  ...aiRoutes,
  ...leadsRoutes,
  ...propertiesRoutes,
  ...dashboardRoutes,
  ...developmentsRoutes,
  ...messagesRoutes,
  ...proposalsRoutes,
  ...postsRoutes,
  ...funnelsRoutes
];

export const registerRoutes = (fastify: FastifyInstance) => {
  // console.warn("registering routes", routes);
  routes.map((route) => {
    fastify.route(route);
  });
};
