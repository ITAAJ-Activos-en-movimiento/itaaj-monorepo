import { RouteOptions } from "fastify";
import { getAllUsers } from "@itaaj/business-logic";

export const getAllUsersRoute: RouteOptions = {
  method: "GET",
  url: "/users",
  handler: async (req: any, reply) => {
    try {
      const search = req.query.search || ""; // Obtén el parámetro de búsqueda de la query string
      const users = await getAllUsers({ search }); // Pasa el parámetro de búsqueda a la función getAllUsers
      reply.status(200).send(users);
    } catch (error: any) {
      reply.status(500).send({
        message: "An error occurred while fetching users.",
        error: error.message,
      });
    }
  },
};
