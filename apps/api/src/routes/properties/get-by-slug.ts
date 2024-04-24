import { RouteOptions } from "fastify";
import { getPropertiesBySlug } from "@itaaj/business-logic";

export const getPropertiesBySlugRoute: RouteOptions = {
  method: "GET",
  url: "/property/:slug",
  handler: async (req, reply) => {
    const { slug } = req.params as { slug: string };
    const property = await getPropertiesBySlug(slug);
    reply.status(200).send(property);
  },
};
