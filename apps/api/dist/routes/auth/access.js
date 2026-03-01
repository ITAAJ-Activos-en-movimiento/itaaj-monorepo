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
exports.accessUserRoute = void 0;
const business_logic_1 = require("@itaaj/business-logic");
const { JWT_SECRET } = process.env;
exports.accessUserRoute = {
    method: 'POST',
    url: '/auth/access',
    handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const token = request === null || request === void 0 ? void 0 : request.headers.authorization;
        if (!token)
            throw new Error("Token no proveído");
        const decoded = yield (0, business_logic_1.verifyToken)(token);
        reply.status(201).send({ user: decoded });
    }),
    errorHandler: (error, _, reply) => __awaiter(void 0, void 0, void 0, function* () {
        reply.status(403).send(error);
    })
};
