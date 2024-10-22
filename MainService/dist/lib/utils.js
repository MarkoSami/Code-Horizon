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
Object.defineProperty(exports, "__esModule", { value: true });
exports.pasreQueryString = exports.issueJwtToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const pagination_config_1 = require("../config/pagination.config");
const issueJwtToken = (userData, expiresIn) => __awaiter(void 0, void 0, void 0, function* () {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        throw new Error("No JWT_SECRET was provided");
    }
    const token = (0, jsonwebtoken_1.sign)({ sub: userData.id, role: userData.role, userName: userData.userName }, secretKey, { expiresIn });
    return `Bearer ${token}`;
});
exports.issueJwtToken = issueJwtToken;
const pasreQueryString = (req) => {
    let page;
    if (req.query.page) {
        page = parseInt(req.query.page);
    }
    else {
        page = 1;
    }
    let limit;
    if (req.query.limit) {
        limit = parseInt(req.query.limit);
    }
    else {
        limit = pagination_config_1.PaginationConfig.MAX_PAGE_SIZE;
    }
    return { page, limit };
};
exports.pasreQueryString = pasreQueryString;
//# sourceMappingURL=utils.js.map