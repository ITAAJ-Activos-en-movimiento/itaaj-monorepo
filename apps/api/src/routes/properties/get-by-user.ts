import { getPropertiesByUserId } from "@itaaj/business-logic";
import { RouteOptions } from "fastify";

export const getPropertiesByUserIdRoute: RouteOptions = {
  method: "GET",
  url: "/properties/user/:userId",
  handler: async (req, reply) => {
    const { userId } = req.params as { userId: string };
    if(!userId) reply.status(422).send({ message: 'User not found' });
    const properties = await getPropertiesByUserId(userId);
    reply.status(200).send(properties);
  }
}