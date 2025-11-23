import { loginGoogle } from "@itaaj/business-logic";
import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";

export const loginGoogleRoute: RouteOptions = {
 method: 'POST',
 url: '/auth/login-google',
 handler: async (request: FastifyRequest, reply: FastifyReply) => {
  try{
   const { body } = request;
   const data = body as string
   const user = await loginGoogle(data);
    reply.setCookie("session", user.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });
   reply.status(200).send(user.user);
  }catch(err){
   reply.status(500).send(err);
  }
 }
}