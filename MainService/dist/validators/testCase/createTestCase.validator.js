"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const createTestCase = joi_1.default.object({
    input: joi_1.default.object().required(),
    output: joi_1.default.array().required(),
    timeInMS: joi_1.default.number().positive().max(5000).required(),
    memoryInMB: joi_1.default.number().positive().max(128).required(),
    problemId: joi_1.default.string().uuid().required()
});
exports.default = createTestCase;
//# sourceMappingURL=createTestCase.validator.js.map