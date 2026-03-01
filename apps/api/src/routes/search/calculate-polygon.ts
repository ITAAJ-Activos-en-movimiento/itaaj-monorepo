import { calculatePolygon, createPost } from "@itaaj/business-logic";
import { RouteOptions } from "fastify";

export const calculatePolygonRoute: RouteOptions = {
  method: "POST",
  url: "/search/calculate-polygon",
  handler: async (request, reply) => {
    try {
      const { body } = request;
      const data = body as { address: string, maxTime: number, transport: string };

      if (!data) {
        reply.status(400).send({ error: "Los datos de entrada son inválidos" });
        return;
      }
      const post = await calculatePolygon(data);
      console.log(post)
      reply.status(200).send(post);
    } catch (error) {
      console.error("Error al calcular ruta:", error);
      reply
        .status(500)
        .send({ error: "Ha ocurrido un error al procesar la solicitud" });
    }
  },
};
