import { RouteOptions } from "fastify";
import { registerUserRoute } from "./register";
import { loginUserRoute } from "./login";
import { loginGoogleRoute } from "./login-google";
import { accessUserRoute } from "./access";

const authRoutes: RouteOptions[] = [
    registerUserRoute,
    accessUserRoute,
    loginUserRoute,
    loginGoogleRoute
];

export default authRoutes;
  