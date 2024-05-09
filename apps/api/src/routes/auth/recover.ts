import { generate } from "otp-generator";
import { RouteOptions } from "fastify";
import nodemailer from "nodemailer";
import { changePassword, generateToken, validateIfExistsEmail, verifyToken } from "@itaaj/business-logic";
import { User } from "@itaaj/entities";

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: "rafaelmezasalazar@gmail.com",
    pass: "veuo ddxf yoal gyhw"
  }
})

const { EMAIL_ITAAJ } = process.env;

export const recoverAccount: RouteOptions = {
  method: 'POST',
  url: '/auth/recover',
  handler: async (request, reply) => {
    const { body } = request;
    const data = body as Partial<User>;

    const user = await validateIfExistsEmail(data);
    if (!user) throw Error('El email ingresado no existe en los registros de Itaaj.');
    const { token } = generateToken(user);
    const codeSend = generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    await transporter.sendMail({
      from: `"Itaaj Realty" ${EMAIL_ITAAJ}`,
      to: data.email,
      subject: "Cambiar contraseña",
      html: `Ingrese al link para cambiar tu contraseña <a href="${request.headers.origin}/mi-cuenta/recuperar?token=${token}">Cambiar contraseña</a>`,
    });

    reply.status(201).send({ message: "Email enviado correctamente.", error: false });
  },
  errorHandler: async (error, _m, reply) => {
    reply.status(403).send(error);
  }
}

export const recoverAccountValidateToken: RouteOptions = {
  method: 'GET',
  url: '/mi-cuenta/recuperar',
  handler: async (request, reply) => {
    const { token } = request.query as any;
    if (!token) throw new Error("Token no proveído");
    const decoded = await verifyToken(token)
    reply.status(201).send({ user: decoded });
  },
  errorHandler: async (error, _m, reply) => {
    reply.status(403).send(error);
  }
}

export const recoverAccountChangePassword: RouteOptions = {
  method: 'POST',
  url: '/mi-cuenta/cambiar-contrasena',
  handler: async (request, reply) => {
    const { body } = request;
    const data = body as Partial<User>;
    const response = await changePassword(data);
    reply.status(201).send({ message: 'Se ha cambiado la contraseña.' });
  },
  errorHandler: async (error, _m, reply) => {
    reply.status(403).send(error);
  }
}