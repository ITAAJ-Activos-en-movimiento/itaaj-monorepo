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
exports.getAllPostsRoute = void 0;
const business_logic_1 = require("@itaaj/business-logic");
exports.getAllPostsRoute = {
    method: "GET",
    url: "/posts",
    handler: (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const posts = yield (0, business_logic_1.getAllPosts)();
            reply.status(200).send(posts);
        }
        catch (error) {
            console.error("Error al recuperar los posts:", error);
            reply
                .status(500)
                .send({ error: "Ha ocurrido un error al procesar la solicitud" });
        }
    }),
};
