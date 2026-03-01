import { RouteOptions } from "fastify";
import { getBySlug } from "@itaaj/business-logic";

export const getPostBySlugRoute: RouteOptions = {
  method: "GET",
  url: "/posts/:slug",
  handler: async (req, reply) => {
    try {
      const { slug } = req.params as { slug: string };

      const post = await getBySlug(slug);

      if (post) {
        reply.status(200).send(post);
      } else {
        reply.status(404).send({ error: "Post no encontrado" });
      }
    } catch (error) {
      console.error("Error al recuperar el post:", error);
      reply
        .status(500)
        .send({ error: "Ha ocurrido un error al procesar la solicitud" });
    }
  },
};
