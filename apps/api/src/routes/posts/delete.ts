import { deletePost } from "@itaaj/business-logic";
import { RouteOptions } from "fastify";

const verify = async () => {
  // Lógica de verificación o autenticación si es necesaria
};

export const deletePostRoute: RouteOptions = {
  method: "PATCH",
  url: "/posts/:id/delete",
  handler: async (request, reply) => {
    try {
      const { id } = request.params as { id: string };

      if (!id) {
        reply.status(400).send({ error: "El ID del post es requerido" });
        return;
      }

      const result = await deletePost(id);

      if (result instanceof Error) {
        reply.status(404).send({ error: result.message });
      } else {
        reply.status(200).send({ message: "Post eliminado lógicamente" });
      }
    } catch (error) {
      console.error("Error al eliminar lógicamente el post:", error);
      reply
        .status(500)
        .send({ error: "Ha ocurrido un error al procesar la solicitud" });
    }
  },
};
