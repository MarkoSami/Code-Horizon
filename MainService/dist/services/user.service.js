"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const prismaClient_1 = __importDefault(require("../../prisma/prismaClient"));
const UserAlreadyExists_error_1 = __importDefault(require("../errors/UserAlreadyExists.error"));
const bcrypt_1 = require("bcrypt");
class UserService {
    findUserByEmailOrUsername(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = prismaClient_1.default.user.findFirst({
                where: {
                    OR: [{ email: credential }, { userName: credential }],
                },
            });
            return user;
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield prismaClient_1.default.user.findFirst({
                where: {
                    OR: [{ email: userData.email }, { userName: userData.userName }],
                },
            });
            // checking if user exists with the same email or the same username
            if (existingUser) {
                let message = "";
                const userExistsWithSameEmail = existingUser.email == userData.email;
                const userExistsWithSameUserName = existingUser.userName == userData.userName;
                if (userExistsWithSameEmail) {
                    message = "User with this email already exists";
                }
                else if (userExistsWithSameUserName) {
                    message = "User with this userName already exists";
                }
                throw new UserAlreadyExists_error_1.default(message);
            }
            // hashing user password before saving it to the database
            userData.password = yield this.hashPassword(userData.password);
            const { confirmPassword } = userData, user = __rest(userData, ["confirmPassword"]);
            // creating new user
            const newUser = yield prismaClient_1.default.user.create({ data: user });
            return newUser;
        });
    }
    /**
     * Hashes a plain text password using bcrypt.
     *
     * @param password - The plain text password to be hashed.
     * @returns A promise that resolves to the hashed password.
     */
    hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!password) {
                throw new Error("Password is required");
            }
            const salt = yield (0, bcrypt_1.genSalt)(10);
            const hashedPassword = yield (0, bcrypt_1.hash)(password, salt);
            return hashedPassword;
        });
    }
}
exports.default = UserService;
;
//# sourceMappingURL=user.service.js.map