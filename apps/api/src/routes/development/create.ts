import { createDevelopment, createProperty } from "@itaaj/business-logic";
import { Development } from "@itaaj/entities";
import { RouteOptions } from "fastify";

export const createDevelopmentRoute: RouteOptions = {
  method: "POST",
  url: "/developments",
  handler: async (request, reply) => {
    const { body } = request;
    const data = body as Development;
    const lead = await createDevelopment(data);
    reply.status(201).send(lead);
  },
};
