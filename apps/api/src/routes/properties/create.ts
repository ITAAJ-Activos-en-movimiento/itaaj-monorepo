import { createProperty } from "@itaaj/business-logic";
import { Property } from "@itaaj/entities";
import { RouteOptions } from "fastify";

export const createPropertyRoute: RouteOptions = {
  method: "POST",
  url: "/properties",
  handler: async (request, reply) => {
    const { body } = request;
    const data = body as Property;
    const lead = await createProperty(data);
    reply.status(201).send(lead);
  },
};
