import { RouteOptions } from "fastify";
import { login, verifyToken } from '@itaaj/business-logic';
import { User } from "@itaaj/entities";
const { JWT_SECRET } = process.env;

export const accessUserRoute: RouteOptions = {
  method: 'POST',
  url: '/auth/access',
  handler: async (request, reply) => {
    const token = request?.headers.authorization;
    if (!token) throw new Error("Token no proveído");
    const decoded = await verifyToken(token)
    reply.status(201).send({ user: decoded });
  },
  errorHandler: async (error, _, reply) => {
    reply.status(403).send(error);
  }
}