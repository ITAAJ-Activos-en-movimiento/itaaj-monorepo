import { RouteOptions } from 'fastify';
import { listProperties } from './properties/list';

const dashboardRoutes: RouteOptions[] = [
  listProperties
];

export default dashboardRoutes;