import { createLead } from "@itaaj/business-logic";
import { Lead } from "@itaaj/entities";
import { RouteOptions } from "fastify";

export const createLeadRoute: RouteOptions = {
    method: 'POST',
    url: '/leads',
    handler: async (request, reply) => {
        const { body } = request;
        const data = body as Lead;
        const lead = await createLead(data);
        reply.status(201).send(lead);
    }
}