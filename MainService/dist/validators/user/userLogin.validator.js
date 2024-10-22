"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const isEmail = (value) => value.includes("@");
const userLogin = joi_1.default.object({
    credential: joi_1.default.string()
        .min(3)
        .max(255)
        .required()
        .custom((value, helpers) => {
        if (isEmail(value)) {
            const emailSchema = joi_1.default.string().email();
            const { error } = emailSchema.validate(value);
            if (error) {
                return helpers.error('any.invalid');
            }
        }
        else {
            const alphanumSchema = joi_1.default.string().alphanum();
            const { error } = alphanumSchema.validate(value);
            if (error) {
                return helpers.error('any.invalid');
            }
        }
        return value;
    }, 'Credential Validation'),
    password: joi_1.default.string().required(),
});
exports.default = userLogin;
//# sourceMappingURL=userLogin.validator.js.map