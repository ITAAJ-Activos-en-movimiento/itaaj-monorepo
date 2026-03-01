"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
var postgresql_1 = require("@itaaj/data-sources/src/postgresql");
var entities_1 = require("@itaaj/entities");
var getAllUsers = function () {
    var result = (0, postgresql_1.getDbInstance)().select({
        id: entities_1.users.id,
        name: entities_1.users.name,
        lastname: entities_1.users.lastname,
        email: entities_1.users.email
    }).from(entities_1.users);
    return result;
};
exports.getAllUsers = getAllUsers;
