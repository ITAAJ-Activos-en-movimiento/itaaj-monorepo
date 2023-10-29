import { RouteOptions } from "fastify";
import { getAllProperties } from "@itaaj/business-logic";

export const getAllPropertiesRoute: RouteOptions = {
  method: "GET",
  url: "/properties",
  handler: async (req, reply) => {
    const properties = await getAllProperties();
    reply.status(200).send(properties);
  },
};


