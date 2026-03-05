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
exports.getPropertiesByDevelopmentRoute = void 0;
const business_logic_1 = require("@itaaj/business-logic");
exports.getPropertiesByDevelopmentRoute = {
    method: "GET",
    url: "/properties/:development",
    handler: (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { development } = req.params;
        const properties = yield (0, business_logic_1.getPropertiesByDevelopment)(development);
        // console.log("PROPERTIES", properties)
        reply.status(200).send(properties);
    }),
};
