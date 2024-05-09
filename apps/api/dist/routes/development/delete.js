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
exports.deleteDevelopmentRoute = void 0;
const business_logic_1 = require("@itaaj/business-logic");
exports.deleteDevelopmentRoute = {
    method: "PATCH",
    url: "/developments/:id/delete",
    handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            if (!id) {
                reply.status(400).send({ error: "El ID de la propiedad es requerido" });
                return;
            }
            const result = yield (0, business_logic_1.deleteDevelopment)(id);
            if (result instanceof Error) {
                reply.status(404).send({ error: result.message });
            }
            else {
                reply.status(200).send({ message: "propiedad eliminada" });
            }
        }
        catch (error) {
            console.error("Error al eliminar la propiedad:", error);
            reply
                .status(500)
                .send({ error: "Ha ocurrido un error al procesar la solicitud" });
        }
    }),
};
