import { RouteOptions } from "fastify";
import { getPropertiesById } from "@itaaj/business-logic";

export const getPropertiesByIdRoute: RouteOptions = {
  method: "GET",
  url: "/properties/:id/listing",
  handler: async (req, reply) => {
    const { id } = req.params as { id: string };
    const property = await getPropertiesById(id);
    reply.status(200).send(property);
  },
};
