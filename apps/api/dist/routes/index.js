"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const health_check_1 = require("./health-check");
const users_1 = __importDefault(require("./users"));
const auth_1 = __importDefault(require("./auth"));
const ai_1 = __importDefault(require("./ai"));
const leads_1 = __importDefault(require("./leads"));
const properties_1 = __importDefault(require("./properties"));
const dashboard_1 = __importDefault(require("./dashboard"));
const development_1 = __importDefault(require("./development"));
const messages_1 = __importDefault(require("./messages"));
const proposals_1 = __importDefault(require("./proposals"));
const routes = [
    health_check_1.healthCheckRoute,
    ...auth_1.default,
    ...users_1.default,
    ...ai_1.default,
    ...leads_1.default,
    ...properties_1.default,
    ...dashboard_1.default,
    ...development_1.default,
    ...messages_1.default,
    ...proposals_1.default
];
const registerRoutes = (fastify) => {
    // console.warn("registering routes", routes);
    routes.map((route) => {
        fastify.route(route);
    });
};
exports.registerRoutes = registerRoutes;
