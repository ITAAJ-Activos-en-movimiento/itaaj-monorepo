import { fetchMyProfile } from "@itaaj/business-logic";
import { RouteOptions } from "fastify";

export const getMyProfile: RouteOptions = {
  method: "POST",
  url: "/dashboard/profile",
  handler: async (request, reply) => {
    const { body } = request;
    const data = body as any;
    const profile = await fetchMyProfile(data.userId);
    reply.status(201).send(profile[0])
  },
  errorHandler: async (error, _, reply) => {
    console.error(error);
    reply.status(500).send(error)
  }
}