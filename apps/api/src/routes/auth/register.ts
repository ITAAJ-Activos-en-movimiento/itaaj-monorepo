import { RouteOptions } from "fastify";
import { registerUser } from '@itaaj/business-logic';
import { User } from "@itaaj/entities";

export const registerUserRoute: RouteOptions = {
    method: 'POST',
    url: '/auth/register',
    handler: async (request, reply) => {
        const { body } = request;
        const data = body as User;
        const user = await registerUser(data);
        reply.status(201).send(user);
    }
}