import { generateMarketAnalysis } from "@itaaj/business-logic";
import { RouteOptions } from "fastify";

export const generateMarketAnalysisRoute: RouteOptions = {
  method: "POST",
  url: "/market-analysis",
  handler: async (request, reply) => {
    const { body } = request;
    const data = body as { type: string, state: string, municipio: string, colonia: string };
    const lead = await generateMarketAnalysis({...data, type: data.type, municipality: data.municipio, neighborhood: data.colonia, maxPrice: 900000000});
    reply.status(201).send(lead);
  },
};
