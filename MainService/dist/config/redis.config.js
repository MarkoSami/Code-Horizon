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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
class RedisConfig {
}
_a = RedisConfig;
RedisConfig.getRedisClient = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!_a.instance) {
        yield _a.connect();
    }
    return _a.instance;
});
RedisConfig.connect = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = process.env.REDIS_URL;
    if (!url)
        throw new Error("No Redis url was provided!");
    const redisClient = (0, redis_1.createClient)({
        url
    });
    const connectin = yield redisClient.connect();
    if (connectin) {
        console.log("Redis connected successfully");
    }
    _a.instance = redisClient;
});
exports.default = RedisConfig;
//# sourceMappingURL=redis.config.js.map