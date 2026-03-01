import { RouteOptions } from "fastify";
import { getAllListings } from "@itaaj/business-logic";

export const getAllListingsRoute: RouteOptions = {
  method: "GET",
  url: "/listings",
  handler: async (request, reply) => {
    const { query } = request;

    const {
      page,
      limit,
      transaction,
      city,
      propertyType,
      order, 
    } = query as {
      page?: number | string;
      limit?: number | string;
      transaction?: string;
      city?: string;
      propertyType?: string;
      order?: string;
    };

    const listings = await getAllListings({
      page: Number(page),
      limit: Number(limit),
      transaction,
      city,
      propertyType,
      order,
    });

    reply.status(200).send(listings);
  },
};


