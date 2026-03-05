import { RouteOptions } from "fastify";
import { getAllFunnels } from '@itaaj/business-logic';

export const getAllFunnelsRoute: RouteOptions = {
    method: "GET",
    url: "/funnels",
    handler: async (request, reply) => {
        const { query } = request;
        const { page, limit, search } = query as { page: number, limit: number, search: string }
        const rates = await getAllFunnels({ page: Number(page), limit: Number(limit), search });
        return reply.status(200).send(rates);
    }
}