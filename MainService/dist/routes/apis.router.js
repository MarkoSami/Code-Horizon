"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth.route"));
const problems_route_1 = __importDefault(require("./problems.route"));
const validator_1 = __importDefault(require("../middlewares/validator"));
const router = (0, express_1.Router)();
router.use("/auth", auth_route_1.default);
router.use("/problems", (0, validator_1.default)("queryString"), problems_route_1.default);
exports.default = router;
//# sourceMappingURL=apis.router.js.map