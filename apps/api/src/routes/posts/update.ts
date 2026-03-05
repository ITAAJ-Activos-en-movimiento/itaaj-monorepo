import { updatePost } from "@itaaj/business-logic";
import { Post } from "@itaaj/entities";
import { RouteOptions } from "fastify";

export const updatePostRoute: RouteOptions = {
  method: "PUT",
  url: "/posts/:id",
  handler: async (request, reply) => {
    const { id } = request.params as { id: string };
    const data = request.body as Partial<Post>;
    const newData = { id, data };
    console.log("LA INFO", newData);
    const success = await updatePost(data);
    console.log("LA INFO SUCCES", success);
  },
};
