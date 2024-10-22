"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const updateSubmission = joi_1.default.object({
    verdict: joi_1.default.string().valid("AC", "WA", "TLE", "MLE", "RE", "CE", "PENDING").optional(),
});
exports.default = updateSubmission;
//# sourceMappingURL=updateSubmission.validator.js.map