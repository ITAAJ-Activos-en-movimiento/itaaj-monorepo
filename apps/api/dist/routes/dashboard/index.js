"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list_1 = require("./developments/list");
const get_my_profile_1 = require("./profile/get-my-profile");
const dashboardRoutes = [
    list_1.listDevelopments,
    get_my_profile_1.getMyProfile,
];
exports.default = dashboardRoutes;
