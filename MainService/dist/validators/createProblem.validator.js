"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const alphanumericAndWhiteSpacesPattern = /^[a-zA-Z0-9\s]*$/;
const createProblem = joi_1.default.object({
    title: joi_1.default.string()
        .pattern(alphanumericAndWhiteSpacesPattern) // Regular expression for alphanumeric and white spaces
        .required() // Ensure the field is required, if needed
        .messages({
        'string.pattern.base': 'Field can only contain alphanumeric characters and white spaces'
    }).min(3).max(255).required(),
    description: joi_1.default.string().min(3).max(1000).required(),
    difficulty: joi_1.default.string().valid("easy", "medium", "hard").required(),
});
exports.default = createProblem;
//# sourceMappingURL=createProblem.validator.js.map