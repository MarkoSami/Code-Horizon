"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const alphanumericAndWhiteSpacesPattern = /^[a-zA-Z0-9\s]*$/;
const createProblem = joi_1.default.object({
    title: joi_1.default.string().pattern(alphanumericAndWhiteSpacesPattern).min(3).max(255).optional(),
    description: joi_1.default.string().min(3).max(1000).optional(),
    difficulty: joi_1.default.string().valid("easy", "medium", "hard").optional(),
});
exports.default = createProblem;
//# sourceMappingURL=updateProblem.validator.js.map