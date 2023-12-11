import { updateDevelopment } from "@itaaj/business-logic";
import { Development } from "@itaaj/entities";
import { RouteOptions } from "fastify";

export const createDevelopmentRoute: RouteOptions = {
  method: "PUT",
  url: "/developments",
  handler: async (request, reply) => {
    const { body } = request;
    const data = body as Development;
    const lead = await updateDevelopment(data);
    reply.status(201).send(lead);
  },
};
