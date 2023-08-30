"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const health_check_1 = require("./health-check");
const users_1 = __importDefault(require("./users"));
const auth_1 = __importDefault(require("./auth"));
const routes = [
    health_check_1.healthCheckRoute,
    ...auth_1.default,
    ...users_1.default
];
const registerRoutes = (fastify) => {
    console.warn('registering routes', routes);
    routes.map((route) => {
        fastify.route(route);
    });
};
exports.registerRoutes = registerRoutes;
