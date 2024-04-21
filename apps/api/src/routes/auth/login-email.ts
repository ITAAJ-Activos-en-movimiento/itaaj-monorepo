import { RouteOptions } from "fastify";
import { loginEmail } from '@itaaj/business-logic';

export const loginEmailUserRoute: RouteOptions = {
    method: 'POST',
    url: '/auth/login/email',
    handler: async (request, reply) => {
        const { body } = request;
        const data = body as { email: string };
        console.log(data)
        const user = await loginEmail({email: data.email});
        
        reply.status(201).send({ token: user?.token, type: user?.type });
    },
    errorHandler: async (error, _, reply, ) => {
        reply.status(403).send(error);
    }
}