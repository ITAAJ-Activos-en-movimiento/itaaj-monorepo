import {  createProposal } from "@itaaj/business-logic";
import { RouteOptions } from "fastify";

export const createProposalRoute: RouteOptions = {
  method: "POST",
  url: "/proposals",
  handler: async (request, reply) => {
    const { body } = request;
    const data = body as any;
    const proposal = await createProposal(data);
    reply.status(201).send(proposal);
  },
};
