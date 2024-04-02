import { getDevelopmentsById } from "@itaaj/business-logic";
import { RouteOptions } from "fastify";

export const listDevelopments: RouteOptions = {
  method: "POST",
  url: "/dashboard/developments",
  handler: async (request, reply) => {
    const { body } = request;
    const data = body as any;
    const properties = await getDevelopmentsById(data.userId)
    reply.status(201).send(properties);
  },
  errorHandler: (error, _, reply) => {
    console.error(error);
    reply.status(500).send(error);
  }
}