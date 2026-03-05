"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list_1 = require("./list");
const create_1 = require("./create");
const leadsRoutes = [
    list_1.getAllLeadsRoute,
    create_1.createLeadRoute
];
exports.default = leadsRoutes;
