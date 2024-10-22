"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const express_1 = require("express");
const user_service_1 = __importDefault(require("../services/user.service"));
const validator_1 = __importDefault(require("../middlewares/validator"));
const router = (0, express_1.Router)();
const authController = new auth_controller_1.default(new user_service_1.default());
router.post("/login", (0, validator_1.default)("userLogin"), authController.login.bind(authController));
router.post("/register", (0, validator_1.default)("createUser"), authController.register.bind(authController));
exports.default = router;
//# sourceMappingURL=auth.routes.js.map