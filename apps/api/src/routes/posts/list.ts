import { RouteOptions } from "fastify";
import { getAllPosts } from "@itaaj/business-logic";

export const getAllPostsRoute: RouteOptions = {
  method: "GET",
  url: "/posts",
  handler: async (req, reply) => {
    try {
      const posts = await getAllPosts();
      reply.status(200).send(posts);
    } catch (error) {
      console.error("Error al recuperar los posts:", error);
      reply
        .status(500)
        .send({ error: "Ha ocurrido un error al procesar la solicitud" });
    }
  },
};
