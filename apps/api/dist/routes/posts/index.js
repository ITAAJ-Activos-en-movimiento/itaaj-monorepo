"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = require("./create");
const list_1 = require("./list");
const delete_1 = require("./delete");
const get_by_slug_1 = require("./get-by-slug");
const postsRoutes = [
    create_1.createPostRoute,
    list_1.getAllPostsRoute,
    delete_1.deletePostRoute,
    get_by_slug_1.getPostBySlugRoute
];
exports.default = postsRoutes;
