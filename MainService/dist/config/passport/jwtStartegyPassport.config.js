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
const passport_jwt_1 = require("passport-jwt");
const passport_1 = __importDefault(require("passport"));
const jwtSecret = () => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return process.env.JWT_SECRET;
};
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret(),
};
// JWT strategy callback function
const jwtStrategyVerifyCallback = (jwt_payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            userName: jwt_payload.userName,
            sub: jwt_payload.sub,
            role: jwt_payload.role,
        };
        return done(null, user);
    }
    catch (error) {
        return done(error, false);
    }
});
// Use JWT strategy with Passport
passport_1.default.use(new passport_jwt_1.Strategy(options, jwtStrategyVerifyCallback));
exports.default = passport_1.default;
//# sourceMappingURL=jwtStartegyPassport.config.js.map