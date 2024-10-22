"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const Validators = require("../validators");
function default_1(validator) {
    if (!Validators.hasOwnProperty(validator))
        throw new Error(`'${validator}' validator does not exist`);
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((req.method === "GET" || req.method === "DELETE") &&
                    validator !== "queryString") {
                    return next();
                }
                const validateQuery = (validator === "queryString");
                const validationData = validateQuery ? req.query : req.body;
                const validated = yield Validators[validator].validateAsync(validationData);
                if (validateQuery) {
                    req.query = validated;
                }
                else {
                    req.body = validated;
                }
                next();
            }
            catch (err) {
                if (err.isJoi) {
                    // Format the error message
                    const errorMessage = err.details.map((detail) => ({
                        field: detail.context.key,
                        message: detail.message.replace(/"/g, ""),
                    }));
                    return res.status(422).json({ errors: errorMessage });
                }
                res.status(500).json({ message: "Internal Server Error" });
            }
        });
    };
}
;
//# sourceMappingURL=validator.js.map