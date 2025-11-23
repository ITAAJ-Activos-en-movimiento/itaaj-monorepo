import { RouteOptions } from "fastify";
import { registerUserRoute } from "./register";
import { loginUserRoute } from "./login";
import { loginGoogleRoute } from "./login-google";
import { accessUserRoute } from "./access";
import { loginEmailUserRoute } from "./login-email";
import { sessionRoute } from "./session";

const authRoutes: RouteOptions[] = [
    registerUserRoute,
    accessUserRoute,
    loginUserRoute,
    loginGoogleRoute,
    loginEmailUserRoute,
    sessionRoute
];

export default authRoutes;
  