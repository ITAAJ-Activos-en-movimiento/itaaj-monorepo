"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const register_1 = require("./register");
const login_1 = require("./login");
const login_google_1 = require("./login-google");
const access_1 = require("./access");
const authRoutes = [
    register_1.registerUserRoute,
    access_1.accessUserRoute,
    login_1.loginUserRoute,
    login_google_1.loginGoogleRoute
];
exports.default = authRoutes;
