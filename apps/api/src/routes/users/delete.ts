import { deleteUser } from "@itaaj/business-logic";
import { RouteOptions } from "fastify";

export const deleteUserRoute: RouteOptions = {
  method: "PATCH",
  url: "/users/:id/delete",
  handler: async (request, reply) => {
    try {
      const { id } = request.params as { id: string };

      if (!id) {
        reply.status(400).send({ error: "El ID del usuario es requerido" });
        return;
      }

      const result = await deleteUser(id);

      if (result instanceof Error) {
        reply.status(404).send({ error: result.message });
      } else {
        reply.status(200).send({ message: "Usuario eliminado lógicamente" });
      }
    } catch (error) {
      console.error("Error al eliminar lógicamente el usuario:", error);
      reply
        .status(500)
        .send({ error: "Ha ocurrido un error al procesar la solicitud" });
    }
  },
};
