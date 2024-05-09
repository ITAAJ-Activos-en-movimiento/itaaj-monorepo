"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list_1 = require("./list");
const create_1 = require("./create");
const update_1 = require("./update");
const leadsRoutes = [
    list_1.getAllLeadsRoute,
    create_1.createLeadRoute,
    update_1.updateLeadRoutes
];
exports.default = leadsRoutes;
