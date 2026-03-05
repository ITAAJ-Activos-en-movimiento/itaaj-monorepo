import { RouteOptions } from "fastify";
import { getAllDevelopmentsAndProperties } from "@itaaj/business-logic";

export const getAllPropertiesDevelopmentsRoute: RouteOptions = {
  method: "GET",
  url: "/properties-developments",
  handler: async (request, reply) => {
    const { query } = request;
    const { page, limit, type, search, state } = query as {  type: string, page: number, limit: number, search: string; state: string };
    const properties = await getAllDevelopmentsAndProperties({page: Number(page), limit: Number(limit), propertyType: type, search: "", state});
    reply.status(200).send(properties);
  },
};


