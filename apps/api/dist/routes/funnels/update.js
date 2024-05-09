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
exports.updateContactRoutes = void 0;
const business_logic_1 = require("@helebba/business-logic");
const constant_definitions_1 = require("@helebba/constant-definitions");
exports.updateContactRoutes = (0, constant_definitions_1.makeFastifyRoute)(constant_definitions_1.RouteMethod.PATCH, "/contacts/:contactId", business_logic_1.verifyToken, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { params, body } = request;
    const { contactId } = params;
    const data = body;
    const contact = yield (0, business_logic_1.updateContact)(contactId, data);
    return reply.send(contact);
}));
