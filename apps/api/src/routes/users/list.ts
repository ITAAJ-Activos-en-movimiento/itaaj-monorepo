import { RouteOptions } from "fastify";
import { getAllUsers } from '@itaaj/business-logic';

export const getAllUsersRoute: RouteOptions = {
    method: 'GET',
    url: '/users',
    handler: async (req, reply) => {
        const users = await getAllUsers();
        reply.status(200).send(users);
    }
}