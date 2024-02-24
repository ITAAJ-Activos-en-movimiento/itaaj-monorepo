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
exports.getPropertiesBySlugRoute = void 0;
const business_logic_1 = require("@itaaj/business-logic");
exports.getPropertiesBySlugRoute = {
    method: "GET",
    url: "/property/:slug",
    handler: (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { slug } = req.params;
        const property = yield (0, business_logic_1.getPropertiesBySlug)(slug);
        console.log("PROPERTY", property);
        reply.status(200).send(property);
    }),
};
