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
   reply.status(200).send(user);
  }catch(err){
   reply.status(500).send(err);
  }
 }
}