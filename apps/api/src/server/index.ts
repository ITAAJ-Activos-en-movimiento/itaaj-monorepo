import 'dotenv/config';
import fastify from "fastify";
import fastifyCors from '@fastify/cors';
import { initDataSources } from '@itaaj/data-sources';
import { registerRoutes } from '../routes';

const { PORT, DATABASE_CONNECTION, HOST } = process.env;
const corsOptions = {
    origin: '*',
};

type Admin = {
    id: string;
};

declare module "fastify" {
    interface FastifyRequest {
        admin: Admin;
    }
}

const main = async () => {
     await initDataSources({
       postgres: { url: DATABASE_CONNECTION }
    });

    const server = fastify({
        logger: true
    });

    server.register(fastifyCors, corsOptions);
    server.register(
        (instance, options, next) => {
            registerRoutes(instance);
            next();
        },
        { prefix: 'api/v1' },
    );


    server.listen({port: Number(PORT), host: HOST}, (err, address) => {
        if (err) {
            server.log.error(err);
            process.exit(1);
        }
        server.log.info(`Backend App is running at ${address}`);
        server.log.info('Press CTRL-c to stop');
    })
}

void main();