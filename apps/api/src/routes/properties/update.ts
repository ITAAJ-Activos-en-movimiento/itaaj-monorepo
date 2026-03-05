import { updateProperty } from "@itaaj/business-logic";
import { Property } from "@itaaj/entities";
import { RouteOptions } from "fastify";

export const updatePropertyRoute: RouteOptions = {
  method: "PUT",
  url: "/properties/:id",
  handler: async (request, reply) => {
    const { id } = request.params as { id: string };
    const data = request.body as Partial<Property>;
    console.log("LA INFO", data);
    const success = await updateProperty(id, data);
  },
};
