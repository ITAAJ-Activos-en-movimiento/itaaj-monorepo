import { getFunnelById } from "@itaaj/business-logic";
import { RouteOptions } from "fastify";

export const getFunnelByIdRoute: RouteOptions = {
    method: "GET",
    url: "/funnels/:funnelId",
    handler: async (request, reply) => {
        const { params } = request;
        const { funnelId } = params as { funnelId: string };
        const funnel = await getFunnelById(funnelId);
        if(!funnel) return reply.code(404).send();
        return reply.header("x-data-source", "HIT").send(funnel);
    }
}
