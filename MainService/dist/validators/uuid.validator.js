"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const uuid = joi_1.default.string().uuid().required();
exports.default = uuid;
//# sourceMappingURL=uuid.validator.js.map