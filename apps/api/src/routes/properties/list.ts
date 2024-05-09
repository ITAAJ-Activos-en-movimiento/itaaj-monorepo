import { RouteOptions } from "fastify";
import { getAllProperties } from "@itaaj/business-logic";

export const getAllPropertiesRoute: RouteOptions = {
  method: "GET",
  url: "/properties",
  handler: async (request, reply) => {
    const { query } = request;
    const { page, limit, search } = query as { page: number, limit: number, search: string };
    const properties = await getAllProperties({page: Number(page), limit: Number(limit), search: ""});
    reply.status(200).send(properties);
  },
};


