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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const data_sources_1 = require("@itaaj/data-sources");
const routes_1 = require("../routes");
const { PORT, DATABASE_CONNECTION } = process.env;
const corsOptions = {
    origin: '*',
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, data_sources_1.initDataSources)({
        postgres: { url: DATABASE_CONNECTION }
    });
    const server = (0, fastify_1.default)({
        logger: true
    });
    server.register(cors_1.default, corsOptions);
    server.register((instance, options, next) => {
        (0, routes_1.registerRoutes)(instance);
        next();
    }, { prefix: 'api/v1' });
    server.listen({ port: Number(PORT) }, (err, address) => {
        if (err) {
            server.log.error(err);
            process.exit(1);
        }
        server.log.info(`Backend App is running at ${address}`);
        server.log.info('Press CTRL-c to stop');
    });
});
void main();
