import { session } from "@itaaj/business-logic";
import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";

export const sessionRoute: RouteOptions = {
 method: 'GET',
 url: '/auth/session',
 handler: async (request: FastifyRequest, reply: FastifyReply) => {

  try{
    const sessionCookie = request.cookies.session; 
    console.log(sessionCookie)
    if (!sessionCookie) {
        return reply.code(401).send({ user: null });
    }
    const user = await session(sessionCookie);
    console.log(user)
    return reply.code(200).send({ user });


  }catch(err){
   reply.status(500).send(err);
  }
 }
}