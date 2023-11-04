import { createMessage, createProperty } from "@itaaj/business-logic";
import { Property } from "@itaaj/entities";
import { RouteOptions } from "fastify";

export const createMessageRoute: RouteOptions = {
  method: "POST",
  url: "/messages",
  handler: async (request, reply) => {
    const { body } = request;
    const data = body as any;
    const message = await createMessage(data);
    reply.status(201).send(message);
  },
};
