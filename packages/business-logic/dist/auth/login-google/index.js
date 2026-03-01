"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginGoogle = void 0;
var bcrypt_1 = require("bcrypt");
var jwt = require("jsonwebtoken");
var google_auth_library_1 = require("google-auth-library");
var postgresql_1 = require("@itaaj/data-sources/src/postgresql");
var drizzle_orm_1 = require("drizzle-orm");
var entities_1 = require("@itaaj/entities");
var _a = process.env, JWT_SECRET = _a.JWT_SECRET, GOOGLE_CLIENT_ID = _a.GOOGLE_CLIENT_ID;
var client = new google_auth_library_1.OAuth2Client(GOOGLE_CLIENT_ID);
var verifyGoogle = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var ticket, payload, userId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.verifyIdToken({
                    idToken: token,
                    audience: GOOGLE_CLIENT_ID
                })];
            case 1:
                ticket = _a.sent();
                payload = ticket.getPayload();
                userId = payload !== null && payload !== void 0 ? payload : ['sub'];
                return [2 /*return*/, {
                        email: payload === null || payload === void 0 ? void 0 : payload.email,
                        name: payload === null || payload === void 0 ? void 0 : payload.given_name,
                        last_name: payload === null || payload === void 0 ? void 0 : payload.family_name,
                        photo: payload === null || payload === void 0 ? void 0 : payload.picture
                    }];
        }
    });
}); };
var loginGoogle = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, photo, name, last_name, result, user, data, newUser, trialStartDate, trialEndDate, salt, token_1, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, verifyGoogle(id)];
            case 1:
                _a = _b.sent(), email = _a.email, photo = _a.photo, name = _a.name, last_name = _a.last_name;
                return [4 /*yield*/, (0, postgresql_1.getDbInstance)().select().from(entities_1.users)
                        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(entities_1.users.email, email)))];
            case 2:
                result = _b.sent();
                user = result[0];
                if (!!user) return [3 /*break*/, 4];
                data = {
                    name: name,
                    email: email,
                    last_name: last_name,
                    photo: photo,
                    password: ':P',
                    username: '',
                    method: 'google'
                };
                data.username = generateUsername(name || "", email || "");
                return [4 /*yield*/, (0, postgresql_1.getDbInstance)().insert(entities_1.users).values(__assign({}, data)).returning()];
            case 3:
                newUser = _b.sent();
                trialStartDate = new Date();
                newUser.trial_start_date = trialStartDate;
                trialEndDate = new Date(trialStartDate.getTime() + 14 * 24 * 60 * 60 * 1000);
                newUser.trial_end_date = trialEndDate;
                salt = (0, bcrypt_1.genSaltSync)(10);
                newUser.password = (0, bcrypt_1.hashSync)(data.password, salt);
                token_1 = jwt.sign({ uuid: newUser._id }, JWT_SECRET, { expiresIn: '5d' });
                return [2 /*return*/, { token: token_1 }];
            case 4:
                ;
                if (user.locked)
                    throw new Error("User is already locked");
                user.last_login = new Date().toString();
                user.login_attempts = 0;
                token = jwt.sign({ uuid: user._id }, JWT_SECRET, { expiresIn: '24h' });
                return [2 /*return*/, { token: token }];
        }
    });
}); };
exports.loginGoogle = loginGoogle;
var generateUsername = function (name, email) {
    var username = name.charAt(0) + email.split('@')[0];
    var randomNumber = Math.floor(Math.random() * 1000);
    return "".concat(username).concat(randomNumber);
};
