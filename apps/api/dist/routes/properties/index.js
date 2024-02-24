"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list_1 = require("./list");
const create_1 = require("./create");
const get_by_development_1 = require("./get-by-development");
const get_by_slug_1 = require("./get-by-slug");
const propertiesRoutes = [
    list_1.getAllPropertiesRoute,
    create_1.createPropertyRoute,
    get_by_development_1.getPropertiesByDevelopmentRoute,
    get_by_slug_1.getPropertiesBySlugRoute
];
exports.default = propertiesRoutes;
