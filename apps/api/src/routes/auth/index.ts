import { RouteOptions } from "fastify";
import { registerUserRoute } from "./register";
import { loginUserRoute } from "./login";
import { loginGoogleRoute } from "./login-google";
import { accessUserRoute } from "./access";
import { recoverAccount } from "./recover";

const authRoutes: RouteOptions[] = [
    registerUserRoute,
    accessUserRoute,
    loginUserRoute,
    loginGoogleRoute,
    recoverAccount
];

export default authRoutes;
  