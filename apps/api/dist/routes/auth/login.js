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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserRoute = void 0;
const business_logic_1 = require("@itaaj/business-logic");
exports.loginUserRoute = {
    method: 'POST',
    url: '/auth/login',
    handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = request;
        const data = body;
        const user = yield (0, business_logic_1.login)({ email: data.email, password: data.password });
        const decoded = yield (0, business_logic_1.verifyToken)(user.token);
        reply.status(201).send({ user: decoded, token: user.token });
    }),
    errorHandler: (error, _, reply) => __awaiter(void 0, void 0, void 0, function* () {
        reply.status(403).send(error);
    })
};
