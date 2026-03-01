import { deleteLead } from "@itaaj/business-logic";
import { RouteOptions } from "fastify";

const verify = async () => {
  // Lógica de verificación o autenticación si es necesaria
};

export const deleteLeadRoute: RouteOptions = {
  method: "PATCH",
  url: "/leads/:id/delete",
  handler: async (request, reply) => {
    try {
      const { id } = request.params as { id: string };

      if (!id) {
        reply.status(400).send({ error: "El id del lead es requerido" });
        return;
      }

      const result = await deleteLead(id);

      if (result instanceof Error) {
        reply.status(404).send({ error: result.message });
      } else {
        reply.status(200).send(true);
      }
    } catch (error) {
      console.error("Error al eliminar lógicamente el lead:", error);
      reply
        .status(500)
        .send({ error: "Ha ocurrido un error al procesar la solicitud" });
    }
  },
};
