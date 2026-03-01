import { RouteOptions } from "fastify";
import { getFunnelByIdRoute } from "./get-by-id";
import { getAllFunnelsRoute } from "./list";
// import { getAllFunnelsRoute } from "./list";

export const funnelsRoutes: RouteOptions[] = [
    getFunnelByIdRoute,
    getAllFunnelsRoute
]