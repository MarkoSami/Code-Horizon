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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const user_service_1 = __importDefault(require("../services/user.service"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userService = new user_service_1.default();
const localStrategyVerifyCallback = () => (credential, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.findUserByEmailOrUsername(credential);
        // user not found
        if (!user) {
            return done(null, false, { message: "Invalid credentials." });
        }
        // compare the password
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return done(null, false, { message: "Invalid credentials." });
        }
        // user found and password matched
        return done(null, user);
    }
    catch (error) {
        return done(error, false);
    }
});
passport_1.default.use(new passport_local_1.Strategy({ usernameField: "credential" }, localStrategyVerifyCallback));
//# sourceMappingURL=passport.config.js.map