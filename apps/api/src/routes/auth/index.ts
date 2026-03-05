import { RouteOptions } from "fastify";
import { registerUserRoute } from "./register";
import { loginUserRoute } from "./login";
import { loginGoogleRoute } from "./login-google";
import { accessUserRoute } from "./access";
import { loginEmailUserRoute } from "./login-email";
import { sessionRoute } from "./session";
import { logoutRoute } from "./logout";

const authRoutes: RouteOptions[] = [
    registerUserRoute,
    accessUserRoute,
    loginUserRoute,
    loginGoogleRoute,
    loginEmailUserRoute,
    sessionRoute,
    logoutRoute
];

export default authRoutes;
  