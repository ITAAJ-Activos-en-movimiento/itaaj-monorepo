import { RouteOptions } from "fastify";
import { registerUserRoute } from "./register";
import { loginUserRoute } from "./login";
import { loginGoogleRoute } from "./login-google";
import { accessUserRoute } from "./access";
import { recoverAccount, recoverAccountChangePassword, recoverAccountValidateToken } from "./recover";
import { loginEmailUserRoute } from "./login-email";

const authRoutes: RouteOptions[] = [
    registerUserRoute,
    accessUserRoute,
    loginUserRoute,
    loginGoogleRoute,
    recoverAccount,
    recoverAccountValidateToken,
    recoverAccountChangePassword,
    loginEmailUserRoute,
];

export default authRoutes;
  