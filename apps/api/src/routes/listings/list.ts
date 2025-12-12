import { RouteOptions } from "fastify";
import { getAllListings } from "@itaaj/business-logic";

export const getAllListingsRoute: RouteOptions = {
  method: "GET",
  url: "/listings",
  handler: async (request, reply) => {
    const { query } = request;
    const { page, limit, transaction, city, propertyType, type, search, state } = query as {  type: string, page: number, transaction: string, propertyType: string, limit: number, city: string, search: string; state: string };
    const listings = await getAllListings({page: Number(page), limit: Number(limit), transaction, city, propertyType});
    reply.status(200).send(listings);
  },
};


