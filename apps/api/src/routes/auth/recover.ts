import { RouteOptions } from "fastify";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: "rafaelmezasalazar@gmail.com",
    pass: "veuo ddxf yoal gyhw"
  }
})

export const recoverAccount: RouteOptions = {
  method: 'POST',
  url: '/auth/recover',
  handler: async (request, reply) => {
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <rafaelmezasalazar@gmail.com>', // sender address
      to: "johanmezasalazar@gmail.com", // list of receivers
      subject: "Recuperación de contraseña ✔", // Subject line
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    reply.status(201).send({ message: info.messageId });
  },
  errorHandler: async (error, _m, reply) => {
    reply.status(403).send(error);
  }
}