import { RouteOptions } from "fastify";
import { registerUser, verifyToken } from '@itaaj/business-logic';
import { User } from "@itaaj/entities";

export const registerUserRoute: RouteOptions = {
    method: 'POST',
    url: '/auth/register',
    handler: async (request, reply) => {
        const { body } = request;
        const data = body as User;
        const token = await registerUser(data) as string;
        const decoded = await verifyToken(token)
        reply.status(201).send({ token, user: decoded });
    },
    errorHandler: async (error, _, reply) => {
        console.log(error)
        reply.status(403).send(error);
    }
}