import { RouteOptions } from "fastify";
import { getAllListings } from "@itaaj/business-logic";

export const getAllListingsRoute: RouteOptions = {
  method: "GET",
  url: "/listings",
  handler: async (request, reply) => {
    const { query } = request;
    const { page, limit, transaction, city, type, search, state } = query as {  type: string, page: number, transaction: string, limit: number, city: string, search: string; state: string };
    const listings = await getAllListings({page: Number(page), limit: Number(limit), transaction, city});
    reply.status(200).send(listings);
  },
};


