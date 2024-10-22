"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testCases_controller_1 = __importDefault(require("../controllers/testCases.controller"));
const testCaseController = new testCases_controller_1.default();
const validator_1 = __importDefault(require("../middlewares/validator"));
const router = (0, express_1.Router)();
router.get("/", testCaseController.getAll.bind(testCaseController));
router.post("/", (0, validator_1.default)("createTestCase"), testCaseController.create.bind(testCaseController));
router.get("/:id", testCaseController.getById.bind(testCaseController));
router.patch("/:id", (0, validator_1.default)("updateTestCase"), testCaseController.update.bind(testCaseController));
router.delete("/:id", testCaseController.delete.bind(testCaseController));
exports.default = router;
//# sourceMappingURL=testCases.routes.js.map