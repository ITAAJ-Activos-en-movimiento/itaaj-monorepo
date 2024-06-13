import { generateMarketAnalysis } from "@itaaj/business-logic";
import { RouteOptions } from "fastify";

export const generateMarketAnalysisRoute: RouteOptions = {
  method: "POST",
  url: "/market-analysis",
  handler: async (request, reply) => {
    const { body } = request;
    const data = body as { state: string, municipio: string, colonia: string };
    const lead = await generateMarketAnalysis(data);
    reply.status(201).send(lead);
  },
};
