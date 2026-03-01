import { RouteOptions } from "fastify";
import { runConversation } from '@itaaj/business-logic';

export const chatRoute: RouteOptions = {
    method: 'POST',
    url: '/chat',
    handler: async (request, reply) => {
        const { body } = request;
        const data = body as any;
        const info = await runConversation(data);
        reply.status(201).send(info);
    }
}