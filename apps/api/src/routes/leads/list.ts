import { RouteOptions } from "fastify";
import { getAllLeads } from '@itaaj/business-logic';

export const getAllLeadsRoute: RouteOptions = {
    method: 'GET',
    url: '/leads',
    handler: async (request, reply) => {
        const { query } = request;
        const { page, limit, search } = query as { page: number, limit: number, search: string };
        const leads = await getAllLeads({ page: Number(page), limit: Number(limit), search });
        reply.status(200).send(leads);
    }
}