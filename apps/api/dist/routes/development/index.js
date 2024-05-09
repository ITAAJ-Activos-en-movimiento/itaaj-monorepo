"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list_1 = require("./list");
const create_1 = require("./create");
const get_by_slug_1 = require("./get-by-slug");
const update_1 = require("./update");
const delete_1 = require("./delete");
const developmentsRoutes = [
    list_1.getAllDevelopmentsRoute,
    create_1.createDevelopmentRoute,
    get_by_slug_1.getDevelopmentBySlugRoute,
    update_1.updateDevelopmentRoute,
    delete_1.deleteDevelopmentRoute
];
exports.default = developmentsRoutes;
