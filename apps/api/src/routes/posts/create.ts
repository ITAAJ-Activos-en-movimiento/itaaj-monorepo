import { createPost } from "@itaaj/business-logic";
import { Post } from "@itaaj/entities";
import { RouteOptions } from "fastify";

export const createPostRoute: RouteOptions = {
  method: "POST",
  url: "/posts",
  handler: async (request, reply) => {
    try {
      const { body } = request;
      const data = body as Post;

      if (!data) {
        reply.status(400).send({ error: "Los datos de entrada son inválidos" });
        return;
      }
      const post = await createPost(data);
      reply.status(201).send(post);
    } catch (error) {
      console.error("Error al crear el post:", error);
      reply
        .status(500)
        .send({ error: "Ha ocurrido un error al procesar la solicitud" });
    }
  },
};
