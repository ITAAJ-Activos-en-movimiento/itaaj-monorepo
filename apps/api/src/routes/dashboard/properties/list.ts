import { getPropertiesById } from "@itaaj/business-logic";
import { RouteOptions } from "fastify";

export const listProperties: RouteOptions = {
  method: "POST",
  url: "/dashboard/properties",
  handler: async (request, reply) => {
    const { body } = request;
    const data = body as any;
    const properties = await getPropertiesById(data.userId)
    reply.status(200).send(properties);
  },
  errorHandler: (error, _, reply) => {
    console.error(error);
    reply.status(500).send(error);
  }
}