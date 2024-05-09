import { RouteOptions } from "fastify";
import { getAllModelsProperties } from "@itaaj/business-logic";

export const getAllModelsPropertiesRoute: RouteOptions = {
  method: "GET",
  url: "/properties/developments",
  handler: async (request, reply) => {
    const { query } = request;
    const { page, limit, search } = query as { page: number, limit: number, search: string };
    const properties = await getAllModelsProperties({page: Number(page), limit: Number(limit), search: ""});
    reply.status(200).send(properties);
  },
};


