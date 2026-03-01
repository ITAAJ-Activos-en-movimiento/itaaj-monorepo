import { updateLead } from "@itaaj/business-logic";
import { RouteOptions } from "fastify";

export const updateLeadRoutes: RouteOptions = {
  method: "PATCH",
  url: "/leads/:leadId",
  handler: async (request, reply) => {
    const { params, body } = request;
    const { leadId } = params as { leadId: string };
    const data = body as any;
    const lead = await updateLead(leadId, data);

    return reply.send(lead);
  },
};
