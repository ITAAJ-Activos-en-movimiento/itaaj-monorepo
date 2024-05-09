import { RouteOptions } from "fastify";
import { getAllDevelopments } from "@itaaj/business-logic";

export const getAllDevelopmentsRoute: RouteOptions = {
  method: "GET",
  url: "/developments",
  handler: async (request, reply) => {
    const { query } = request;
    const { page, limit, search } = query as { page: number, limit: number, search: string };
    const developments = await getAllDevelopments({page: Number(page), limit: Number(limit), search: ""});
    reply.status(200).send(developments);
  },
};
