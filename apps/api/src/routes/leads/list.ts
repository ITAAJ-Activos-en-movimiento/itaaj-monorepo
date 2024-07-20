import { RouteOptions } from "fastify";
import { getAllLeads } from "@itaaj/business-logic";

export const getAllLeadsRoute: RouteOptions = {
  method: "GET",
  url: "/leads",
  handler: async (req, reply) => {
    try {
      const posts = await getAllLeads();
      reply.status(200).send(posts);
    } catch (error) {
      console.error("Error al recuperar los leads:", error);
      reply
        .status(500)
        .send({ error: "Ha ocurrido un error al procesar la solicitud" });
    }
  },
};
