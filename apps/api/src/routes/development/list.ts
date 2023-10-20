import { RouteOptions } from "fastify";
import { getAllDevelopments } from "@itaaj/business-logic";

export const getAllDevelopmentsRoute: RouteOptions = {
  method: "GET",
  url: "/developments",
  handler: async (req, reply) => {
    const developments = await getAllDevelopments();
    reply.status(200).send(developments);
  },
};
