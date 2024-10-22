"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const passwordPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");
const createUser = joi_1.default.object({
    email: joi_1.default.string().email().max(255).required(),
    userName: joi_1.default.string().alphanum().min(3).max(30).required(),
    password: joi_1.default.string().min(6).max(30).required()
        .pattern(passwordPattern),
    confirmPassword: joi_1.default.string().equal(joi_1.default.ref('password')).required()
});
exports.default = createUser;
//# sourceMappingURL=createUser.validator.js.map