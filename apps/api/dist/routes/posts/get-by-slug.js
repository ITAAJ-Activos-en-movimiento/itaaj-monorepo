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
exports.getPostBySlugRoute = void 0;
const business_logic_1 = require("@itaaj/business-logic");
exports.getPostBySlugRoute = {
    method: "GET",
    url: "/posts/:slug",
    handler: (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { slug } = req.params;
            const post = yield (0, business_logic_1.getBySlug)(slug);
            if (post) {
                reply.status(200).send(post);
            }
            else {
                reply.status(404).send({ error: "Post no encontrado" });
            }
        }
        catch (error) {
            console.error("Error al recuperar el post:", error);
            reply
                .status(500)
                .send({ error: "Ha ocurrido un error al procesar la solicitud" });
        }
    }),
};
