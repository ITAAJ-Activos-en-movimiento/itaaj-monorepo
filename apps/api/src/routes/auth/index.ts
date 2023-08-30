import { RouteOptions } from "fastify";
import { registerUserRoute } from "./register";
import { loginUserRoute } from "./login";
import { loginGoogleRoute } from "./login-google";

const authRoutes: RouteOptions[] = [
    registerUserRoute,
    loginUserRoute,
    loginGoogleRoute
];

export default authRoutes;
  