"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = require("./create");
const list_1 = require("./list");
const messagesRoutes = [
    list_1.getAllMessagesRoute,
    create_1.createMessageRoute,
];
exports.default = messagesRoutes;
