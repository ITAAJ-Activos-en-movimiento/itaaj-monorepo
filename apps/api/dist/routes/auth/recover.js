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
exports.recoverAccount = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "rafaelmezasalazar@gmail.com",
        pass: "veuo ddxf yoal gyhw"
    }
});
exports.recoverAccount = {
    method: 'POST',
    url: '/auth/recover',
    handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const info = yield transporter.sendMail({
            from: '"Maddison Foo Koch 👻" <rafaelmezasalazar@gmail.com>',
            to: "johanmezasalazar@gmail.com",
            subject: "Recuperación de contraseña ✔",
            html: "<b>Hello world?</b>", // html body
        });
        console.log("Message sent: %s", info.messageId);
        reply.status(201).send({ message: info.messageId });
    }),
    errorHandler: (error, _m, reply) => __awaiter(void 0, void 0, void 0, function* () {
        reply.status(403).send(error);
    })
};
