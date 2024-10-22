"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const pagination_config_1 = require("../config/pagination.config");
const queryStringValidator = joi_1.default.object({
    page: joi_1.default.number().min(1).optional(),
    limit: joi_1.default.number().min(1).max(pagination_config_1.PaginationConfig.MAX_PAGE_SIZE).optional(),
    sortBy: joi_1.default.string().valid('title', 'createdAt', 'updatedAt', 'difficulty').optional(),
    order: joi_1.default.string().valid('asc', 'desc').optional(),
}).unknown(true);
exports.default = queryStringValidator;
//# sourceMappingURL=queryString.validator.js.map