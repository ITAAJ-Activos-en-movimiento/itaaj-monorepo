"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.funnelsRoutes = void 0;
const get_by_id_1 = require("./get-by-id");
const list_1 = require("./list");
// import { getAllFunnelsRoute } from "./list";
exports.funnelsRoutes = [
    get_by_id_1.getFunnelByIdRoute,
    list_1.getAllFunnelsRoute
];
