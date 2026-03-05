"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list_1 = require("./list");
const create_1 = require("./create");
const proposalsRoutes = [
    list_1.getAllProposalsRoute,
    create_1.createProposalRoute,
];
exports.default = proposalsRoutes;
