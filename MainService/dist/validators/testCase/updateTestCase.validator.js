"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const updateTestCase = joi_1.default.object({
    input: joi_1.default.object().optional(),
    output: joi_1.default.object().optional(),
    timeInMS: joi_1.default.number().positive().max(5000).optional(),
    memoryInMB: joi_1.default.number().positive().max(128).optional(),
});
exports.default = updateTestCase;
//# sourceMappingURL=updateTestCase.validator.js.map