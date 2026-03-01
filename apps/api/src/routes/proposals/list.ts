import { RouteOptions } from "fastify";
import { getAllProposals } from "@itaaj/business-logic";

export const getAllProposalsRoute: RouteOptions = {
  method: "GET",
  url: "/proposals",
  handler: async (req, reply) => {
    const proposals = await getAllProposals();
    reply.status(200).send(proposals);
  },
};
