import { RouteOptions } from "fastify";
import { getAllLeads } from '@itaaj/business-logic';

export const getAllLeadsRoute: RouteOptions = {
    method: 'GET',
    url: '/leads',
    handler: async (req, reply) => {
        const leads = await getAllLeads();
        reply.status(200).send(leads);
    }
}