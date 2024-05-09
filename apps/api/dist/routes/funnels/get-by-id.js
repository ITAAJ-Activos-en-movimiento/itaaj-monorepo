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
exports.getFunnelByIdRoute = void 0;
const business_logic_1 = require("@itaaj/business-logic");
exports.getFunnelByIdRoute = {
    method: "GET",
    url: "/funnels/:funnelId",
    handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { params } = request;
        const { funnelId } = params;
        const funnel = yield (0, business_logic_1.getFunnelById)(funnelId);
        if (!funnel)
            return reply.code(404).send();
        return reply.header("x-data-source", "HIT").send(funnel);
    })
};
