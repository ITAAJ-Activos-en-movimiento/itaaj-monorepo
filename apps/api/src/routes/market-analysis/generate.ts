import { createDevelopment, createProperty, generateMarketAnalysis } from "@itaaj/business-logic";
import { Development } from "@itaaj/entities";
import { RouteOptions } from "fastify";

export const generateMarketAnalysisRoute: RouteOptions = {
  method: "POST",
  url: "/market-analysis",
  handler: async (request, reply) => {
    const { body } = request;
    const data = body as { state: string };
    const lead = await generateMarketAnalysis(data);
    reply.status(201).send(lead);
  },
};
