import { RouteOptions } from "fastify";
import { registerUserRoute } from "./register";
import { loginUserRoute } from "./login";
import { loginGoogleRoute } from "./login-google";
import { accessUserRoute } from "./access";
import { loginEmailUserRoute } from "./login-email";

const authRoutes: RouteOptions[] = [
    registerUserRoute,
    accessUserRoute,
    loginUserRoute,
    loginGoogleRoute,
    loginEmailUserRoute
];

export default authRoutes;
  