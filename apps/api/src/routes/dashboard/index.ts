import { RouteOptions } from 'fastify';
import { listDevelopments } from './developments/list';
import { getMyProfile } from './profile/get-my-profile';

const dashboardRoutes: RouteOptions[] = [
  listDevelopments,
  getMyProfile,
];

export default dashboardRoutes;