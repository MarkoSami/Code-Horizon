"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const createSubmission = joi_1.default.object({
    code: joi_1.default.string().required(),
    language: joi_1.default.string().required().valid("cpp", "java", "python, javascript"),
    problemId: joi_1.default.string().uuid().required(),
});
exports.default = createSubmission;
//# sourceMappingURL=createtestCase.validator.js.map