import { RouteOptions } from "fastify";
import { getUsersById } from "@itaaj/business-logic";

export const getUsersByIdRoute: RouteOptions = {
  method: "GET",
  url: "/users/:id",
  handler: async (req, reply) => {
    const { id } = req.params as { id: string };
    const user = await getUsersById(id);
    reply.status(200).send(user);
  },
};
