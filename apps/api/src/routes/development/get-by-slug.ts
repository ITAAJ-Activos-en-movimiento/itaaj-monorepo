import { getDevelopmentById } from "@itaaj/business-logic";
import { RouteOptions } from "fastify";

export const getDevelopmentBySlugRoute: RouteOptions = {
  method: "GET",
  url: "/developments/:slug",
  handler: async (request, reply) => {
    const { params } = request;
    const { slug } = params as {slug: string};
    console.log(slug);
    const development = await getDevelopmentById(slug);
    
    reply.status(200).send(development);
  },
};
