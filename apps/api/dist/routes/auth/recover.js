"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoverAccountChangePassword = exports.recoverAccountValidateToken = exports.recoverAccount = void 0;
const otp_generator_1 = require("otp-generator");
const nodemailer_1 = __importDefault(require("nodemailer"));
const business_logic_1 = require("@itaaj/business-logic");
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "rafaelmezasalazar@gmail.com",
        pass: "veuo ddxf yoal gyhw"
    }
});
const { EMAIL_ITAAJ } = process.env;
exports.recoverAccount = {
    method: 'POST',
    url: '/auth/recover',
    handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = request;
        const data = body;
        const user = yield (0, business_logic_1.validateIfExistsEmail)(data);
        if (!user)
            throw Error('El email ingresado no existe en los registros de Itaaj.');
        const { token } = (0, business_logic_1.generateToken)(user);
        const codeSend = (0, otp_generator_1.generate)(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
        yield transporter.sendMail({
            from: `"Itaaj Realty" ${EMAIL_ITAAJ}`,
            to: data.email,
            subject: "Cambiar contraseña",
            html: `Ingrese al link para cambiar tu contraseña <a href="${request.headers.origin}/mi-cuenta/recuperar?token=${token}">Cambiar contraseña</a>`,
        });
        reply.status(201).send({ message: "Email enviado correctamente.", error: false });
    }),
    errorHandler: (error, _m, reply) => __awaiter(void 0, void 0, void 0, function* () {
        reply.status(403).send(error);
    })
};
exports.recoverAccountValidateToken = {
    method: 'GET',
    url: '/mi-cuenta/recuperar',
    handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = request.query;
        if (!token)
            throw new Error("Token no proveído");
        const decoded = yield (0, business_logic_1.verifyToken)(token);
        reply.status(201).send({ user: decoded });
    }),
    errorHandler: (error, _m, reply) => __awaiter(void 0, void 0, void 0, function* () {
        reply.status(403).send(error);
    })
};
exports.recoverAccountChangePassword = {
    method: 'POST',
    url: '/mi-cuenta/cambiar-contrasena',
    handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = request;
        const data = body;
        const response = yield (0, business_logic_1.changePassword)(data);
        reply.status(201).send({ message: 'Se ha cambiado la contraseña.' });
    }),
    errorHandler: (error, _m, reply) => __awaiter(void 0, void 0, void 0, function* () {
        reply.status(403).send(error);
    })
};
