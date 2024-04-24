import { RouteOptions } from "fastify";

//@ts-ignore
import {version} from '../../../package.json'
import { createFunnel } from "@itaaj/business-logic";

export const healthCheckRoute: RouteOptions = {
    method: 'GET',
    url: '/health-check',
    handler: async () => {
        return{
            appVersion: version,
            status: 'ok',
            uptime: process.uptime(), 
        }
    }
}