"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const problems_routes_1 = __importDefault(require("./problems.routes"));
const testCases_routes_1 = __importDefault(require("./testCases.routes"));
const validator_1 = __importDefault(require("../middlewares/validator"));
const submissions_routes_1 = __importDefault(require("./submissions.routes"));
const router = (0, express_1.Router)();
router.use("/auth", auth_routes_1.default);
router.use("/problems", (0, validator_1.default)("queryString"), problems_routes_1.default);
router.use("/testcases", (0, validator_1.default)("queryString"), testCases_routes_1.default);
router.use("/submissions", (0, validator_1.default)("queryString"), submissions_routes_1.default);
exports.default = router;
//# sourceMappingURL=apis.routes.js.map