import { RouteOptions } from "fastify";
import { getPropertiesByDevelopment } from "@itaaj/business-logic";

export const getPropertiesByDevelopmentRoute: RouteOptions = {
  method: "GET",
  url: "/properties/:development",
  handler: async (req, reply) => {
    const { development } = req.params as {development: string};
    
    const properties = await getPropertiesByDevelopment(development);
    // console.log("PROPERTIES", properties)
    reply.status(200).send(properties);
  },
};


