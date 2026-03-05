import { updateUser } from "@itaaj/business-logic";
import {  User } from "@itaaj/entities";
import { RouteOptions } from "fastify";

export const updateUserRoute: RouteOptions = {
  method: "PATCH",
  url: "/users/:id",
  handler: async (request, reply) => {
    const { id } = request.params as { id: string };
    const data = request.body as Partial<User>;
    await updateUser(id, data);
    reply.code(204);
  },
};
