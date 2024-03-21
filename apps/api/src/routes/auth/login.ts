import { RouteOptions } from "fastify";
import { login, verifyToken } from '@itaaj/business-logic';
import { User } from "@itaaj/entities";

export const loginUserRoute: RouteOptions = {
    method: 'POST',
    url: '/auth/login',
    handler: async (request, reply) => {
        const { body } = request;
        const data = body as Partial<User>;
        const user = await login({email: data.email, password: data.password});
        const decoded = await verifyToken(user.token)
        
        reply.status(201).send({ user: decoded, token: user.token });
    },
    errorHandler: async (error, _, reply, ) => {
        reply.status(403).send(error);
    }
}