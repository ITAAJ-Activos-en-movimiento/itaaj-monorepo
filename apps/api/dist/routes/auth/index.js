"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const register_1 = require("./register");
const login_1 = require("./login");
const login_google_1 = require("./login-google");
const authRoutes = [
    register_1.registerUserRoute,
    login_1.loginUserRoute,
    login_google_1.loginGoogleRoute
];
exports.default = authRoutes;
