import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";

export const logoutRoute: RouteOptions = {
  method: 'POST',
  url: '/auth/logout',
  handler: async (_request: FastifyRequest, reply: FastifyReply) => {
    reply
      .clearCookie('session', {
        path: '/',          
        httpOnly: true,
        sameSite: 'lax',
        secure: true       
      })
      .code(200)
      .send({ success: true });
  }
};
