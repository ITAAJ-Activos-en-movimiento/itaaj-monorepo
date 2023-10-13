import {
    FastifyInstance,
    RouteOptions,
  } from 'fastify';
import { healthCheckRoute } from './health-check';
import usersRoutes from './users';
import authRoutes from './auth';
import aiRoutes from './ai';
import leadsRoutes from './leads';
  
  const routes: RouteOptions[] = [
    healthCheckRoute,
    ...authRoutes,
    ...usersRoutes,
    ...aiRoutes,
    ...leadsRoutes
  ];
  
  export const registerRoutes = (fastify: FastifyInstance) => {
    console.warn('registering routes', routes);
  
    routes.map((route) => {
      fastify.route(route);
    });
  };