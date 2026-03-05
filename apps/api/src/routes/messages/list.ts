import { RouteOptions } from "fastify";
import { getAllMessages } from '@itaaj/business-logic';

export const getAllMessagesRoute: RouteOptions = {
    method: 'GET',
    url: '/messages',
    handler: async (req, reply) => {
        const messages = await getAllMessages();
        reply.status(200).send(messages);
    }
}