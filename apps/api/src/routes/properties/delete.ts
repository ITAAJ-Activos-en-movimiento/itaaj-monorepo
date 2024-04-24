import { deleteProperty } from "@itaaj/business-logic";
import { RouteOptions } from "fastify";

export const deletePropertyRoute: RouteOptions = {
  method: "PATCH",
  url: "/properties/:id/delete",
  handler: async (request, reply) => {
    try {
      const { id } = request.params as { id: string };

      if (!id) {
        reply.status(400).send({ error: "El ID de la propiedad es requerido" });
        return;
      }

      const result = await deleteProperty(id);

      if (result instanceof Error) {
        reply.status(404).send({ error: result.message });
      } else {
        reply.status(200).send({ message: "propiedad eliminada" });
      }
    } catch (error) {
      console.error("Error al eliminar la propiedad:", error);
      reply
        .status(500)
        .send({ error: "Ha ocurrido un error al procesar la solicitud" });
    }
  },
};
